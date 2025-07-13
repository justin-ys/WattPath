/**
 * @jest-environment jsdom
 */

import {useSchedule} from "@/app/hooks/useSchedule";
import {Course} from "@/app/types/course";
import { Season } from "@/app/types/season";

import { renderHook, act } from '@testing-library/react'

test('Valid course is added successfully', () => {
    const course1: Course = {
        title: "Test Course",
        id: 1,
        description: "Test Course Description",
        units: 3,
        allowed_programs: ["Computer Science"],
        terms_offered: [Season.Spring]
    }

    const course2: Course = {
        title: "Test Course 2",
        id: 2,
        description: "Test Course Description",
        units: 3,
        allowed_programs: ["Computer Science"],
        terms_offered: [Season.Spring]
    }

    const { result } = renderHook(() => useSchedule());

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

test('Cannot add duplicate courses', () => {
    const course: Course = {
        title: "Test Course",
        id: 1,
        description: "Test Course Description",
        units: 3,
        allowed_programs: ["Computer Science"],
        terms_offered: [Season.Spring]
    }

    const { result } = renderHook(() => useSchedule());
    act(() => result.current.addCourse(result.current.terms.length - 1, course));
    const lastTerm = result.current.terms[result.current.terms.length - 1];
    const courseNo = lastTerm.courses.length;
    act(() => result.current.addCourse(result.current.terms.length - 1, course));
    const updatedLastTerm = result.current.terms[result.current.terms.length - 1];
    expect(updatedLastTerm.courses.length).toEqual(courseNo);
})