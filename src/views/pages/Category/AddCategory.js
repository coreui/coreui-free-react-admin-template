import axios from "axios";
import React, { useState } from "react";

const AddCategory = (props)=>{
  const [category,setCategory] = useState({
    name:"",
    img:"",
  })
  
     const handelImgUpload = (event)=>{
              // console.log(event.target.files[0]);
      const imgData = new FormData()
      imgData.set('key','521a48086a6196794f555e8c9f24af19')
      imgData.append('image',event.target.files[0])
      axios.post('https://api.imgbb.com/1/upload', imgData)
      .then(function (response) {
        // console.log(response.data.data.display_url);
        
        const ImgUrl = response.data.data.display_url
        console.log("this is imge url", ImgUrl)
        if(ImgUrl !== 'undefined'){
          setCategory({img:ImgUrl})
        }
     
      })


    }

  const add = (e) => {
    e.preventDefault();
    if (category.name === ""||category.img === "") {
      alert("All fields are mandatory!");
      return;
    }
    props.addCategoryHandler(category);
    setCategory({ name: "",img: ""});
  };
    return (
      <div className="ui main">
        <h2>Add Category</h2>
        <form className="ui form" onSubmit={add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={category.name}
              onChange={(e) => setCategory({ name: e.target.value })}
            />

            <input
              type="file"
              name="name"
              placeholder="Upload image"
              onChange={handelImgUpload}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }

export default AddCategory;