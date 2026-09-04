import { attachTransactionEvents } from "./transactions.js";
import { renderDashboard } from "./pages/dashboard.js";
import { renderTransactions } from "./pages/transactions.js";
import { renderCategories } from "./pages/categories.js";

function renderLoading() {
    return `
        <section class="loading-container">
            <p>Loading expenses...</p>
        </section>
    `;
}

function renderError(errorMessage) {
    return `
        <section class="error-container">
            <h2>Something went wrong</h2>
            <p>${errorMessage}</p>
        </section>
    `;
}

export function renderApp(state, route, store) {
    const app = document.querySelector("#app");

    if (!app) {
        throw new Error("App container was not found.");
    }

    if (state.loading) {
        app.innerHTML = renderLoading();
        return;
    }

    if (state.error) {
        app.innerHTML = renderError(state.error);
        return;
    }

    switch (route) {
        case "/dashboard":
            app.innerHTML = renderDashboard(state);
            break;

        case "/transactions":
            app.innerHTML = renderTransactions(state);
            attachTransactionEvents(store);
            break;

        case "/categories":
            app.innerHTML = renderCategories(state);
            break;

        default:
            app.innerHTML = renderDashboard(state);
    }
}