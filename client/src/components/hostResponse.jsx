import React from 'react';
import PropTypes from 'prop-types';
import ReviewText from './reviewText';
import styles from './styles/hostResponse.css';
import svg from './svg';

const HostResponse = ({
  date,
  hostResponse,
  shortenText,
  shortText,
  handleReadMoreClick,
}) => {
  const superUser = hostResponse.id % 5 === 0 ? svg.superUser : null;
  return (
    <div className={styles.container}>
      <img className={styles.hostPhoto} src={hostResponse.host_photo} alt="" />
      <div className={styles.superUser}>
        {superUser}
      </div>
      <div className={styles.reviewHeader}>
        <div className={styles.hostName}>
          Response from {hostResponse.host_name}:
        </div>
      </div>
      <div className={styles.hostTextAndDate}>
        <div className={styles.reviewText}>
          <ReviewText
            reviewText={hostResponse.host_text}
            shortenText={shortenText}
            shortText={shortText}
            handleReadMoreClick={handleReadMoreClick}
          />
        </div>
        <div className={styles.hostDate}>
          {date}
        </div>
      </div>
    </div>
  );
};

HostResponse.propTypes = {
  hostResponse: PropTypes.objectOf(PropTypes.node).isRequired,
  date: PropTypes.string.isRequired,
  shortText: PropTypes.bool.isRequired,
  shortenText: PropTypes.func.isRequired,
  handleReadMoreClick: PropTypes.func.isRequired,
};

export default HostResponse;
