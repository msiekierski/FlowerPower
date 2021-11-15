import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/root-reducer';
import { actionCreators } from '../../../redux/searchResult';
import { GrCheckmark } from 'react-icons/gr';

type Props = {
  color: string;
};

type StyleProps = {
  color: string;
};

const useStyles = (props: StyleProps) =>
  makeStyles((theme) => ({
    mainContainer: {
      marginTop: '10px',
      width: '50px',
      height: '100px',
      flex: '1 0 15%',
      cursor: 'pointer',
    },
    circle: {
      margin: 'auto',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid black',
      backgroundColor: props.color !== 'mix' ? props.color : 'inherit',
      background:
        props.color === 'mix'
          ? 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)'
          : 'inherit',
    },
    icon: {
      position: 'relative',
      left: '20%',
      top: '12.3%',
      fontSize: '1.5rem',
    },
  }));

const ColorFilters: React.FC<Props> = ({ color }) => {
  const classes = useStyles({ color })();
  const { colorFilters } = useSelector(
    (state: RootState) => state.search.filters
  );
  const isSelected = colorFilters.includes(color);
  const dispatch = useDispatch();
  console.log(isSelected);
  const { addFilterColor, removeFilterColor } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const handleOnClickEvent = () => {
    if (isSelected) {
      removeFilterColor(color);
    } else {
      addFilterColor(color);
    }
  };
  return (
    <div className={classes.mainContainer} onClick={() => handleOnClickEvent()}>
      <div className={classes.circle}>
        <div className={classes.icon}>{isSelected && <GrCheckmark />}</div>
      </div>
      <Typography align="center">{color}</Typography>
    </div>
  );
};

export default ColorFilters;
