import { lazy } from "react";
import type { RouteObject } from "react-router";

//Load the pages
const NotFound = lazy(() => import('@/Modules/Errors/Pages/NotFound'))

const ErrorRoutes: RouteObject[] = [
    {
        path: '*',
        element: <NotFound />
    }
]


export default ErrorRoutes;