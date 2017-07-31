import React from 'react';

export default function MainDetails(props) {
    const film = props.film;
    const cast = film.credits.cast.slice(0, 5).map((actor) => {
        return (
            <div className="cast__member" key={ actor.name }>
                <img src={`https://image.tmdb.org/t/p/w138_and_h175_bestv2/${actor.profile_path}`} alt={actor.name}/>
                <h4 className="cast__name">{ actor.name }</h4>
                <span className="cast__character">{ actor.character }</span>
            </div>
        );
    });
    

    return (
        <div className="main-details container">
            <div className="row">
                <div className="col-sm-8">
                    { cast }
                </div>
            </div>
        </div>
    );
}