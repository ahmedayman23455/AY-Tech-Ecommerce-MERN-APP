import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
/* ------------------------------------------------------ */

const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';
  if (timestamp) {
    // convert Iso format('2014-02-11T11:30:30) to date ( Fri Apr 11 2014 00:00:00)
    const date = parseISO(timestamp);
    //Return the distance between the given date and now in words.
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return <p>{timeAgo}</p>;
};

TimeAgo.propTypes = {
  timestamp: PropTypes.string,
  // style: PropTypes.object,
  // className: PropTypes.string,
};
export default TimeAgo;
