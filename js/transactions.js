import {
    validateExpense,
    ValidationError
} from "./validation.js";

let editingId = null;

function clearErrors() {
    document
        .querySelectorAll(".error-message")
        .forEach((element) => {
            element.textContent = "";
        });
}

function showErrors(errors) {
    Object.entries(errors).forEach(
        ([field, message]) => {
            const errorElement =
                document.querySelector(
                    `#${field}-error`
                );

            if (errorElement) {
                errorElement.textContent = message;
            }
        }
    );
}

export function attachTransactionEvents(store) {
    const form = document.querySelector("#expense-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            const expense = {
                description: formData.get("description"),
                amount: Number(formData.get("amount")),
                category: formData.get("category"),
                date: formData.get("date"),
                paymentMethod: formData.get("paymentMethod")
            };

            clearErrors();

            try{
                validateExpense(expense);
            }
            catch(error) {
                if(error instanceof ValidationError) {
                    showErrors(error.errors);
                    return;
                }

                console.error("Unexpected error:", error);
            }

            if (editingId) {
                store.dispatch({
                    type: "EDIT_EXPENSE",
                    payload: {
                        id: editingId,
                        ...expense
                    }
                });

                editingId = null;
            } else {
                store.dispatch({
                    type: "ADD_EXPENSE",
                    payload: {
                        id: crypto.randomUUID(),
                        ...expense,
                        deleted: false
                    }
                });
            }
        });
    }

    const deleteButtons =
        document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const expenseId = button.value;

            store.dispatch({
                type: "DELETE_EXPENSE",
                payload: expenseId
            });
        });
    });

    const editButtons =
        document.querySelectorAll(".edit-btn");

    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const expenseId = button.value;

            const expense = store
                .getState()
                .expenses
                .find((item) => item.id === expenseId);

            if (!expense) {
                return;
            }

            document.querySelector("#description").value =
                expense.description;

            document.querySelector("#amount").value =
                expense.amount;

            document.querySelector("#category").value =
                expense.category;

            document.querySelector("#date").value =
                expense.date;

            document.querySelector("#payment-method").value =
                expense.paymentMethod;

            editingId = expenseId;

            const submitButton =
                form.querySelector('button[type="submit"]');

            submitButton.textContent = "Update Expense";
        });
    });


    const restoreButtons = document.querySelectorAll(".restore-btn");

    restoreButtons.forEach((button) => {
        button.addEventListener("click", ()=> {
            const expenseId = button.value;

            store.dispatch({
                type: "RESTORE_EXPENSE",
                payload: expenseId
            });
        });
    });


    
}