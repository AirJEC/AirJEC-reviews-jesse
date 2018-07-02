import React from 'react';
import PropTypes from 'prop-types';
import ReviewText from './reviewText';
import Report from './report';
import HostResponse from './hostResponse';
import ReportThankyou from './reportThankyou';
import svg from './svg';
import styles from './styles/review.css';

class Review extends React.Component {
  static shortenText(reviewText) {
    if (typeof reviewText !== 'string') {
      const strings = [];
      let counter = 0;
      let isTooLong = false;
      reviewText.props.children.forEach((text) => {
        if (typeof text === 'string') {
          let tempString = '';
          for (let i = 0; i < text.length; i += 1) {
            tempString += text[i];
            counter += 1;
            if (counter > 280) {
              strings.push(tempString);
              isTooLong = true;
              return;
            }
          }
          strings.push(tempString);
        } else if (!isTooLong) {
          strings.push(text);
        }
      });
      if (isTooLong) {
        return strings;
      }
      return false;
    }
    if (reviewText.length > 280) {
      return reviewText.substring(0, 280);
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      showReport: false,
      showThankyou: false,
      buttonDisabled: true,
      shortText: true,
      labelValue: '',
    };
    this.handleFlagClick = this.handleFlagClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleReadMoreClick = this.handleReadMoreClick.bind(this);
  }
  componentWillMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleSubmitClick() {
    this.setState({
      showThankyou: true,
      showReport: false,
    });
    document.body.style.overflow = 'hidden';
  }

  handleClose() {
    this.setState({
      showThankyou: false,
      showReport: false,
      buttonDisabled: true,
      labelValue: '',
    });
    document.body.style.overflow = 'auto';
  }

  handleFlagClick() {
    this.setState({
      showReport: true,
    });
    document.body.style.overflow = 'hidden';
  }

  handleOutsideClick(e) {
    if (this.wrapperRef && this.wrapperRef.contains(e.target)) {
      document.body.style.overflow = 'hidden';
      return;
    }
    this.handleClose();
  }

  handleLabelClick(e) {
    this.setState({
      buttonDisabled: false,
      labelValue: e.target.value,
    });
    document.body.style.overflow = 'hidden';
  }

  handleReadMoreClick() {
    this.setState({
      shortText: false,
    });
  }

  render() {
    const {
      review,
    } = this.props;

    const month = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
    const dateObj = new Date(review.review_date);
    const dateMonth = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
    const date = [dateObj.getDate(), dateMonth];

    const formatedDate = `${month[date[1]]} ${date[0]}`;

    const hostResponse = review.id % 10 === 0 ?
      (<HostResponse
        date={formatedDate}
        hostResponse={review}
        shortenText={Review.shortenText}
        shortText={this.state.shortText}
        handleReadMoreClick={this.handleReadMoreClick}
      />) :
      null;

    const superUser = review.id % 5 === 0 ?
      svg.superUser :
      null;

    const showReport = this.state.showReport ?
      (<Report
        buttonState={this.state.buttonDisabled}
        handleLabelClick={this.handleLabelClick}
        setWrapperRef={this.setWrapperRef}
        handleClose={this.handleClose}
        handleSubmitClick={this.handleSubmitClick}
        labelValue={this.state.labelValue}
      />) :
      null;

    const showThankyouPopup = this.state.showThankyou ?
      (<ReportThankyou
        setWrapperRef={this.setWrapperRef}
        handleClose={this.handleClose}
      />) :
      null;

    return (
      <div className={styles.review}>
        <div className={styles.photoAndSuperUser}>
          <img className={styles.guestPhoto} src={review.guest_photo} alt="" />
          <div className={styles.superUser}>
            {superUser}
          </div>
        </div>
        <button onClick={this.handleFlagClick} className={styles.report}>
          {svg.flag}
        </button>
        <div>
          {showReport}
        </div>
        <div>
          {showThankyouPopup}
        </div>
        <div className={styles.reviewHeader}>
          <div className={styles.guestName}>
            {review.guest_name}
          </div>
          <div className={styles.date}>
            {formatedDate}
          </div>
        </div>
        <div className={styles.reviewText}>
          <ReviewText
            reviewText={review.review_text}
            shortenText={Review.shortenText}
            shortText={this.state.shortText}
            handleReadMoreClick={this.handleReadMoreClick}
          />
        </div>
        <div className={styles.hostResponse}>
          {hostResponse}
        </div>
        <div className={styles.bottomSpace}>
          <div className={styles.bottomBorder} />
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  review: PropTypes.objectOf(PropTypes.node).isRequired,
};

export default Review;
