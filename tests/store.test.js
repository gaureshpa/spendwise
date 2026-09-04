import { describe, it, expect } from "vitest";
import { createStore } from "/js/store.js";

describe("Expense Store", () => {

    function createTestStore() {
        return createStore({
            loading: false,
            error: null,
            expenses: []
        });
    }

    const testExpense = {
        id: "1",
        description: "Coffee",
        amount: 150,
        category: "Food",
        date: "2026-09-04",
        paymentMethod: "UPI",
        deleted: false
    };


    it("should add an expense", () => {
        const store = createTestStore();

        store.dispatch({
            type: "ADD_EXPENSE",
            payload: testExpense
        });

        expect(store.getState().expenses).toHaveLength(1);

        expect(
            store.getState().expenses[0].description
        ).toBe("Coffee");
    });


    it("should edit an expense", () => {
        const store = createTestStore();

        store.dispatch({
            type: "ADD_EXPENSE",
            payload: testExpense
        });

        store.dispatch({
            type: "EDIT_EXPENSE",
            payload: {
                id: "1",
                description: "Lunch",
                amount: 250
            }
        });

        const expense =
            store.getState().expenses[0];

        expect(expense.description).toBe("Lunch");
        expect(expense.amount).toBe(250);
    });


    it("should soft delete an expense", () => {
        const store = createTestStore();

        store.dispatch({
            type: "ADD_EXPENSE",
            payload: testExpense
        });

        store.dispatch({
            type: "DELETE_EXPENSE",
            payload: "1"
        });

        expect(
            store.getState().expenses[0].deleted
        ).toBe(true);
    });


    it("should restore a deleted expense", () => {
        const store = createTestStore();

        store.dispatch({
            type: "ADD_EXPENSE",
            payload: {
                ...testExpense,
                deleted: true
            }
        });

        store.dispatch({
            type: "RESTORE_EXPENSE",
            payload: "1"
        });

        expect(
            store.getState().expenses[0].deleted
        ).toBe(false);
    });


    it("should calculate the total expense amount", () => {
        const store = createStore({
            loading: false,
            error: null,
            expenses: [
                {
                    ...testExpense,
                    id: "1",
                    amount: 100
                },
                {
                    ...testExpense,
                    id: "2",
                    amount: 200
                },
                {
                    ...testExpense,
                    id: "3",
                    amount: 300
                }
            ]
        });

        const total = store
            .getState()
            .expenses
            .filter((expense) => !expense.deleted)
            .reduce(
                (sum, expense) =>
                    sum + expense.amount,
                0
            );

        expect(total).toBe(600);
    });


    it("should keep deleted expenses out of active totals", () => {
        const store = createStore({
            loading: false,
            error: null,
            expenses: [
                {
                    ...testExpense,
                    id: "1",
                    amount: 100,
                    deleted: false
                },
                {
                    ...testExpense,
                    id: "2",
                    amount: 500,
                    deleted: true
                }
            ]
        });

        const activeExpenses = store
            .getState()
            .expenses
            .filter((expense) => !expense.deleted);

        const total = activeExpenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );

        expect(total).toBe(100);
    });

});