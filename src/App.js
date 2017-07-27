import React, { Component } from 'react';
import logo from './logo.png';
import axios from 'axios';
import './App.css';


import SearchBar from './components/search-bar';
import Results from './components/results';
import ActiveFilm from './components/active-film';

// DO NOT FORGET TO MOVE THIS KEY AND THE API CALLS TO AN EXPRESS SERVER
const API_KEY = '';

class App extends Component {
 
  constructor(props){
    super(props);
    
    this.state = {
      popular: false,
      searchTerm: null,
      filmId: null,
      activeFilm: null,
      genreList: null,
      results: null,
    }
    this.onNewSearch = this.onNewSearch.bind(this);
    this.getGenres = this.getGenres.bind(this);
    this.onResultClick = this.onResultClick.bind(this);
    this.getPopular = this.getPopular.bind(this);
    this.getGenres();
    this.getPopular();
  
  }

  
  getGenres(){
    // Grab the list of genres from the Movie DB. This should probably be in the results component, but I've lifted it into the app state for testing purposes. 
    var self = this;
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
                .then(function(response){                  
                  self.setState({genreList: response.data.genres});                
                }).catch(function(error){
                  console.log(error);
                });
  }
  onNewSearch(term){
    // Run the search. This function should be moved to a backend server to keep the API key private. 
    var self = this;    
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="${term}"&append_to_response=cast`)
      .then(function(response){
        self.setState({
          results: response.data.results,
          activeFilm: null,
          popular: false,
      });
        console.log(response.data.results);
      }).catch(function(error){
        console.log(error);
      });
    this.setState({searchTerm: term});
    
  }
  getPopular(){
    var self = this;
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(function(response){
        console.log(response);
        self.setState({
          results: response.data.results,
          activeFilm: null,
          popular: true
        });
      }).catch(function(error){
        console.log(error)
      });
  }
  onResultClick(id){
    var self = this;    
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`)
      .then(function(response){
        self.setState({activeFilm: response.data, 
                        results: null});
        console.log(response.data);
      }).catch(function(error){
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="powered">Powered by </h1><img src={logo} className="movie-db-logo"/>
                <SearchBar  onNewSearch={ this.onNewSearch }/>
              </div>
              {/* end col-sm-12 */}
            </div> 
            {/* end row */}         
          </div>
          {/* end container */}
        </header>
        <main>
          <Results 
            results={this.state.results} 
            genreList={ this.state.genreList }
            handleResultClick={this.onResultClick} 
            searchTerm={this.state.searchTerm}
            popular={this.state.popular}
          />
          <ActiveFilm activeFilm={ this.state.activeFilm } genreList={ this.state.genreList } />
        </main>
      </div>
    );
  }
}

export default App;
