import React from 'react';

export default function MainDetails(props) {
    const film = props.film;
    const cast = film.credits.cast.slice(0, 10);
    console.log(cast);

    return (
        <div className="main-details">
            
        </div>
    );
}