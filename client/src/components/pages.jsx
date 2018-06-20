import React from 'react';
import PropType from 'prop-types';
import svg from './svg';
import styles from './styles/pages.css';

class Pages extends React.Component {
  componentDidUpdate(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
    }
  }


  firstPage() {
    let onFirstPage = false;
    if (this.props.currentPage === 0) {
      onFirstPage = true;
    }
    return (
      <button
        disabled={onFirstPage}
        className={styles.pageButton}
        value={1}
        onClick={this.props.handlePageClick}
      >
        1
      </button>);
  }

  lastPage() {
    let onLastPage = false;
    if (this.props.currentPage === Math.ceil(this.props.numberOfPages) - 1) {
      onLastPage = true;
    }
    return (
      <button
        disabled={onLastPage}
        className={styles.pageButton}
        value={Math.ceil(this.props.numberOfPages)}
        onClick={this.props.handlePageClick}
      >
        {Math.ceil(this.props.numberOfPages)}
      </button>);
  }

  next() {
    if (this.props.currentPage < this.props.numberOfPages - 1) {
      return (
        <button
          className={styles.pageButton}
          onClick={this.props.handleNextClick}
        >
          {svg.next}
        </button>);
    }
    return null;
  }

  prev() {
    if (this.props.currentPage !== 0) {
      return (
        <button
          className={styles.pageButton}
          onClick={this.props.handlePrevClick}
        >
          {svg.prev}
        </button>);
    }
    return null;
  }

  loop(start, end) {
    const pages = [];
    let pageNumber = this.props.numberOfPages;
    if (this.props.numberOfPages % 1 === 0) {
      pageNumber -= 1;
    }
    const whereToEnd = end <= this.props.numberOfPages ? end : pageNumber;
    for (let i = start; i <= whereToEnd; i += 1) {
      let isDisabled = false;
      if (this.props.currentPage + 1 === i) {
        isDisabled = true;
      }
      pages.push(<button className={styles.pageButton} value={i} key={i} onClick={this.props.handlePageClick} disabled={isDisabled}>{i}</button>);
    }
    return pages;
  }

  renderEndingDots() {
    if (this.props.currentPage <= Math.ceil(this.props.numberOfPages) - 4 && this.props.numberOfPages > 5) {
      return <div className={styles.dots}>...</div>;
    }
    return null;
  }
  renderBeginningDots() {
    if (this.props.currentPage > 3 && this.props.numberOfPages >= 5) {
      return <div className={styles.dots}>...</div>;
    }
    return null;
  }

  renderPages(currentPage) {
    const pages = this.props.numberOfPages;
    if (this.props.numberOfPages < 5) {
      return this.loop(2, 4);
    } else if (currentPage < 2) {
      return this.loop(2, 3);
    } else if (currentPage === 2) {
      return this.loop(2, 4);
    } else if (currentPage === 3) {
      return this.loop(2, 5);
    } else if (currentPage > 3 && currentPage < pages - 3) {
      return this.loop(currentPage, currentPage + 2);
    } else if (currentPage < pages - 3) {
      return this.loop(currentPage, currentPage + 3);
    } else if (currentPage < pages - 2) {
      return this.loop(currentPage, currentPage + 2);
    } else if (currentPage < pages - 1 && pages > 4) {
      return this.loop(currentPage, currentPage + 1);
    } else if (pages > 4) {
      return this.loop(currentPage - 1, currentPage);
    }
    return null;
  }

  render() {
    if (Math.floor(this.props.numberOfPages)) {
      return (
        <div className={styles.pagesContainer}>
          <div className={styles.pages}>
            {this.prev()}
            {this.firstPage()}
            {this.renderBeginningDots()}
            {this.renderPages(this.props.currentPage).map(page => page)}
            {this.renderEndingDots()}
            {this.lastPage()}
            {this.next()}
          </div>
        </div>
      );
    }
    return null;
  }
}

Pages.propTypes = {
  handleNextClick: PropType.func.isRequired,
  handlePrevClick: PropType.func.isRequired,
  handlePageClick: PropType.func.isRequired,
  currentPage: PropType.number.isRequired,
  numberOfPages: PropType.number.isRequired,
};

export default Pages;
