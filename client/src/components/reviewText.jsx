import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/reviewText.css';

const ReviewText = ({
  reviewText,
  shortText,
  shortenText,
  handleReadMoreClick,
}) => {
  if (shortenText(reviewText) && shortText) {
    return (
      <div>{shortenText(reviewText)}...
        <button className={styles.readMore} onClick={handleReadMoreClick}>Read More</button>
      </div>
    );
  }
  return (
    <div>
      {reviewText}
    </div>
  );
};

ReviewText.propTypes = {
  reviewText: PropTypes.node.isRequired,
  shortText: PropTypes.bool.isRequired,
  shortenText: PropTypes.func.isRequired,
  handleReadMoreClick: PropTypes.func.isRequired,
};

export default ReviewText;
