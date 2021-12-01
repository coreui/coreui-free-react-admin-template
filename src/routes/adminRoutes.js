/* eslint-disable */
import React from 'react'
import DefaultLayout from "../layout/DefaultLayout";
const Colors = React.lazy(() => import('../views/theme/colors/Colors'))
const Typography = React.lazy(() => import('../views/theme/typography/Typography'))

import { Dashboard } from "../views/dashboard/Dashboard";
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))

export const adminRoutes = [
    {
        path: "/",
        key: "/",
        name: "Home",
        component: DefaultLayout,
    },
    {
        path: "/dashboard",
        key: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        exact: true,
    }
];
