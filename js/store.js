const initialState = {
    expenses: [],
    loading: false,
    error: null
};

export function createStore(initialData = initialState) {
    let state = {
        ...initialData
    };

    const listeners = new Set();

    function getState() {
        return {
            ...state,
            expenses: [...state.expenses]
        };
    }

    function subscribe(listener) {
        listeners.add(listener);

        return function unsubscribe() {
            listeners.delete(listener);
        };
    }

    function notify() {
        listeners.forEach((listener) => {
            listener(getState());
        });
    }

    function dispatch(action) {
        switch (action.type) {
            case "SET_LOADING":
                state = {
                    ...state,
                    loading: action.payload
                };
                break;

            case "SET_EXPENSES":
                state = {
                    ...state,
                    expenses: action.payload,
                    loading: false,
                    error: null
                };
                break;

            case "SET_ERROR":
                state = {
                    ...state,
                    error: action.payload,
                    loading: false
                };
                break;

            case "ADD_EXPENSE":
                state = {
                    ...state,
                    expenses: [
                        ...state.expenses,
                        action.payload
                    ]
                };
                break;

            case "EDIT_EXPENSE":
                state = {
                    ...state,
                    expenses: state.expenses.map((expense) =>
                        expense.id === action.payload.id ?
                        {
                            ...expense,
                            ...action.payload
                        } :
                        expense
                    )
                };
                break;

            case "DELETE_EXPENSE":
                state = {
                    ...state,
                    expenses: state.expenses.map((expense) =>
                        expense.id === action.payload ?
                        {
                            ...expense,
                            deleted: true
                        } :
                        expense
                    )
                };
                break;

            case "RESTORE_EXPENSE":
                state = {
                    ...state,
                    expenses: state.expenses.map((expense) =>
                        expense.id === action.payload ?
                        {
                            ...expense,
                            deleted: false
                        } :
                        expense
                    )
                };
                break;

            default:
                throw new Error(
                    `Unknown action type: ${action.type}`
                );
        }

        notify();
    }

    return {
        getState,
        dispatch,
        subscribe
    };

}