import React, { Component } from 'react';
import Column_title from './column_title';
import Column_hashtags from './column_hashtags';
import Column_article from './column_article';
import Column_annotation from './column_annotation';
import './column_content.css'

class Column_content extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:this.props.content.title,
            hashtags: this.props.content.hashtags,
            sections: this.props.content.sections,
            annotation:this.props.content.annotation,
            id: this.props.content.id,
        }
    }
    render(){
        return(
            <div id={`${this.state.id}_content`} class="column_content">
                <div id = "column_content_space">
                    <Column_title id={`${this.state.id}_title`} title={this.state.title}/>
                    <Column_hashtags id={`${this.state.id}_hashtags`} hashtags={this.state.hashtags}/>
                    <Column_article id={`${this.state.id}_article`} sections={this.state.sections}/>
                    <Column_annotation id={`${this.state.id}_annotation`} annotation={this.state.annotation}/>
                </div>
            </div>
        )
    }
}

export default Column_content