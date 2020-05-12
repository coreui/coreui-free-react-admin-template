import { AppHeader } from "@coreui/react";
import React from "react";
import DefaultHeader from "./components/DefaultHeader";
import DefaultSidebar from "./components/DefaultSidebar";
import HomeSlider from "./components/HomeSlider";
import PostsList from "./components/PostsList";
import AboutComponent from "./components/AboutComponent";
import StatsList from "./components/StatsList";
import PartnersList from "./components/PartnersList";
import Form from "./components/Form";
import Footer from "./components/Footer";

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
