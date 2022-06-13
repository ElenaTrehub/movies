import React, {Component} from "react";
import './movieInfo.scss';
import MoviesService from "../../services/MoviesService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            loading: false,
            error: false
        }
    }

    componentDidMount() {

        this.updateMovie();
    }

    updateMovie = () => {
        const id = +this.props.match.params.id;

        if (!id) {
            return;
        }

        this.onMovieLoading();

        let movieService = new MoviesService();
        movieService
            .getMovie(id)
            .then(this.onMovieLoaded)
            .catch(this.onError);
    }

    onMovieLoaded = (movie) => {
        this.setState({
            movie,
            loading: false
        })
    }

    onMovieLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {movie, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !movie) ? <View movie={movie}/> : null;

        return (
            <div className="movie__info">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }


}
const View = ({movie}) => {
    const {homepage, adult, poster_path, title, runtime, overview, backdrop_path, budget, genres, production_companies, release_date, production_countries, vote_average} = movie;

    let imgStyle = {'objectFit' : 'cover'};
    if (backdrop_path === null) {
        imgStyle = {'objectFit' : 'contain'};
    }
    const genresStr = genres.map((genre, index) => {
        if(index !==genres.length -1){
            return <span key={index}>{genre.name},&nbsp;&nbsp;</span>
        }
        else{
            return <span key={index}>{genre.name}</span>
        }

    })

    const companiesStr = production_companies.map((comp, index) => {
        if(index !==genres.length -1){
            return <span key={index}>{comp.name},&nbsp;&nbsp;</span>
        }
        else{
            return <span key={index}>{comp.name}</span>
        }

    })
    const countriesStr = production_countries.map((comp, index) => {
        if(index !==genres.length -1){
            return <span key={index}>{comp.name},&nbsp;&nbsp;</span>
        }
        else{
            return <span key={index}>{comp.name}</span>
        }

    })
    return (
        <>
            <Link to={`/`}><span className="link">&larr; To the list of films</span></Link>
            <div className="movie__basics">
                <img className="main-img" src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + poster_path} alt={name} style={imgStyle}/>
                <div>
                    <div className="main-info">
                        <div className="small-screen">
                            <img src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + poster_path} alt={name} style={imgStyle}/>
                        </div>
                        <div className="small-screen__info">
                            <div className="movie__info-name">{title}<span>&nbsp;&nbsp;&nbsp;&nbsp;{release_date.split('-')[0]}</span></div>
                            <div className="rating">
                                <div className="rating__body">
                                    <div className="rating__active" style={{width: `${vote_average/0.1}%`}}></div>
                                    <div className="rating__items">
                                        <input type="radio" className="rating__item" name="rating" value="1"/>
                                        <input type="radio" className="rating__item" name="rating" value="2"/>
                                        <input type="radio" className="rating__item" name="rating" value="3"/>
                                        <input type="radio" className="rating__item" name="rating" value="4"/>
                                        <input type="radio" className="rating__item" name="rating" value="5"/>
                                        <input type="radio" className="rating__item" name="rating" value="6"/>
                                        <input type="radio" className="rating__item" name="rating" value="7"/>
                                        <input type="radio" className="rating__item" name="rating" value="8"/>
                                        <input type="radio" className="rating__item" name="rating" value="9"/>
                                        <input type="radio" className="rating__item" name="rating" value="10"/>
                                    </div>
                                </div>
                                <div className="rating__value">{vote_average}</div>
                            </div>
                            <div className="movie__short">
                                {genresStr}
                            </div>
                            <button
                                className="button button__main button__left">
                                <div className="inner"><a target="_blank" href={homepage}>&#9658;&nbsp;&nbsp;&nbsp; Play Trailer</a></div>
                            </button>
                        </div>
                    </div>


                    <div className="movie__descr">
                        <h3>Description</h3>
                        {overview}
                    </div>
                    <div className="movie__characteristics">
                        <h4>General characteristics</h4>

                        <ul>
                            <li>
                                <span className="movie__Characteristics-title">Age group</span>
                                <span className="movie__Characteristics-value">{adult ? 'For the whole family' : '18+'}</span>
                            </li>
                            <li>
                                <span className="movie__Characteristics-title">Duration</span>
                                <span className="movie__Characteristics-value">{runtime} min</span>
                            </li>
                            <li>
                                <span className="movie__Characteristics-title">Budget</span>
                                <span className="movie__Characteristics-value">{budget} $</span>
                            </li>
                            <li>
                                <span className="movie__Characteristics-title">Production companies</span>
                                <span className="movie__Characteristics-value">{companiesStr}</span>
                            </li>
                            <li>
                                <span className="movie__Characteristics-title">Production countries</span>
                                <span className="movie__Characteristics-value">{countriesStr}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


        </>
    )
}

MovieInfo.propTypes = {
    id: PropTypes.number
}

export default MovieInfo;