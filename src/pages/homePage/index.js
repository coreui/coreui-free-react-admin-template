import React, { Component } from "react";
import Header from "../../components/common/Header";
import JoinForm from "../../components/common/JoinForm";
import Footer from "../../components/common/Footer";
import HomeContent from "../../components/homePage";

export class index extends Component {
  render() {
    return (
      <div>
        <Header />

        <HomeContent />

        <JoinForm />

        <Footer />
      </div>
    );
  }
}

export default index;
