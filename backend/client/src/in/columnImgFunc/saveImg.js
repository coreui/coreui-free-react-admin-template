import axios from 'axios';

export function saveImg(filename,img){
	const toSend= new FormData();
	toSend.append("filename",filename);
	toSend.append("file",img);
	axios.post("/api/saveImg",
		toSend,
		{
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
	).then(res=>{
			return true
		}).catch(err=>{
			console.log("儲存失敗");
			return false
	})
}