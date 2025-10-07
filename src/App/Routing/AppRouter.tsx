import { type RouteObject } from "react-router"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import GlobalLoader from "@/_Shared/Hoc/GlobalLoader"
import NotFound from "@/Modules/Errors/Pages/NotFound"
import ErrorFallback from "@/_Shared/Components/ErrorFallback"
import ScrollToTop from "@/_Shared/Components/ScrollToTop"


const wrapRoutesWithErrorBoundary = (route: RouteObject): RouteObject => {
    if (route.element) {
        const wrappedRoute = {
            ...route,
            element: (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<GlobalLoader />}>
                        <ScrollToTop />
                        {route.element}
                    </Suspense>
                </ErrorBoundary>
            )
        }
        if (route.children) {
            wrappedRoute.children = route.children.map(wrapRoutesWithErrorBoundary)
        }
        return wrappedRoute
    }

    return route;
}

const loadRoutes = (): RouteObject[] => {
    try {
        const routeModules = import.meta.glob("@/Modules/**/Routes.tsx", { eager: true, import: "default" })

        const routes: RouteObject[] = [];

        for (const path in routeModules) {
            try {
                const module = routeModules[path] as RouteObject[];
                if (Array.isArray(module)) {
                    routes.push(...module.map(wrapRoutesWithErrorBoundary))
                }
            } catch (moduleError) {
                console.error(`Failed to load routes for ${path}`, moduleError)
            }
        }

        const has404Route = routes.some(route => route.path === "*");

        if (!has404Route) {
            routes.push({
                path: "*",
                element: <NotFound />
                // <div className="flex items-center justify-center min-h-screen text-xl font-medium">404 Page Not Found</div>
            })
        }

        return routes;
    }
    catch (error) {
        console.error("error loading routes", error)
        return [
            {
                path: "/",
                element: <ErrorFallback error={error as Error} />
            }
        ]
    }
}

const routes = loadRoutes();
export default routes;