import axios from "axios";
import React, { useState } from "react";

const EditCategory = (props)=>{
  console.log("incomingthings", props)
  const { id, name, img } = props.location.props.category;
  const [category,setCategory] = useState({
    id: id,
    name: name,
    img: img,
  })
  console.log("insideThing", category)

  
     const handelImgUpload = (event)=>{
       event.preventDefault()
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
          setCategory({...category,img:ImgUrl})
        }
     
      })


    }

  const add = (e) => {
    e.preventDefault();
    if (category.name === ""||category.img === "") {
      alert("All fields are mandatory!");
      return;
    }
    console.log("passing value", category)
    props.updateCategoryHandler(category);
    setCategory({ name: "",img: ""});
  };
    return (
      <div className="ui main">
        <h2>Update Category</h2>
        <form className="ui form" onSubmit={add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={category.name}
              onChange={(e) => setCategory({...category, name: e.target.value })}
            />

            <input
              type="file"
              name="name"
              placeholder="Upload image"
              onChange={handelImgUpload}
            />
          </div>
          <button className="ui button blue">update</button>
        </form>
      </div>
    );
  }

export default EditCategory;