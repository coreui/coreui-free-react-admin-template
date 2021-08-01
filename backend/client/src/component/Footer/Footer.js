import React from 'react';
import eesa from '../../images/eesa-icon.png';
import "./Footer.css"
const Footer = () => {
    return (
      <div className = "Footer_main container-fluid px-0 ">
        <div className = "Footer_container container-fluid px-0">
          <div className="container-fluid px-0 py-3">
            <div className = "col-12 col-lg-9 col-xl-10 justify-content-center d-lg-inline-block">
              <ul className = "footer_list list_group">
                <li className = "list-item"> 國立臺灣大學電機工程學系 系學會 </li>
                <li className = "list-item"> National Taiwan University Electrical Engineering Department Student Association </li>
                <li className = "list-item"> Email: ntueesa@gmail.com </li>
              </ul>
            </div>
            {/* <div className="w-100 d-block d-lg-none"></div> */}
            <div className = "col-12 col-lg-3 col-xl-2 d-lg-inline-block d-flex justify-content-center md-3 justify-content-xl-end">
              <img src={eesa} alt="eesa" className = "img-fluid icon_img "/>
            </div>
          </div>
          {/* <br/> */}

          <div className="Footer_row ">
            <div className="footer_copy">
              <p id = "footer_col_sm">
                Copyright &copy; {new Date().getFullYear()} NTUEESA
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Footer;