import React, { component } from 'react';
import Drivers from '../../utils/drivers/driverlist'
import './createdriver.css'

let driver = [...Drivers]

class CreateDriver extends Component {
    constructor(){
        super();
        this.state = driver;
    }
    render() {
        return <h1>Hello Driver!</h1>
    }
}
export default CreateDriver