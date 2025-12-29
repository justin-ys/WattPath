import {useContext, useState} from "react";
import {Course} from "@/app/types/course";
import Term from "@/app/types/term";
import { ScheduleContext } from "../contexts/scheduleContext";

export function useSchedule() {
    const {terms, setTerms} = useContext(ScheduleContext)

    const termNames = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"]

    const isScheduled = (courseId: number) => {
        let termIdx = 0;
        for (const term of terms) {
            for (const c of term.courses) {
                if (c.id == courseId) {
                    return termIdx;
                }
            }
            termIdx++;
        }
        return -1;
    }

    const calculateTermLevels = () => {
        let totalUnits = 0;
        let nextIdx = 0;
        let currentIdx = 0;
        setTerms(prevTerms =>
            prevTerms.map((term: Term, idx: number) => {
                currentIdx = nextIdx;
                for (const c of term.courses) {
                    totalUnits += c.units;
                }
                nextIdx += Math.floor(totalUnits/2.5);
                totalUnits = totalUnits % 2.5;
                return {...term, level: termNames[Math.min(currentIdx, termNames.length - 1)]}
            }
            )
        );
    }

    const addCourse = (termNum: number, course: Course) => {
        if (isScheduled(course.id) >= 0) {
            console.error(`Can't add ${course.id} to schedule: already present)`);
            return;
        }
        if (0 <= termNum && termNum < terms.length) {
            setTerms(prevTerms =>
                prevTerms.map((term, idx) =>
                    idx == termNum
                        ? {...term, courses: [...term.courses, course]}
                        : term
                )
            );
        } else {
            console.error(`Term ${termNum} is out of range`);
        }
        calculateTermLevels();
    }

    const deleteCourse = (courseId: number) => {
        setTerms(prevTerms =>
            prevTerms.map((term: Term, idx: number) => {
                return {...term, courses: term.courses.filter(c => c.id !== courseId)}
            })
        );
        calculateTermLevels();
    }

    const newTerm = () => {
        setTerms(prevTerms => [...prevTerms, {season: "Unknown", level: "1A", year: 2024, courses: []}])
        calculateTermLevels();
    }

    return {
        terms,
        addCourse,
        deleteCourse,
        newTerm,
        isScheduled
    }
}