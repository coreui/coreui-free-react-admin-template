//前端isLogin
import axios from 'axios';

export function isLoginChecker(){
	axios.post("/api/isLogin",
		{}
	).then(res=>{//{account}
		console.log("登入者",res.data.account);
		return true;
	}).catch(err => {
		console.log("未登入",err.response.data.description);
		return false;
	})
}