import React from 'react';
import PropTypes from 'prop-types';
import svg from './svg';
import styles from './styles/search.css';

const Search = ({
  handleSearchTextChange,
  handleKeyPress,
  totalRating,
  totalReviews,
  searchText,
  displayStarRatings,
  handleSearchClose,
}) => {
  const showClose = searchText !== '' ?
    svg.searchClose :
    null;

  return (
    <div className={styles.searchAndTotalContainer}>
      <div className={styles.totalReviews}>
        <div className={styles.totalReviewsWords}>
          {totalReviews} Reviews
          <div className={styles.star}>
            {displayStarRatings(totalRating, 6).map(star => star)}
          </div>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchContainer1}>
          <div className={styles.searchContainer2}>
            <input
              className={styles.searchInput}
              type="text"
              value={searchText}
              placeholder="Search reviews"
              onChange={handleSearchTextChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className={styles.close} onClick={handleSearchClose} role="button">
            {showClose}
          </div>
          {svg.search}
        </div>
      </div>
      <div className={styles.borders}>
        <div className={styles.innerBorder} />
      </div>
    </div>
  );
};

Search.propTypes = {
  handleSearchTextChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  totalRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
  displayStarRatings: PropTypes.func.isRequired,
  handleSearchClose: PropTypes.func.isRequired,
};

export default Search;
