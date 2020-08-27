import React from 'react';
import Loads from '../../../utils/loads/loads'
import './CreateDryLoads.css'
import LoadContent from './LoadContent';

const CreateDryLoads = () => {
    return (
        <div  className="container">
        {Loads.map(load => (
            
            <LoadContent>
            {load.Warehouse}{load.Time} {load.Date} {load.status} {load.load}  {load.Trailer} {load.Seal}
                </LoadContent> 
            
        ))}
        </div>
    );
};


export default CreateDryLoads;