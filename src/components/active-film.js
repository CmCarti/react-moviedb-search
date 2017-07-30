import React, { Component } from 'react';
import './component_css/active-film.css';
export default function ActiveFilm(props){
    const film = props.activeFilm;    
    if(film == null){
        return <div></div>
    } 

    // filter the crew down to Writers/Directors/Important People
    const crew = film.credits.crew.filter((person) => {
        let ok = false;
        let crewCheck = ['Director','Writer','Screenplay','Story','Characters','Novel'].map((job) => {
            if(person.job == job) {
                return ok = true;
            }
        });
        if(ok) {
            return person;
        }
        
    });
    // Filter the doubles out of the crew that we've filtered down, then sort Director to the top, and characters/novel writer to the bottom. 
    const filteredCrew = crew.filter((person) => {
        crew.forEach((otherPerson, index) => {
            if(person.name == otherPerson.name){
                if(person.job == otherPerson.job){

                } else {
                    person.job = `${person.job}/${otherPerson.job}`;
                    crew.splice(index, 1);
                }
            }
        });
        
            return person;
        
    })
    .sort((a, b) => {
        if(a.job.includes('Director')){
            return -1;
        }
        if(b.job.includes('Director')){
            return 1;
        } if(a.job.includes('Characters') || a.job.includes('Novel')){
            return 1;
        }
         if(b.job.includes('Characters') || b.job.includes('Novel')){
             return -1;
         }
        return 0;
    });
    console.log(filteredCrew);
    const featuredCrew = filteredCrew.map((person) => {
        return (
            <div key={person.name} className="crew"> 
                <h4 className="crew-name">
                    {person.name}
                </h4>
                <span className="crew-job">
                    {person.job}
                </span>
            </div>
        );
    });
    
    // Map over the genres from the API and the genres from this movie to find matches. 
    const genres = film.genres.map((id) => {
        const returnValue = props.genreList.map((genreItem)=> {            
            if(id.id == genreItem.id){                
                return <span className="details__genre">{ genreItem.name }</span> 
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
                                    { featuredCrew }
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <img src={`https://image.tmdb.org/t/p/w320${film.poster_path}`} alt="" className="img-fluid details__poster"/>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    )
}