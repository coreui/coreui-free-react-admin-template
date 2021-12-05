/* eslint-disable */
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const withAdminAuth = (auth) => (WrappedComponent) => {
    return (props) => {
        const { replace } = useHistory();
        const admin = useSelector((state) => state.admin.admin);
        useEffect(() => {
        //    (!admin) ? replace("/login") : replace("/dashboard")
        }, [admin]);

        return <WrappedComponent {...props} />;
    };
};
