// /src/pages.js
import React from 'react'
import Home from "./Home"
import Login from "./Login"
import Support from "./Support"
import About from "./About"
import Contact from "./Contact"
import Register from "./Register"
import Forget from "./Forget"
import Team from "./Team"
import History from "./History"

const Home_page = () =>
{
    return <Home/>;
};
const Login_page = () =>
{
    return <Login/>;
};
const Support_page = () =>
{
    return <Support/>;
};
const About_page = () =>
{
    return <About/>;
};
const Contact_page = () =>
{
    return <Contact/>;
};
const Register_page = () =>
{
    return <Register/>
};
const Forget_page = () =>
{
    return <Forget/>
};
const Team_page = () =>
{
    return <Team/>
}
const History_page = () =>
{
    return <History/>
}

export { Home_page,Login_page, Support_page,About_page ,Contact_page, Register_page,Forget_page ,Team_page,History_page};