import React, { Component } from "react";
import "./History.css";
// import "./History_member.css"
import data from "../images/history/history_images.json";
// import B03_1 from "../images/history/B03_1.png";
// import B03_2 from "../images/history/B03_2.png";
// import B03_3 from "../images/history/B03_3.png";
// import B03_4 from "../images/history/B03_4.png";
// import B04_1 from "../images/history/B04_1.png";
// import B04_2 from "../images/history/B04_2.png";
// import B05_1 from "../images/history/B05_1.png";
// import B05_2 from "../images/history/B05_2.png";
// import B06_1 from "../images/history/B06_1.png";
// import B06_2 from "../images/history/B06_2.png";
// import B06_all from "../images/history/B06_all.png";

/* format:
    team leader should be first
    {
        leaders: 
        {
            name1:photo_src1,
            name2:photo_src2
            .
            .
            .
        }
        frontend:
        {
            ...
        }
        .
        .
        .
    }
*/

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.Generate_member_profile = this.generateMemberProfile.bind(this);
  }
  /* ============generateMemberProfile start ============*/
  // this function generate the image component of history member
  generateMemberProfile(member_list, team_name) {
    const member_components = [];
    let count = 0;
    for (let name in member_list) {
      member_components.push(
        <History_member
          className="Team_member_profile"
          id={"History_" + team_name + "_" + count}
          name={name}
          photo_src={member_list[name]}
        />
      );
      count++;
    }
    return (
      <div
        id={"Team_" + team_name + "_member"}
        className="row justify-content-center"
      >
        {member_components}
      </div>
    );
  }
  /* ============generateMemberProfile end ============*/

  render() {
    /* ==history leaders(write in frontend temporialy, might transfer to backend) ==*/
    const B03_teams = {
      leaders: {
        許秉鈞: data.B03_4,
        袁培傑: data.B03_3,
        楊景鈞: data.B03_2,
        劉禹辰: data.B03_1,
      },
    };
    const B04_teams = {
      leaders: { 蔡忠紘: data.B04_1, 陳曦: data.B04_2 },
    };
    const B05_teams = {
      leaders: { 莊永松: data.B05_1, 趙冠豪: data.B05_2 },
    };
    const B06_teams = {
      leaders: { 鄭謹譯: data.B06_1, 李筠婕: data.B06_2 },
    };
    /* ==history leaders(write in frontend temporialy, might transfer to backend) ==*/

    return (
      <div id="History_container">
        <div id="History_content" className="container-fluid">
          <div id="History_title_hr">History</div>
          {/* ================ History_member_components========= */}
          <div id="History_B03">
            <div id="History_B03_title_hr">B03 Founder of NTUEE+</div>
            <div id="History_B03_leader">
              {this.generateMemberProfile(B03_teams["leaders"], "leaders")}
            </div>
          </div>
          <div id="History_B04">
            <div id="History_B04_title_hr">B04 2nd NTUEE+</div>
            <div id="History_B04_leader">
              {this.generateMemberProfile(B04_teams["leaders"], "leaders")}
            </div>
          </div>
          <div id="History_B05">
            <div id="History_B05_title_hr">B05 3rd NTUEE+</div>
            <div id="History_B05_leader">
              {this.generateMemberProfile(B05_teams["leaders"], "leaders")}
            </div>
          </div>
          <div id="History_B06">
            <div id="History_B06_title_hr">B06 4th NTUEE+</div>
            <div id="History_B06_leader">
              {this.generateMemberProfile(B06_teams["leaders"], "leaders")}
            </div>
            {/*=================B06 all_members =================*/}
            <div className="container justify-content-center d-lg-flex d-block mx-auto">
              <div className="col-12 col-lg-6 d-flex justify-content-center">
                <img
                  src={data.B06_all}
                  alt="4th all members"
                  className="img-fluid "
                  style={{ minWidth: "300px" }}
                />
              </div>
              <div className="w-100 d-block d-lg-none"></div>
              <div
                id="History_member"
                className="col-12 col-lg-4 d-flex justify-content-center align-items-center"
              >
                <ul className="list-group" style={{ listStyle: "none" }}>
                  <li className="list-item">網頁組：</li>
                  <li className="list-item">
                    陳君輔、呂承樺、王友廷、李宗倫、賴侃軒
                  </li>
                  <li className="list-item">
                    吳建翰、王維恩、陳育楷、俞建琁、何明翰
                  </li>
                  <li className="list-item">留學組：</li>
                </ul>
              </div>
            </div>
            {/*=================B06 all_members =================*/}
          </div>
          {/* ================ History_member_components========= */}
        </div>
      </div>
    );
  }
}
export default History;

const History_member = (props) => {
  return (
    <div
      id={props.id}
      style={{ display: "inline-block" }}
      className="History_member_entity mx-5"
    >
      <img
        src={props.photo_src}
        alt={props.name + "'s photo"}
        width="250px"
        height="250px"
      />
      <p id={props.id + "_name"}>{props.name}</p>
    </div>
  );
};
