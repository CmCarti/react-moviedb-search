import React from 'react';
import './component_css/active-film.css';

import FeaturedCrew from './featured-crew';

export default function ActiveFilm(props){
    const film = props.activeFilm;    
    if(film == null){
        return <div></div>
    } 

    
    
    // Map over the genres from the API and the genres from this movie to find matches. 
    const genres = film.genres.map((id) => {
        const returnValue = props.genreList.map((genreItem)=> {            
            if(id.id === genreItem.id){                
                return <span className="details__genre">{ genreItem.name }</span> 
            } else {
                return false;
            }
        })
        return returnValue;
    });
    
    return(
        <div className="details" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1400_and_h450_bestv2/${film.backdrop_path}`}}>
            <div className="overlay">
                <div className="container">
                    <div className="row">                        
                        <div className="col-sm-8">
                            <h1 className="details__title">{film.title} <span className="details__year results__year">({film.release_date.substring(0,4)})</span></h1>
                            <h2 className="details__tagline"><em>"{film.tagline}"</em></h2>
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3 className="details__at-a-glance">User Score: {film.vote_average}</h3>
                                </div>
                                <div className="col-sm-6">
                                    <h3 className="details__at-a-glance">Genres: {genres}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="details__overview details__at-a-glance">Overview:</h3>
                                    <p>{film.overview}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="details__crew details__at-a-glance">
                                        Featured Crew:
                                    </h3>
                                    <FeaturedCrew film={film} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <img src={`https://image.tmdb.org/t/p/w320${film.poster_path}`} alt="Movie Poster" className="img-fluid details__poster"/>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    )
}