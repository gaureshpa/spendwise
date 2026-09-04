import {createStore} from "./store.js";
import {loadExpenses} from "./data.js";
import {loadState, saveState} from "./storage.js";
import {initRouter} from "./router.js";
import { renderApp } from "./render.js";

const savedState = loadState();

const store = createStore(
    savedState || undefined
);

let currentRoute = "/dashboard";

store.subscribe((state) => {
    renderApp(state, currentRoute, store);

    if (!state.loading && !state.error) {
        saveState(state);
    }

});

async function initializeApp() {
    if (savedState) {
        return;
    }

    store.dispatch({
        type: "SET_LOADING",
        payload: true
    });

    try {
        const expenses = await loadExpenses();

        store.dispatch({
            type: "SET_EXPENSES",
            payload: expenses
        });
    } catch (error) {
        store.dispatch({
            type: "SET_ERROR",
            payload: error.message
        });
    }

}

initializeApp();

initRouter((route) => {
    currentRoute = route;
    renderApp(store.getState(), currentRoute, store);
});

export {
    store
};