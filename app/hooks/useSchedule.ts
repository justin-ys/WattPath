import {useContext} from "react";
import {Course} from "@/app/types/course";
import Term from "@/app/types/term";
import { ScheduleContext } from "../contexts/scheduleContext";
import { Season, dateToOffset, offsetToDate } from "../types/season";

export function useSchedule() {
    const {terms, setTerms} = useContext(ScheduleContext)

    const termNames = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"]

    const unitsInFullTerm = 2.5;
    const startYear = 2024;
    const startSeason = Season.Fall;

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

    const unitsInTerm = (termNum: number) => {
        const term = terms[termNum];
        let termUnits = 0.0;
        for (const c of term.courses) {
            termUnits += c.units;
        }
        return termUnits;
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
                nextIdx += Math.floor(totalUnits/unitsInFullTerm);
                totalUnits = totalUnits % unitsInFullTerm;
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
        let termSeason = startSeason;
        let termYear = startYear;
        if (terms.length > 0) {
            const lastTermSeason = terms[terms.length - 1].season;
            const lastTermYear = terms[terms.length - 1].year;
            const lastTermOffset = dateToOffset(lastTermYear, lastTermSeason, startYear, startSeason);
            const {year, season} = offsetToDate(lastTermOffset + 1, startYear, startSeason);
            termSeason = season;
            termYear = year;
        }
        setTerms(prevTerms => [...prevTerms, {season: termSeason, level: "1A", year: termYear, courses: []}])
        calculateTermLevels();
    }

    const setTermDate = (termNum: number, year: number, season: Season) => {
        setTerms(prevTerms =>
            prevTerms.map((term: Term, idx: number) =>
                idx == termNum
                    ? {...term, season: season, year: year}
                    : term
            )
        );
    }

    return {
        terms,
        addCourse,
        deleteCourse,
        newTerm,
        setTermDate,
        isScheduled,
        unitsInTerm,
        unitsInFullTerm,
        startYear,
        startSeason
    }
}