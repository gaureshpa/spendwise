import { describe, it, expect } from "vitest";
import {
    validateExpense,
    ValidationError
} from "/js/validation.js";

describe("Expense Validation", () => {

    const validExpense = {
        description: "Coffee",
        amount: 150,
        category: "Food",
        date: "2026-09-04",
        paymentMethod: "UPI"
    };


    // 1. Valid expense
    it("should accept a valid expense", () => {
        expect(() => {
            validateExpense(validExpense);
        }).not.toThrow();
    });


    // 2. Description under 3 characters
    it("should reject a description under 3 characters", () => {
        const expense = {
            ...validExpense,
            description: "Hi"
        };

        expect(() => {
            validateExpense(expense);
        }).toThrow(ValidationError);
    });


    // 3. Description over 80 characters
    it("should reject a description over 80 characters", () => {
        const expense = {
            ...validExpense,
            description: "a".repeat(81)
        };

        expect(() => {
            validateExpense(expense);
        }).toThrow(ValidationError);
    });


    // 4. Amount is zero
    it("should reject an amount of zero", () => {
        const expense = {
            ...validExpense,
            amount: 0
        };

        expect(() => {
            validateExpense(expense);
        }).toThrow(ValidationError);
    });


    // 5. Category missing
    it("should reject a missing category", () => {
        const expense = {
            ...validExpense,
            category: ""
        };

        expect(() => {
            validateExpense(expense);
        }).toThrow(ValidationError);
    });


    // 6. Payment method missing
    it("should reject a missing payment method", () => {
        const expense = {
            ...validExpense,
            paymentMethod: ""
        };

        expect(() => {
            validateExpense(expense);
        }).toThrow(ValidationError);
    });

});