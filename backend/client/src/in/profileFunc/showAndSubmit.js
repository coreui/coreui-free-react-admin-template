import {map} from './map';
import axios from 'axios';

export function showVisual(){
	axios.post("/api/showVisual", 
		{}
	).then(res => {//{data:output}
		let D = res.data.data;
		let sta = {}
		map.forEach(([frontKey,backKey])=>{
			let arr = backKey.split('.')
			try{
				if(arr.length===1) sta[frontKey] = D[arr[0]]
				else if(arr.length===2) sta[frontKey] = D[arr[0]][arr[1]]
				else if(arr.length===3) sta[frontKey] = D[arr[0]][arr[1]][arr[2]]
			}catch{
				sta[frontKey] = ""
			}
		})
		sta.imagePreviewUrl = sta.userimage;
		console.log('sta = ',sta)
		sta.work = D.Occupation

		this.setState(sta);
	}).catch(err=>{
		// console.log(err)
		(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
	})
};

export function handleSubmit(event){
	event.preventDefault();
	console.log(this.state);
		const r = window.confirm("確認更改?");
		if (r){
			let sta= new FormData();
			map.forEach(elements=>{
				if(this.state.hasChanged[elements[0]] && this.state[elements[0]]!==undefined){
					sta.append(elements[1],this.state[elements[0]])
				}
				//sta[elements[1]]=this.state[elements[0]]//資料形式從{}改成FormData
			})
			// let Oc = []
			if(this.state.hasChanged.work) this.state.work.forEach(({O,P,C,show})=>{
				sta.append("Occupation[]", JSON.stringify({O,P,C,show}))
			})
			// for(let workL = 1;(workL<=this.state.Occupation_number||workL<=this.state.InitWorkNum);workL++){
			// 	if(this.state.hasChanged[`work_${workL}`]!==true){
			// 		sta.append("Occupation[]", JSON.stringify({
			// 			O: this.state[`work_O_${workL}`],
			// 			C: this.state[`work_C_${workL}`],
			// 			P: this.state[`work_P_${workL}`],
			// 			show: true
			// 		}))
			// 	}
			// }
			// console.log("Oc",Oc)
			// sta.append("Occupation[]",Oc)
			// let toModify = {}
			// let toRemove = {}
			// let toInsert = {}
			// for(let workL = 1;workL<=this.state.InitWorkNum;workL++){
			// 	console.log('workL0',workL)
			// 	if(this.state.hasChanged[`work_${workL}`]===true){
			// 		toRemove[`work_${workL}`] = 1
			// 	}else{
			// 		(['O','P','C']).forEach(word=>{
			// 			if(this.state.hasChanged[`work_${word}_${workL}`]){
			// 				toModify[`work_${word}_${workL}`] = this.state[`work_${word}_${workL}`]
			// 			}
			// 		})
			// 	}
			// }
			// if(Object.entries(toModify).length!==0) sta.append('Occupation.Modify',JSON.stringify(toModify))
			// if(Object.entries(toRemove).length!==0)  sta.append('Occupation.Remove',JSON.stringify(toRemove))
			// for(let workL = this.state.InitWorkNum+1;workL<=this.state.Occupation_number;workL++){
			// 	console.log('workL',workL);
			// 	(['O','P','C']).forEach(word=>{
			// 		console.log('word',word)
			// 		if(this.state.hasChanged[`work_${word}_${workL}`]){
			// 			toInsert[`work_${word}_${workL}`] = this.state[`work_${word}_${workL}`]
			// 		}
			// 	})
			// }
			// console.log('insert',toInsert)
			// if(Object.entries(toInsert).length!==0)  sta.append('Occupation.Insert',JSON.stringify(toInsert))
			console.log('sta',sta)
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};
			axios.post("/api/chVisual"
			,
			sta
			/*{
			"username.show": this.state.realname_checkbox,
			"username.data": this.state.realname,
			"nickname.data" : this.state.,
			"profile.data" : this.state.shortintro,

			education:[
				{
					SD : this.Profile_diploma_bachelor_major,
					Note : "",
				}
			],
			publicEmail : this.Profile_email,
			office : this.Profile_phone_company,
			cellphone : this.Profile_mobile,
			CC : this.Profile_address,
			Occupation:[
				"",
				""
			],
			JobID:this.state.JobID
			}*/,
			config
			).then(res => {
				alert("修改成功!");
					var hasChanged = {...this.state.hasChanged}
					Object.keys(hasChanged).forEach(element=>{
						hasChanged[element] = false;
					})
					this.setState({hasChanged});
					// window.location = "/in"
			}).catch(err =>{
				(err.response.data.description) && alert('錯誤\n'+err.response.data.description);
			})
		}
}