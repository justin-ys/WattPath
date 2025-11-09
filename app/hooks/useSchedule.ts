import {useContext, useState} from "react";
import {Course} from "@/app/types/course";
import { ScheduleContext } from "../contexts/scheduleContext";

export function useSchedule() {
    const {terms, setTerms} = useContext(ScheduleContext)

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
    }

    const deleteCourse = (courseId: number) => {
        setTerms(prevTerms =>
            prevTerms.map((term, idx) => {
                return {...term, courses: term.courses.filter(c => c.id !== courseId)}
            })
        );
    }

    const newTerm = () => {
        setTerms(prevTerms => [...prevTerms, {}])
    }

    return {
        terms,
        addCourse,
        deleteCourse,
        newTerm,
        isScheduled
    }
}