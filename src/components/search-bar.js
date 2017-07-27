import React, { Component } from 'react';
import './component_css/search-bar.css';
export default class SearchBar extends Component{ 
    constructor(props){
        super(props);
        this.state = {term: ''}
        this.formSubmit = this.formSubmit.bind(this);
    }   
    onInputChange(term){
        this.setState({term});
        
    }
    formSubmit(event){
        event.preventDefault();
        this.props.onNewSearch(this.state.term);
    }
    render(){    
        return (
            <form className="search__form" onSubmit={this.formSubmit}>
                <input type="text" onChange={event => this.onInputChange(event.target.value)} value={this.state.term} placeholder="Enter the title of a movie"/>
               
                    <button type="submit" className="search__button">Search</button>
               
            </form>
        );
    }
        
}