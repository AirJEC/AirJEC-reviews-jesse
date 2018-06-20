import PropTypes from 'prop-types';
import React from 'react';
import Review from './review';

const ReviewList = ({ reviews }) => (
  <div>
    {reviews.map(review =>
      (<Review
        review={review}
        key={review.id}
      />))}
  </div>
);

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReviewList;
