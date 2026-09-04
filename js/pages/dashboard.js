function calculateDashboardStats(expenses) {
    const activeExpenses = expenses.filter(
        (expense) => !expense.deleted
    );

    const totalExpenses = activeExpenses.length;

    const totalAmount = activeExpenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const averageExpense =
        totalExpenses > 0 ?
        totalAmount / totalExpenses :
        0;

    const highestExpense =
        totalExpenses > 0 ?
        Math.max(
            ...activeExpenses.map(
                (expense) => Number(expense.amount)
            )
        ) :
        0;

    const now = new Date();

    const currentMonth = activeExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
        );
    });

    const currentMonthSpending = currentMonth.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    return {
        totalExpenses,
        totalAmount,
        averageExpense,
        highestExpense,
        currentMonthSpending
    };

}

export function renderDashboard(state) {
    const {
        totalExpenses,
        totalAmount,
        averageExpense,
        highestExpense,
        currentMonthSpending
    } = calculateDashboardStats(state.expenses);

    return `
    <section>
        <h2>Dashboard</h2>

        <p>Welcome to SpendWise.</p>

        <div class="dashboard-summary">

            <article>
                <h3>Total Expenses</h3>
                <p>${totalExpenses}</p>
            </article>

            <article>
                <h3>Total Amount Spent</h3>
                <p>₹${totalAmount.toFixed(2)}</p>
            </article>

            <article>
                <h3>Average Expense</h3>
                <p>₹${averageExpense.toFixed(2)}</p>
            </article>

            <article>
                <h3>Highest Expense</h3>
                <p>₹${highestExpense.toFixed(2)}</p>
            </article>

            <article>
                <h3>Current Month's Spending</h3>
                <p>₹${currentMonthSpending.toFixed(2)}</p>
            </article>

        </div>
    </section>
`;

}