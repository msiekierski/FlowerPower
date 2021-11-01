import { Collapse, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { OpeningHours } from '../../common/types';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import dayOfWeekAsString from '../../utils/functions/dayOfWeekAsString';

type Props = {
  openingHours: Array<OpeningHours | null>;
};

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: '10px',
    cursor: 'pointer',
  },
  today: {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
}));

const OpeningStatus: React.FC<Props> = ({ openingHours }) => {
  const currentDate = new Date();
  const currentHour =
    currentDate.getHours() < 9
      ? '0' + currentDate.getHours().toString()
      : currentDate.getHours().toString();
  const currentMinutes =
    currentDate.getMinutes() < 9
      ? '0' + currentDate.getMinutes().toString()
      : currentDate.getMinutes().toString();
  const currentDay = currentDate.getDay();
  const totalDate = currentHour + ':' + currentMinutes;

  const isOpen =
    openingHours[currentDay] !== null &&
    totalDate > openingHours[currentDay]!.from &&
    totalDate < openingHours[currentDay]!.to;

  const [showOpeningHours, setShowOpeningHours] = useState(false);
  const classes = useStyles();

  if (isOpen) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ color: 'green', fontWeight: 'bold' }}>
            Open&nbsp;
          </Typography>
          <Typography>| Closes at {openingHours[currentDay]!.to}</Typography>
          {showOpeningHours ? (
            <AiFillCaretUp
              className={classes.icon}
              onClick={() => setShowOpeningHours(false)}
            />
          ) : (
            <AiFillCaretDown
              className={classes.icon}
              onClick={() => setShowOpeningHours(true)}
            />
          )}
        </div>
        <Collapse in={showOpeningHours}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div style={{ display: 'flex' }} key={day}>
              <Typography
                align="left"
                className={`${currentDay === day && classes.today}`}
              >
                {dayOfWeekAsString(day)}:
              </Typography>
              {openingHours[day] !== null ? (
                <Typography style={{ marginLeft: 'auto' }}>
                  {openingHours[day]!.from} - {openingHours[day]!.to}
                </Typography>
              ) : (
                <Typography style={{ marginLeft: 'auto' }}>closed</Typography>
              )}
            </div>
          ))}
        </Collapse>
      </>
    );
  } else {
    let nextDay = currentDay;
    if (openingHours[currentDay] !== null && totalDate > openingHours[currentDay]!.to) {
      nextDay++;
    }
    while (openingHours[nextDay] === null) {
      nextDay++;
      nextDay %= 7;
    }
    let opening;
    if (nextDay === currentDay) {
      opening = (
        <Typography>
          | Opens today at {openingHours[currentDay]!.from}
        </Typography>
      );
    } else if (nextDay - currentDay === 1) {
      opening = (
        <Typography>
          | Opens tomorrow at {openingHours[nextDay]!.from}
        </Typography>
      );
    } else {
      opening = (
        <Typography>
          | Opens on {dayOfWeekAsString(nextDay)} at{' '}
          {openingHours[nextDay]!.from}
        </Typography>
      );
    }
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            style={{ color: 'rgba(242,139,130,1.0)', fontWeight: 'bold' }}
          >
            Closed&nbsp;
          </Typography>
          {opening}
          {showOpeningHours ? (
            <AiFillCaretUp
              className={classes.icon}
              onClick={() => setShowOpeningHours(false)}
            />
          ) : (
            <AiFillCaretDown
              className={classes.icon}
              onClick={() => setShowOpeningHours(true)}
            />
          )}
        </div>
        <Collapse in={showOpeningHours}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div style={{ display: 'flex' }} key={day}>
              <Typography
                align="left"
                className={`${currentDay === day && classes.today}`}
              >
                {dayOfWeekAsString(day)}:
              </Typography>
              {openingHours[day] !== null ? (
                <Typography style={{ marginLeft: 'auto' }}>
                  {openingHours[day]!.from} - {openingHours[day]!.to}
                </Typography>
              ) : (
                <Typography style={{ marginLeft: 'auto' }}>closed</Typography>
              )}
            </div>
          ))}
        </Collapse>
      </>
    );
  }
};

export default OpeningStatus;
