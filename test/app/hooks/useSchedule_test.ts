/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import {useSchedule} from "@/app/hooks/useSchedule";
import {Course} from "@/app/types/course";
import { Season, offsetToDate, dateToOffset } from "@/app/types/season";
import create from "@/test/factories/create"
import { ScheduleContext } from "@/app/contexts/scheduleContext";

import { renderHook, act } from '@testing-library/react'

describe('useSchedule', () => {

    let consoleErrorSpy: any;

    const TestScheduleProvider = ({ children }: { children: React.ReactNode }) => {
        const [terms, setTerms] = useState([
            {
                level: "1A",
                season: Season.Fall,
                year: 2024,
                courses: []
            }
        ]);
        const [startYear, setStartYear] = useState<number>(2024);
        const [startSeason, setStartSeason] = useState<Season>(Season.Fall);

        return React.createElement(
            ScheduleContext.Provider,
            { value: { terms, setTerms, startYear, setStartYear, startSeason, setStartSeason } },
            children
        );
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => 
        React.createElement(TestScheduleProvider, null, children);

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test('Valid course is added successfully', () => {
        const course1: Course = create("course");
        const course2: Course = create("course", {name: "Test Course 2", id: 2});

        const { result } = renderHook(() => useSchedule(), { wrapper });

        const lastTerm = result.current.terms[result.current.terms.length - 1];
        expect(lastTerm.courses).toEqual(expect.not.arrayContaining([course1]));

        act(() => result.current.addCourse(result.current.terms.length - 1, course1));
        const updatedLastTerm = result.current.terms[result.current.terms.length - 1];
        expect(updatedLastTerm.courses).toEqual(expect.arrayContaining([course1]));
        const firstTerm = result.current.terms[0];
        expect(firstTerm.courses).toEqual(expect.not.arrayContaining([course2]));

        act(() => result.current.addCourse(0, course2));
        const updatedFirstTerm = result.current.terms[0];
        expect(updatedFirstTerm.courses).toEqual(expect.arrayContaining([course2]));
    })

    test('Course is removed successfully', () => {
        const course1: Course = create("course");
        const course2: Course = create("course", {name: "Test Course 2", id: 2});

        const { result } = renderHook(() => useSchedule(), { wrapper });

        act(() => result.current.addCourse(0, course1));
        act(() => result.current.addCourse(0, course2));
        var updatedTerm = result.current.terms[0];
        expect(updatedTerm.courses).toEqual(expect.arrayContaining([course1, course2]));

        act(() => result.current.deleteCourse(course1.id));
        updatedTerm = result.current.terms[0];
        expect(updatedTerm.courses).toEqual(expect.arrayContaining([course2]));

    })

    test('Cannot add duplicate courses', () => {
        const course = create("course");

        const { result } = renderHook(() => useSchedule(), { wrapper });
        act(() => result.current.addCourse(result.current.terms.length - 1, course));
        const lastTerm = result.current.terms[result.current.terms.length - 1];
        const courseNo = lastTerm.courses.length;
        act(() => result.current.addCourse(result.current.terms.length - 1, course));
        const updatedLastTerm = result.current.terms[result.current.terms.length - 1];
        expect(updatedLastTerm.courses.length).toEqual(courseNo);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    })

    test('Adding a term to a schedule with existing courses adds an empty term with correct level and date', () => {
        const { result } = renderHook(() => useSchedule(), { wrapper });

        const course = create("course");
        act(() => result.current.addCourse(0, course));

        const expectedNewTermDate = offsetToDate(1, result.current.startYear, result.current.startSeason);

        act(() => result.current.newTerm());

        expect(result.current.terms.length).toBe(2);
        const newTerm = result.current.terms[1];
        expect(newTerm.courses).toEqual([]);
        expect(newTerm.level).toBe("1B");
        expect(newTerm.year).toBe(expectedNewTermDate.year);
        expect(newTerm.season).toBe(expectedNewTermDate.season);
    })

    test('Deleting an arbitrary term except the first term is done successfully', () => {
        const { result } = renderHook(() => useSchedule(), { wrapper });

        act(() => result.current.newTerm());

        const termBeforeDeletion = result.current.terms[1];

        act(() => result.current.deleteTerm(1));

        expect(result.current.terms.length).toBe(1);
        expect(result.current.terms).not.toContainEqual(termBeforeDeletion);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    })

    test('First term cannot be deleted', () => {
        const { result } = renderHook(() => useSchedule(), { wrapper });

        const firstTerm = result.current.terms[0];

        act(() => result.current.deleteTerm(0));

        expect(result.current.terms.length).toBe(1);
        expect(result.current.terms[0]).toEqual(firstTerm);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    })
});