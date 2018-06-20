import React from 'react';
import PropTypes from 'prop-types';
import svg from './svg';
import styles from './styles/reportThankyou.css';

const ReportThankyou = ({
  handleClose,
  setWrapperRef,
}) => (
  <div className={styles.tyContainer}>
    <div className={styles.tyContainerBackground}>
      <div className={styles.tyPadding}>
        <div ref={setWrapperRef} className={styles.reportTy}>
          <div className={styles.tyInnerPadding}>
            <button className={styles.thankyouClose} onClick={handleClose}>
              {svg.close}
            </button>
            <div className={styles.thankyou}>
              Thank You
            </div>
            <div className={styles.thankyouText}>
              These reports help make Airbnb better for everyone, so we take them seriously. We'll reach out if we have any questions about your report.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ReportThankyou.propTypes = {
  handleClose: PropTypes.func.isRequired,
  setWrapperRef: PropTypes.func.isRequired,
};

export default ReportThankyou;
