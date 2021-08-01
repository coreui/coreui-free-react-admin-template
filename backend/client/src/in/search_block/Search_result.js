import React from 'react';
import './Search_result.css';
import Search_block from './Search_block';

const Search_result = (props) => {
    let num = props.num;
    let result_data = props.result;
    let search_list = props.search_list;
    let search_page_data = props.prevstate;
    const search_blocks = [];
    let count = 1;
    for (let user in result_data){
        search_blocks.push(<Search_block content={result_data[user]} id={"search_block_"+count} list={search_list} prevstate={search_page_data}/>)
        count++;
    }
    
    return(
        <div id="Search_result_container">
            {search_blocks}
            {/* <Search_block id={"search_block_"+1}/>
            <Search_block id={"search_block_"+2}/>
            <Search_block id={"search_block_"+3}/> */}
        </div>
    )
}

export default Search_result;