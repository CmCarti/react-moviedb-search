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
    
    // Translate the release date into Month DD, YYYY
    const getReleaseDate = (date) => {
        const year = date.slice(0,4);
        if(date.length > 4){
            
            const day = date.slice(8, 10);
            const monthNumeric = parseInt(date.slice(5, 7));
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return (
                <span className="fact">{ `${months[monthNumeric]} ${day}, ${year}` }</span>
            )
        } else {
            return  <span className="fact">{ year }</span> 
        }

    }
    const releaseDate = getReleaseDate(film.release_date);

    // Grab the MPAA Rating that is hidden within a convuluted object
    const getRating = (object) => {
        let rating = '';
        object.forEach((item) => {
            if(item.iso_3166_1 === 'US'){
                rating = item.release_dates[0].certification;
            }
        });
        return rating;
    }
    const rating = getRating(film.release_dates.results);
    
    // Grab the studios involved in production
    const studios = film.production_companies.map((company) => {
        return(
            <span key={company.id} className="fact prod__company">
                {company.name}
            </span>
        )
    });

    let trailer = <div></div>;
    if(film.videos.results.length > 0){

        trailer = <iframe src={`https://www.youtube.com/embed/${film.videos.results[0].key}`} className="trailer embed-responsive-item"></iframe>;
    }

    return (
        <div className="main-details container">
            <div className="row">
                <div className="col-sm-8">
                    <h3>Featured Cast</h3>
                    <div className="featured-cast">
                    { cast }
                    </div>
                    <h3>Trailer</h3>
                    <div className="trailer__container embed-responsive-16by9 embed-responsive">
                       {trailer}
                    </div>
                </div>
                <div className="col-sm-4">
                    <h4>Facts</h4>
                    <h5>Status</h5>
                    <span className="fact">
                        {film.status}
                    </span>
                    <h5>Release Date</h5>
                    <span className="fact">
                        {releaseDate}
                    </span>
                    <h5>MPAA Rating</h5>
                    <span className="fact">
                        { rating }
                    </span>
                    <h5>Studio(s)</h5>
                        { studios }
                    <h5>Runtime</h5>
                        { film.runtime + ' Minutes'}
                    <h5>Budget</h5>
                        { `$${film.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` }
                    <h5>Revenue</h5>
                        { `$${film.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` }
                    <h5>Homepage</h5>
                        <a href={film.homepage}>
                            {film.homepage}
                        </a>
                    
                </div>
            </div>
        </div>
    );
}