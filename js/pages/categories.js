export function renderCategories(state) {
    const activeExpenses = state.expenses.filter(
        (expense) => !expense.deleted
    );

    const categoryTotals = {};

    activeExpenses.forEach((expense) => {
        const category = expense.category;
        const amount = Number(expense.amount);

        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += amount;
    });

    const categoriesHTML = Object.entries(categoryTotals)
        .map(([category, total]) => {
            return `
                <article>
                    <h3>${category}</h3>
                    <p>₹${total.toFixed(2)}</p>
                </article>
            `;
        })
        .join("");

    return `
        <section>
            <h2>Categories</h2>

            <p>Your spending grouped by category.</p>

            <div class="categories-list">
                ${categoriesHTML}
            </div>
        </section>
    `;
}
