var axios = require("axios");
const fs = require("fs");

let images = {};
var config = {
  method: "get",
  url: "https://api.imgur.com/3/album/Afp7f0F/images",
  headers: {
    Authorization: "Client-ID 3689244871c2cf6",
  },
};

axios(config)
  .then(function (response) {
    let info = response.data.data;
    for (var i = 0; i < info.length; i++) {
      images[info[i].description] = info[i].link;
    }
    let data = JSON.stringify(images);
    fs.writeFileSync("history_images.json", data);
    console.log(response.data.data[0]);
  })
  .catch(function (error) {
    console.log(error);
  });
