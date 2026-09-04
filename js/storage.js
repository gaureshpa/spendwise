const STORAGE_KEY = "spendwise-state";

export function saveState(state) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}

export function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
        return null;
    }

    try {
        return JSON.parse(savedState);
    } catch (error) {
        console.error("Failed to parse saved state:", error);

        localStorage.removeItem(STORAGE_KEY);

        return null;
    }
}