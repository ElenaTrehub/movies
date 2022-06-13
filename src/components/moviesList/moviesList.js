import React, {Component} from "react";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import './moviesList.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MoviesList = ({moviesList, loading, error, currentPage}) =>{

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
             if (item.poster_path === null) {
                 imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <Link to={`/movie/${item.id}`}>
                <li
                    className="movie__item"
                    tabIndex={0}
                    key={item.id}>

                        <div className="movie__photo">
                            <img src={'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + item.poster_path} alt={item.title} style={imgStyle}/>
                            <div className="description">
                                {item.overview.length > 0 ? item.overview.substring(0, 300) + '...' : 'Description not found.'}
                            </div>
                        </div>

                        <div className="rating">
                            <div className="rating__body">
                                <div className="rating__active" style={{width: `${item.vote_average/0.1}%`}}></div>
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
                            <div className="rating__value">{item.vote_average}</div>
                        </div>
                        <div className="movie__name">{item.title}</div>
                        <div className="movie__date">{item.release_date}</div>

                </li>
                </Link>
            )
        });

        return (
            <ul className="movie__grid">
                {items}
            </ul>
        )
    }


    let items = [];
    if(moviesList.length > 0){
        items = renderItems(moviesList[currentPage-1].results);
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="movie__list">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}
MoviesList.propTypes = {
    moviesList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    newMoviesLoading: PropTypes.bool.isRequired
}



export default MoviesList;