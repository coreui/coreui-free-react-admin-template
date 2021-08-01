import axios from 'axios';

export function getImg (filename){
	const toSend= {"filename":filename};
	console.log(filename)
	axios.post("/api/getImg",
		toSend
	).then(res=>{//{data}
			const objImg = res.data.data;
			const img = new Buffer(objImg.data, 'binary').toString('base64')
			this.setState({
				img:"data:"+objImg.contentType+";base64,"+img
			})

		}).catch(err => {
			console.log("讀取失敗或查無檔案");
			console.log(err.response.description)
			return false
	})
}