import { Component } from 'react';
import './search.scss';
import PropTypes from "prop-types";
import Pagination from "../pagination";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.count = 0;
    }


    onChangeSearch = (e) => {
        const term = e.target.value;
        this.setState({term});

        let a = ++this.count;

        const timeOut = setTimeout(() => {
            if(a == this.count){
                this.props.onUpdateSearch(term);

                clearTimeout(timeOut);
            }

        }, 800);
    }

    InputShow = () => {
        const wrapper = document.querySelector('.search__wrapper');
        const input = document.querySelector('.search-input');

        wrapper.classList.add("active");
        input.classList.add("active");
        input.focus();
    }

    render() {
        return (
            <div className="search">
                <i className="fas fa-search"
                   aria-hidden="true" onClick={this.InputShow}></i>
                <div className="search__wrapper">
                    <input type="text"
                           className="form-control search-input"
                           placeholder="Film title..."
                           value={this.state.term}
                           onChange={this.onChangeSearch}/>
                </div>
            </div>


        )
    }
}
Search.propTypes = {
    onUpdateSearch: PropTypes.func.isRequired
}

export default Search;