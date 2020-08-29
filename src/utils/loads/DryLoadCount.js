import Loads from '../loads/loads'

const DryLoadCount = Loads.map(load => {
    load.filter(load()=> load==222)
    
})


export default DryLoadCount