export function renderTransactions(state) {
    const activeExpenses = state.expenses.filter(
        (expense) => !expense.deleted
    );

    const deletedExpenses = state.expenses.filter(
        (expense) => expense.deleted
    );

    const transactionsHTML = activeExpenses
        .map((expense) => {
            return `
            <tr>
                <td>${expense.description}</td>
                <td>₹${Number(expense.amount).toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>${expense.paymentMethod}</td>
                <td>
                    <button
                        type="button"
                        class="edit-btn"
                        value="${expense.id}"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-btn"
                        value="${expense.id}"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
        })
        .join("");

    const deletedTransactionsHTML = deletedExpenses
        .map((expense) => {
            return `
            <tr>
                <td>${expense.description}</td>
                <td>₹${Number(expense.amount).toFixed(2)}</td>
                <td>
                    <button
                        type="button"
                        class="restore-btn"
                        value="${expense.id}"
                    >
                        Restore
                    </button>
                </td>
            </tr>
        `;
        })
        .join("");

    return `
    <section>
        <h2>Transactions</h2>

        <form id="expense-form">
            <h3>Add Expense</h3>

            <div>
                <label for="description">
                    Description
                </label>

                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                >

                <span id="description-error" class="error-message"></span>
            </div>

            <div>
                <label for="amount">Amount</label>

                <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="0.01"
                    step="0.01"
                    required
                >

                <span id="amount-error" class="error-message"></span>
            </div>

            <div>
                <label for="category">
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    required
                >
                    <option value="">
                        Select a category
                    </option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Bills">Bills</option>
                    <option value="Shopping">
                        Shopping
                    </option>
                    <option value="Entertainment">
                        Entertainment
                    </option>
                    <option value="Other">Other</option>
                </select>

                <span id="category-error" class="error-message"></span>
            </div>

            <div>
                <label for="date">Date</label>

                <input
                    type="date"
                    id="date"
                    name="date"
                    required
                >

                <span id="date-error" class="error-message"></span>
            </div>

            <div>
                <label for="payment-method">
                    Payment Method
                </label>

                <select
                    id="payment-method"
                    name="paymentMethod"
                    required
                >
                    <option value="">
                        Select payment method
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">
                        Bank Transfer
                    </option>
                </select>

                <span id="paymentMethod-error" class="error-message"></span>
            </div>

            <button type="submit">
                Add Expense
            </button>
        </form>

        <h3>Expense List</h3>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                ${transactionsHTML}
            </tbody>
        </table>
    </section>

    <section>
        <h3>Deleted Expenses</h3>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                ${deletedTransactionsHTML}
            </tbody>
        </table>
    </section>
`;

}