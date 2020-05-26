import React, { Component } from "react";
import Header from "../../components/common/Header/TopHeader";
import JoinForm from "../../components/common/JoinForm";
import Footer from "../../components/common/Footer";
import AssetsDetailContent from "../../components/assetsDetail";

export class index extends Component {
  render() {
    return (
      <div>
        <Header />

        <AssetsDetailContent />

        <JoinForm />

        <Footer />
      </div>
    );
  }
}

export default index;
