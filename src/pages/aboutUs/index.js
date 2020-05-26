import React, { Component } from "react";
import Header from "../../components/common/Header/TopHeader";
import JoinForm from "../../components/common/JoinForm";
import Footer from "../../components/common/Footer";
import AboutUsContent from "../../components/aboutUs/";

export class index extends Component {
  render() {
    return (
      <div>
        <Header />

        <AboutUsContent />

        <JoinForm />

        <Footer />
      </div>
    );
  }
}

export default index;
