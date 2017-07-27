import React, { Component } from 'react';
import './component_css/results.css';

export default function Results(props){

    if(props.results == null){
        return( 
            <div></div>
        );
    }
    
    const titleString = (props.popular) ? 'Popular Movies:' : 'Search Results:';
    // Check if there is only a single result, if there is, it will handleResultClick and render the correct movie to the view
    if(props.results.length == 1){
        props.handleResultClick(props.results[0].id);
    }

    // This used to be a map, but apparently you can't break a map when you find the first result, so it's a gross forloop. 
    // It loops through the results and tries to find the first exact match to bypass the search results screen. Not 100% sure if I want to keep it, sequels that aren't numbered could be hard to track down. 
    /*for(let i = 0; i < props.results.length; i++){
        let title = props.results[i].title.toLowerCase();
        let term = props.searchTerm.toLowerCase();
        if(term == title){
           props.handleResultClick(props.results[i].id);           
           break;
        }
    }*/
        
    
   
    const results = props.results.map((item) => {
        console.log(item);
        
        // Generate the colors for user score, possible to break this into the App.js and pass it in as a prop. 
        const getColor = (score) => {
            if(score < 5.5){
                return {color: '#DF2935'}
            } else if(score < 7.5){
                return {color: '#EAC435'}
            } else {
                return {color: '#00D373'}
            }
        }


        // Check to see if the poster exists, if not, replace it with a placeholder.
        let poster_path = 'http://placehold.it/320x480';
        if(item.poster_path != null) {
            poster_path = `https://image.tmdb.org/t/p/w320${item.poster_path}`;
        }
        return(<li key={item.id} className="results__card" >
            
            <div className="results__info">
                <h3 className="results__title" onClick={(e) => props.handleResultClick(item.id)}>{item.title} <span className="results__year">{ item.release_date.substring(0,4) }</span></h3>
                <h4>
                    <span className="results__at-a-glance user-rating">User Rating: <span style={getColor(item.vote_average)}> 
                             {item.vote_average}
                        </span>
                    </span> 
                    
                </h4>
                <p className="results__summary">{ item.overview }</p>
               
            </div>
            <div className="results__poster">                
                <img src={ poster_path } alt="" className="img-fluid hidden-xs-down" onClick={(e) => props.handleResultClick(item.id)}/>
            </div>
            <div className="results__see-more">
             <span className="" onClick={(e) => props.handleResultClick(item.id)}>
                    See More >
                </span>
            </div>
        </li>)
    })
    
    return(
        <div className="results__container">
            <div className="container">
                <h2>{ titleString }</h2>
                <ul>
                    { results }
                </ul>
            </div>
        </div>
    )
}
