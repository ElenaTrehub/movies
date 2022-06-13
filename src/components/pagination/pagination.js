import React, {Component, Fragment} from "react";
import './style.scss';
import PropTypes from "prop-types";

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while(i <= to){
        range.push(i);
        i+=step;
    }

    return range;
}


class Pagination extends Component{

    constructor(props) {
        super(props);
        this.pageWhichShow = 1;

        this.state = {
            currentPage: 5
        }
    }

    // componentDidMount() {
    //     this.gotoPage(1);
    // }

    gotoPage = (page) => {
        const currentPage = Math.max(0, Math.min(page, this.props.totalPage));
        this.setState({currentPage});
        this.props.onPageChange(currentPage);

    }

    handleClick = (e, page) => {
        e.preventDefault();
        this.gotoPage(page);
    }
    handleMoveLeft = (e) => {
        e.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pageWhichShow * 2) -1);
    }
    handleMoveRight = (e) => {
        e.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pageWhichShow * 2) +1);
    }
    fetchPageNumbers = () => {
        const totalPage = this.props.totalPage;

        const currentPage = this.state.currentPage;


        const totalNumbers = this.pageWhichShow*2 + 3;
        const totalBlock= totalNumbers + 2;

        if(totalPage > totalBlock){

            const startPage = Math.max(2, currentPage - this.pageWhichShow);

            const endPage = Math.min(totalPage - 1, currentPage + this.pageWhichShow);
            let pages = range(startPage, endPage);

            const hasLeftSplit = startPage > 2;
            const hasRightSplit = (totalPage - endPage) > 1;
            const splitOffset = totalNumbers - (totalPage + 1);

            switch(true){
                case (hasLeftSplit && !hasRightSplit):{
                    const extraPages = range(startPage - splitOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }
                case(!hasLeftSplit && hasRightSplit):{
                    const extraPages = range(endPage +1, endPage + splitOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
                case(hasLeftSplit && hasRightSplit):{
                    pages = [LEFT_PAGE, ...pages,  RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPage];
        }

        return range(1, totalPage);


    }

    render() {
        if(this.props.totalPage === 1){
            return null;
        }

        const pages = this.fetchPageNumbers();

        return (
            <Fragment>
                <nav aria-label='Movies Pagination'>
                    <ul className="pagination">
                        {pages.map((page, index) => {
                            if(page === 'LEFT'){
                                return (
                                    <li key={index} className="page-item">
                                        <a href="#" className="page-link" aria-label="Previous" onClick={this.handleMoveLeft}>
                                            <span aria-hidden="true">&#171;</span>

                                        </a>
                                    </li>
                                )
                            }
                            if(page === 'RIGHT'){
                                return (
                                    <li key={index} className="page-item">
                                        <a href="#" className="page-link" aria-label="Next" onClick={this.handleMoveRight}>
                                            <span aria-hidden="true">&raquo;</span>

                                        </a>
                                    </li>
                                )
                            }
                            if(page !== 'RIGHT_PAGE' && page !== 'LEFT_PAGE'){
                                return(
                                    <li key={index} className={`page-item${this.state.currentPage === page ? ' active' : ''}`}>
                                        <a href="#" className="page-link" onClick={(e) => this.handleClick(e,page)}>{page}</a>
                                    </li>
                                )
                            }

                        })}
                    </ul>
                </nav>
            </Fragment>
        )


    }
}
Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    totalPage: PropTypes.number.isRequired
}
export default Pagination;