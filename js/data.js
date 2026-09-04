export class DataLoadError extends Error {
    constructor(message) {
        super(message);
        this.name = "DataLoadError";
    }
}

export async function loadExpenses() {
    try {
        // Simulate network delay
        await new Promise((resolve) => {
            setTimeout(resolve, 400);
        });

        const response = await fetch("/mock-expenses.json");

        if (!response.ok) {
            throw new DataLoadError(
                "Unable to load expense data. Please try again."
            );
        }

        const expenses = await response.json();

        return expenses;
    } catch (error) {
        if (error instanceof DataLoadError) {
            throw error;
        }

        throw new DataLoadError(
            "Something went wrong while loading your expenses."
        );
    }


}