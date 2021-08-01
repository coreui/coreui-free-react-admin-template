import React from 'react';
import './Search_block.css';
import default_image from '../../images/default_image.png';
import {Link} from 'react-router-dom';
const map = {
	"account":"account",
	"username":"username",
	"nickname":"nickname",
	"profile":"profile",
	"publicEmail":"publicEmail",
	"office":"office",
	"homephone":"homephone",
	"cellphone":"cellphone",
	"education.major":["education",'major'],
	"education.double_major":["education",'double_major'],
	"education.minor":["education",'minor'],
	"education.master":["education",'master'],
	"education.doctor":["education",'doctor'],
	// "Occupation.C":"Company",
	// "Occupation.O":"Occupation",
	// "Occupation.P":"Position"
};

// const template = {
//     userimage:'',
//     LinkedIn:'',
//     account:'',
//     education = {
//         doctor:{
//             SD:''
//         },
//         double_major:{
//             SD:''
//         },
//         major:{
//             SD:''
//         },
//         master:{
//             SD:''
//         },
//         minor:{
//             SD:''
//         }
//     },
//     facebook:'',
//     nickname:'',
//     office:'',
//     profile:'',
//     publicEmail:'',
//     username:'',
//     web:'',
//     occupation:[
//         {
//             company:'',
//             position:'',
//             occupation:''
//         },
//         {
//             company:'',
//             position:'',
//             occupation:''
//         }
//         .
//         .
//         .
//     ] 
// }
const Search_block = (props) =>{
    let id = props.id;
    let content = props.content;
    let prevstate = props.prevstate;
    let list = props.list;
    let visual_list = [];
    list.forEach(catalog => {
        catalog = map[catalog];
        if(typeof(catalog)===typeof(visual_list)){
            visual_list.push(<p>{content[catalog[0]][catalog[1]]['SD']}</p>);
        }
        else{
            visual_list.push(<p>{content[catalog]}</p>);
        }
        
    });
    let $userimage = null;
    if (content.userimage){
        $userimage = <img src={content.userimage} alt="user"/>
    }else{
        $userimage = <img src={default_image} alt="user"/>
    }

    content['prevstate']=prevstate
    return(
        <Link to={{
            // pathname:'/in/B08901072',
            // state:{
            //     userdata:{
            //         account:'B08901072',
            //         username:'王友廷',
            //         publicEmail:'tim983649@gmail.com'
            //     }
            // }
            pathname:'/in/'+content.account,
            state:{
                userdata:content,
            }
        }}>
        <div id={id} className="Search_block_div">
            {$userimage}
            <p>{content.username}</p>
            <p>{content.account}</p>
            {visual_list}
            {/* <img src={default_image} alt="user"/>
            <div id="Search_block_text">
                <p>username:noidname</p>
                <p>account:B08901072</p>
                <p>Email:tim983649@gmail.com</p>
            </div> */}
        </div>
        </Link>
    )
}

export default Search_block;