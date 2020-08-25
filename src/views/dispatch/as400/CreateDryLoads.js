import React from 'react';
import Loads from '../../../utils/loads/loads'

const CreateDryLoads = () => {
    return (
        <div  className="load-container">
        {Loads.map(load => (
            <div className="load-content">
                {load.Warehouse}
            </div>
        ))}
        </div>
    );
};


export default CreateDryLoads;