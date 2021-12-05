/* eslint-disable */
import DefaultLayout from "../layout/DefaultLayout";
import { Login } from "../views/pages/login/Login";

export const appRoutes = [
    {
        path: "/login",
        key: "/login",
        name: "Login",
        component: Login,
        exact: true
    },
    {
        path: "/",
        key: "/",
        name: "Home",
        component: DefaultLayout,
    },
    {
        path: "/assets",
        key: "/",
        name: "Assets",
        component: DefaultLayout,
    },
];
