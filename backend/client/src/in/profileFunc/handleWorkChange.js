// import work from "../profileComp/work";

export default function(id,OPC) {
    return (e)=>{
        const target = e.target
        this.setState(state => {
        const workList = state.work
        const item = workList[id]
        item[OPC] = target.value
        workList[id] = item

        const {hasChanged} = state;
        hasChanged.work = true;
        // console.log(todoList)
        return {work:workList,hasChanged}
        })
    }
};