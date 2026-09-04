export class ValidationError extends Error {
    constructor(message, errors = {}) {
        super(message);

        this.name = "ValidationError";
        this.errors = errors;
    }
}

export function validateExpense(expense) {
    const errors = {};

    // Description
    if (
        expense.description.trim().length < 3 ||
        expense.description.trim().length > 80
    ) {
        errors.description =
            "Description must be between 3 and 80 characters.";
    }

    // Amount
    if (!expense.amount || expense.amount <= 0) {
        errors.amount =
            "Amount must be greater than 0.";
    }

    // Category
    if (!expense.category) {
        errors.category =
            "Please select a category.";
    }

    // Date
    if (!expense.date) {
        errors.date =
            "Please select a date.";
    }

    // Payment method
    if (!expense.paymentMethod) {
        errors.paymentMethod =
            "Please select a payment method.";
    }

    if (Object.keys(errors).length > 0) {
        throw new ValidationError(
            "Invalid expense data.",
            errors
        );
    }
}
