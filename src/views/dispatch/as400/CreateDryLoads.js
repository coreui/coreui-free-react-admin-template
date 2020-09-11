import React from 'react';
import Loads from '../../../../src/utils/loads/As400'
import './CreateDryLoads.css'
import LoadContent from './LoadContent';

const CreateDryLoads = () => {
    return (
        <div  className="container-fluid dry-load-container">
           <div className="container-fluid load-header">
                <div className="load-header-content"><h3>Whse</h3></div>
                <div className="load-header-content"><h3>Time</h3></div>
                <div className="load-header-content"><h3>Date</h3></div>
                <div className="load-header-content"><h3>Status</h3></div>
                <div className="load-header-content"><h3>Load</h3></div>
                <div className="load-header-content"><h3>Trailer</h3></div>
                <div className="load-header-content"><h3>Seal</h3></div>
            </div>
        {Loads.map(load => (
            
            <LoadContent>
            <div className="load-content-children">{load.Warehouse}</div>
            <div className="load-content-children">{load.Time} </div>
            <div className="load-content-children">{load.Date} </div>
            <div className="load-content-children">{load.Status} </div>
            <div className="load-content-children">{load.LoadNumber} </div> 
            <div className="load-content-children">{load.Seal}</div>
            <div className="load-content-children">{load.Trailer} </div>
            <div className="load-content-children">{load.Seal}</div>
                </LoadContent> 
            
        ))}
        </div>
    );
};


export default CreateDryLoads;