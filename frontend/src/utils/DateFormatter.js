import React from 'react'
import Moment from 'react-moment';
const DateFormatter = ({date}) => {
  return (
    <div><Moment format='D MMM YYYY' withTitle>
        {date}
        </Moment></div>
  )
}

export default DateFormatter