import React from 'react';

export default function FeaturedCrew(props) {
    const film = props.film;
    // filter the crew down to Writers/Directors/Important People
    const crew = film.credits.crew.filter((person) => {
        let ok = false;
        ['Director','Writer','Screenplay','Story','Characters','Novel'].map((job) => {
            if(person.job === job) {
                return ok = true;
            } else 
            return false;
        });
        if(ok) {
            return person;
        }
        return null;
        
    });
    // Filter the doubles out of the crew that we've filtered down, then sort Director to the top, and characters/novel writer to the bottom. 
    const filteredCrew = crew.filter((person) => {
        crew.forEach((otherPerson, index) => {
            if(person.name === otherPerson.name){
                if(person.job === otherPerson.job){

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
    // Create the featured Crew Section, 
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
    
    return(
        <div className="featured-crew">
            {featuredCrew}
        </div>      
    );
}