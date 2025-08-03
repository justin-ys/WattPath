/**
 * @jest-environment jsdom
 */

import {useSchedule} from "@/app/hooks/useSchedule";
import {Course} from "@/app/types/course";
import { Season } from "@/app/types/season";
import create from "@/test/factories/create"

import { renderHook, act } from '@testing-library/react'

describe('useSchedule', () => {

    let consoleErrorSpy: any;

    beforeEach(() => {
        // Spy on console.error and silence it
        consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore the original console.error
        consoleErrorSpy.mockRestore();
    });

    test('Valid course is added successfully', () => {
        const course1: Course = create("course");
        const course2: Course = create("course", {name: "Test Course 2", id: 2});

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

    test('Course is removed successfully', () => {
        const course1: Course = create("course");
        const course2: Course = create("course", {name: "Test Course 2", id: 2});

        const { result } = renderHook(() => useSchedule());

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

        const { result } = renderHook(() => useSchedule());
        act(() => result.current.addCourse(result.current.terms.length - 1, course));
        const lastTerm = result.current.terms[result.current.terms.length - 1];
        const courseNo = lastTerm.courses.length;
        act(() => result.current.addCourse(result.current.terms.length - 1, course));
        const updatedLastTerm = result.current.terms[result.current.terms.length - 1];
        expect(updatedLastTerm.courses.length).toEqual(courseNo);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    })
});