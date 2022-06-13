import React, {Component} from 'react';
import MoviesList from "../moviesList";
import Search from "../search";
import MoviesService from "../../services/MoviesService";
import Pagination from "../pagination";
import ErrorBoundary from "../errorBoundary";

class MainPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            moviesList: [],
            loading: true,
            error: false,
            newMoviesLoading: false,
            searchMoviesLoaded: false,
            offset: 10,
            moviesEnded: false,
            currentPage: 1,
            term: ''
        }


    }

    componentDidMount() {
        this.onRequest();
    }


    onRequest = (offset) => {

        let movieService = new MoviesService();
        this.onMoviesListLoading();
        movieService.getAllMovies(offset)
            .then((res) => {this.onMoviesListLoaded(res)})
            .catch(this.onError)
    }

    onMoviesListLoading = () => {
        this.setState({
            newMoviesLoading: true
        })
    }

    onMoviesListLoaded = (newMoviesList) => {
        let ended = false;
        if (newMoviesList.length < 5) {
            ended = true;
        }

        this.setState(({moviesList, offset}) => ({
            moviesList: [...moviesList, ...newMoviesList],
            loading: false,
            newMoviesLoading: false,
            searchMoviesLoaded: false,
            offset: offset + 10,
            moviesEnded: ended
        }))
    }

    onMoviesSearchListLoaded = (newMoviesList) => {

        this.setState(() => ({
            moviesList: [newMoviesList],
            loading: false,
            newMoviesLoading: false,
            searchMoviesLoaded: true,
            offset: 10,
            moviesEnded: false
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onPageChange = (currentPage) => {
        this.setState({currentPage});
    }

    onUpdateSearch = (term) => {
        if(term.length < 1){
            this.setState(() => ({
                moviesList: []
            }));
            const wrapper = document.querySelector('.search__wrapper');
            const input = document.querySelector('.search-input');

            wrapper.classList.remove("active");
            input.classList.remove("active");
            this.onRequest();
        }
        else{
            let movieService = new MoviesService();
            this.onMoviesListLoading();
            movieService.getSearchMovie(term)
                .then((res) => {this.onMoviesSearchListLoaded(res)})
                .catch(this.onError)
        }

    }

    render() {
        const {moviesList, loading, error, currentPage, newMoviesLoading, offset, moviesEnded, searchMoviesLoaded} = this.state;

        return  (
            <>
                <ErrorBoundary>
                    <Search onUpdateSearch={this.onUpdateSearch} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <MoviesList moviesList = {moviesList} loading = {loading} error = {error} currentPage = {currentPage} newMoviesLoading = {newMoviesLoading} term = {this.state.term}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <Pagination totalPage={moviesList.length} onPageChange = {this.onPageChange}/>
                </ErrorBoundary>
                <button
                    className="button button__main button__long"
                    disabled={newMoviesLoading}
                    style={{'display': moviesEnded || searchMoviesLoaded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </>
        )
    }
}

export default MainPage;