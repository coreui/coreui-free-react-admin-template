import React, { Component } from 'react'
import Stores from '../utilities/storelist.js'


 const store = function(){
    return Stores.map((store) => <div>{store}</div>) 
}
export default store