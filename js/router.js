const routes = [
    "/dashboard",
    "/transactions",
    "/categories"
];

export function getCurrentRoute() {
    const hash = window.location.hash;


    // Default route
    if (!hash) {
        return "/dashboard";
    }

    const route = hash.replace("#", "");

    // Check if the route is valid
    if (routes.includes(route)) {
        return route;
    }

    // Fallback for invalid routes
    return "/dashboard";

}

export function initRouter(onRouteChange) {
    function handleRouteChange() {
        const route = getCurrentRoute();

        // Redirect invalid or empty hash to dashboard
        if (window.location.hash !== `#${route}`) {
            window.location.hash = route;
            return;
        }

        onRouteChange(route);
    }

    window.addEventListener("hashchange", handleRouteChange);
    handleRouteChange();
}