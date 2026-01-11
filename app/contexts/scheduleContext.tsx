import React, { useState, ReactNode } from 'react';
import { Season } from '../types/season';

export const ScheduleContext = React.createContext<any>(null);

interface ScheduleProviderProps {
    children: ReactNode;
}

export const ScheduleProvider = ({children}: ScheduleProviderProps) => {
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
                    terms_offered: [Season.Fall, Season.Winter]
                },
                {
                    title: "CS 135",
                    id: 15,
                    description: "Core Course",
                    units: 0.5,
                    allowed_programs: ["CS/Digital Hardware"],
                    terms_offered: [Season.Fall, Season.Spring],
                },
                {
                    title: "MATH 135",
                    id: 17,
                    description: "Core Course",
                    units: 0.5,
                    allowed_programs: ["CS/Digital Hardware"],
                    terms_offered: [Season.Fall, Season.Spring],
                },
                {
                    title: "MATH 137",
                    id: 19,
                    description: "Core Course",
                    units: 0.5,
                    allowed_programs: ["CS/Digital Hardware"],
                    terms_offered: [Season.Fall, Season.Spring],
                },
                {
                    title: "PHYS 121",
                    id: 35,
                    description: "B&D: Pure Science",
                    units: 0.5,
                    allowed_programs: ["CS/Digital Hardware", "Science"],
                    terms_offered: [Season.Fall, Season.Spring, Season.Winter],
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
    
    const [startYear, setStartYear] = useState<number>(2024);
    const [startSeason, setStartSeason] = useState<Season>(Season.Fall);
      
    return <ScheduleContext.Provider value={{terms, setTerms, startYear, setStartYear, startSeason, setStartSeason}}>
        {children}
    </ScheduleContext.Provider>
}