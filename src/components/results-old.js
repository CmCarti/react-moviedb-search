import React, { Component } from 'react';

export default function Results(props){
    const film = props.currentFilm;
    
    if(film == null){
        return <div></div>
    } 

    // Map over the genres from the API and the genres from this movie to find matches. 
    const genres = film.genre_ids.map((id) => {
        const returnValue = props.genreList.map((genreItem)=> {            
            if(id == genreItem.id){                
                return <span className="details__genre">{ genreItem.name } </span>
            }
        })
        return returnValue;
    });
    
    return(
        <div className="details" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2/${film.backdrop_path}`}}>
            <div className="overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <img src={`https://image.tmdb.org/t/p/w320${film.poster_path}`} alt="" className="img-fluid details__poster"/>
                        </div>
                        <div className="col-sm-8">
                            <h1 className="details__title">{film.title} 
                                <span className="details__year">{film.release_date.substring(0,4)}</span></h1>
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3 className="details__at-a-glance">User Score: {film.vote_average}</h3>
                                </div>
                                <div className="col-sm-6">
                                    <h3 className="details__at-a-glance">Genres: {genres}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
            
            
            <br/>
            
        </div>
    )
}