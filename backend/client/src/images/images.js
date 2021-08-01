const axios = require("axios");
const fs = require("fs");
// import link from "./image_links.js";
const link = {
  add_icon: "aetlNRG",
  arrow_left: "PrKuiST",
  arrow_right: "BJrJzFn",
  arrow_search: "ZCfBHBt",
  background_colorful: "r6TCgAr",
  background_in: "H7YV0sw",
  background_opacity: "b5sM7vx",
  default_image: "grvRy3Q",
  edit: "6Ni4GNj",
  "eesa-icon": "0Ghwswd",
  kronos: "Kq80Hhe",
  left_image: "fpQfpE4",
  logo_row: "JmgAHuQ",
  main: "bHJIfnT",
  McKinsey: "uIxcAtB",
  Recommendation: "glV7K4R",
  Recruitment: "NZ08TvY",
  refresh: "4fwpZVa",
  Register_Account: "RkO5SIv",
  Register_Facebook: "XKE4fpw",
  remove_icon: "N8I5dFq",
  Riedel: "YBvakKS",
  right_image: "2IBq5k0",
  search_bar: "OW7qZI8",
  show_less: "9DKxVfl",
  show_more: "vMesBhE",
  social_fb: "LTqieTF",
};

async function getImagesLink() {
  let urls = {};
  try {
    for (let key in link) {
      let id = link[key];
      let config = {
        method: "get",
        url: "https://api.imgur.com/3/image/" + id,
        headers: {
          Authorization: "Client-ID 3689244871c2cf6",
        },
      };
      const response = await axios(config);
      const image_url = response.data.data.link;
      //   write urls into dict(converted to JSON later)
      urls[key] = image_url;
    }
    return urls;
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  try {
    let data = JSON.stringify(await getImagesLink());
    fs.writeFileSync("public_images.json", data);
  } catch (err) {
    console.log(err);
  }
})();
