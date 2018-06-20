import React from 'react';
import axios from 'axios';
import ReviewList from './reviewList';
import RatingsList from './ratingsList';
import Search from './search';
import BackToAllReviews from './backToAllReviews';
import Pages from './pages';
import svg from './svg';
import styles from './styles/app.css';

export default class App extends React.Component {
  static sortedByDate(reviews) {
    return reviews.sort((a, b) => {
      const aa = a.review_date.split('/');
      const bb = b.review_date.split('/');
      return bb[0] - aa[0] || bb[1] - aa[1] || bb[2] - aa[2];
    });
  }

  static displayStarRatings(rating, key) {
    let starRating = rating;
    const stars = [];
    for (let i = 0; i < 5; i += 1) {
      if (starRating >= 1) {
        stars.push(<span key={i + key}>{svg.star}</span>);
      } else if (starRating < 1 && starRating > 0) {
        stars.push(<span key={i + key}>{svg.halfStar}</span>);
      } else {
        stars.push(<span key={i + key}>{svg.emptyStar}</span>);
      }
      starRating -= 1;
    }
    return stars;
  }

  static findAndBoldWord(text, word) {
    return (
      <span>
        { text.split(word)
          .reduce((prev, current, i) => {
            if (!i) {
              return [current];
            }
            return prev.concat(<span className={styles.searchBold} key={word + current}>{ word }</span>, current);
          }, [])
        }
      </span>);
  }

  constructor(props) {
    super(props);
    this.state = {
      roomId: window.location.pathname.split('/')[2],
      allReviewData: [],
      currentReviews: [],
      ratings: [],
      hasBeenSearched: false,
      searchText: '',
      searchedWord: '',
      currentPage: 0,
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBackToAllReviewsClick = this.handleBackToAllReviewsClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getTotalRating = this.getTotalRating.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
  }

  componentDidMount() {
    this.getReviewData(this.handleReceivedReviewData.bind(this));
  }

  getReviewData(callback) {
    axios.get(`/reviews/${this.state.roomId}`)
      .then((response) => {
        callback(response.data);
      })
      .catch(error => console.error('failed to get room data', error));
  }

  static getAverageRating(reviewRatings, subclass) {
    const sum = reviewRatings.reduce(((total, review) => total + review[subclass]), 0);
    const average = sum / reviewRatings.length;
    return Math.round(average * 2) / 2;
  }

  getTotalRating() {
    const sum = this.state.ratings.reduce(((total, rating) => total + rating), 0);
    return Math.round((2 * sum) / this.state.ratings.length) / 2;
  }

  handleReceivedReviewData(data) {
    const ratings = [
      'accuracy_rating',
      'communication_rating',
      'cleanliness_rating',
      'location_rating',
      'checkin_rating',
      'value_rating',
    ];
    App.sortedByDate(data);
    this.setState({
      allReviewData: data,
      currentReviews: data,
      ratings: ratings.map(rating => App.getAverageRating(data, rating)),
    });
  }

  handleSearchTextChange(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.filterReviews(this.state.searchText);
      this.setState({
        hasBeenSearched: true,
        searchedWord: this.state.searchText,
        currentPage: 0,
      });
    }
  }

  handleSearchClose() {
    this.setState({
      searchText: '',
    });
  }

  filterReviews() {
    const copyData = JSON.parse(JSON.stringify(this.state.allReviewData));
    const query = this.state.searchText.toLowerCase();
    const filteredReviews = copyData.filter((review) => {
      const preparedReview = JSON.parse(JSON.stringify(review));
      preparedReview.review_text = review.review_text.toLowerCase();
      preparedReview.host_text = review.host_text.toLowerCase();
      if (review.id % 10 === 0) {
        return preparedReview.host_text.includes(query);
      }
      return preparedReview.review_text.includes(query);
    }).map((review) => {
      const preparedReview = review;
      preparedReview.review_text = App.findAndBoldWord(review.review_text, query);
      preparedReview.host_text = App.findAndBoldWord(review.host_text, query);
      return review;
    });
    this.setState({
      currentReviews: filteredReviews,
    });
  }

  handleBackToAllReviewsClick() {
    this.setState({
      hasBeenSearched: false,
      currentReviews: this.state.allReviewData,
      searchText: '',
    });
  }

  handleNextClick() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  }

  handlePrevClick() {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  }

  handlePageClick(e) {
    this.setState({
      currentPage: e.target.value - 1,
    });
  }

  render() {
    const hasBeenSearched = this.state.hasBeenSearched ?
      (<BackToAllReviews
        handleBacktoAllReviewsClick={this.handleBackToAllReviewsClick}
        currentReviewsLength={this.state.currentReviews.length}
        searchedWord={this.state.searchedWord}
      />) :
      (<RatingsList
        ratings={this.state.ratings}
        displayStarRatings={App.displayStarRatings}
      />);
    return (
      <div className={styles.fullContainer}>
        <div id="top" />
        <div><Search
          handleSearchTextChange={this.handleSearchTextChange}
          handleKeyPress={this.handleKeyPress}
          totalRating={this.getTotalRating()}
          totalReviews={this.state.allReviewData.length}
          searchText={this.state.searchText}
          displayStarRatings={App.displayStarRatings}
          handleSearchClose={this.handleSearchClose}
        />
        </div>
        <div>
          {hasBeenSearched}
        </div>
        <div><ReviewList
          reviews={this.state.currentReviews.slice(7 * this.state.currentPage, (7 * this.state.currentPage) + 7)}
        />
        </div>
        <div><Pages
          handleNextClick={this.handleNextClick}
          handlePrevClick={this.handlePrevClick}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          numberOfPages={this.state.currentReviews.length / 7}
        />
        </div>
      </div>
    );
  }
}
