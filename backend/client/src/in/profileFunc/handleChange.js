export function handleImageChange(e){
	//e.preventDefault();
	let reader = new FileReader();
	if(e.target.files.length===0) return;
	let file = e.target.files[0];
	this.setState({
		userimage:file
	})

	reader.onloadend = () =>{
		console.log("onloadend");
		this.setState({
			imagePreviewUrl:reader.result
		});
	}
	try {
		reader.readAsDataURL(file)
	} catch (error) {
		
	}
	// var hasChanged = {...this.state.hasChanged}
	// hasChanged.userimage = true;
	this.setState(state=>({hasChanged:{...state.hasChanged,userimage:true}}))
}

export function handleCheckChange(event){
	const target = event.target;
	const name = target.name;

	this.setState(state=>({
		[name]:!state[name],
		hasChanged:{...state.hasChanged,[name]:true}
	}))
	// const hasChanged = {...this.state.hasChanged}
	// hasChanged[name] = true;
	// this.setState({hasChanged})
}
	
export function handleInputChange(event) {
	const target = event.target;
	const value = target.value;
	const name = target.name;
	console.log(name);
	console.log(value);

	this.setState(state=>({
		[name]:value,
		hasChanged:{...state.hasChanged,[name]:true}
	}));
	// const hasChanged = {...this.state.hasChanged}
	// hasChanged[name] = true;
	// this.setState({hasChanged})
}