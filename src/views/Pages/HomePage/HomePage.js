import { AppHeader } from "@coreui/react";
import React from "react";
import DefaultHeader from "./Components/DefaultHeader";
import DefaultSidebar from "./Components/DefaultSidebar";
import HomeSlider from "./Components/HomeSlider";
import PostsList from "./Components/PostsList";
import AboutComponent from "./Components/AboutComponent";
import StatsList from "./Components/StatsList";
import PartnersList from "./Components/PartnersList";
import Form from "./Components/Form";
import Footer from "./Components/Footer";

const HomePage = () => {
  return (
    <div className="app">
      <AppHeader fixed>
        <DefaultHeader />
      </AppHeader>
      <div className="app-body">
        <DefaultSidebar />
        <HomeSlider />
        <main className="main">
          <PostsList />
          <AboutComponent />
          <StatsList />
          <PartnersList />
          <Form />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
