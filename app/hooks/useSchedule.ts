import {useState} from "react";
import {Course} from "@/app/types/course";

export function useSchedule() {
    const [terms, setTerms] = useState([
        {
            level: "1A",
            season: "Fall",
            year: 2024,
            courses: [
                {
                    title: "SPCOM 225",
                    id: 10,
                    description: "Communications",
                    units: 0.5,
                    allowed_programs: ["CS/Digital Hardware"],
                    terms_offered: ["Fall", "Winter"]
                },
            ],
        },
        {
            level: "1B",
            season: "Winter",
            year: 2025,
            courses: [
                {
                    title: "ECE 124",
                    id: 11,
                    description: "Digital Hardware",
                    units: 0.5,
                    allowed_programs: ["ECE"],
                    terms_offered: ["Fall", "Winter"]
                },
            ]
        }
    ]);

    const addCourse = (termNum: number, course: Course) => {
        for (const term of terms) {
            for (const c of term.courses) {
                if (c.id == course.id) {
                    console.error(`Can't add ${course.id} to schedule: already present)`);
                    return;
                }
            }
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
        newTerm
    }
}