import React, { useRef, useState } from 'react';
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs';
import { makeStyles } from '@material-ui/core';
import { useWindowSize } from '../../utils/customHooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    marginTop: '3%',
  },
  flowerShopsContainer: {
    padding: '5px',
    display: 'flex',
    overflowX: 'auto',
    columnGap: '10px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none' /* IE and Edge */,
    'scrollbar-width': 'none' /* Firefox */,
    scrollBehavior: 'smooth',
  },
  promotedStores: {
    marginTop: '20px',
    position: 'relative',
  },
  leftScrollIcon: {
    cursor: 'pointer',
    fontSize: '3rem',
    zIndex: 1000,
    position: 'absolute',
    left: '0.5%',
    top: '45%',
    padding: 0,
  },
  rightScrollIcon: {
    cursor: 'pointer',
    fontSize: '3rem',
    zIndex: 1000,
    position: 'absolute',
    right: '0.5%',
    top: '45%',
    padding: 0,
  },
}));

type Props = {
  carouselComponents: Array<JSX.Element>;
};

const CustomCarousel: React.FC<Props> = ({ carouselComponents }) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  console.log(carouselRef.current?.offsetWidth);
  const scroll = (scrollOffset: number) => {
    if (carouselRef && carouselRef.current) {
      carouselRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div
      className={classes.flowerShopsContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={carouselRef}
    >
      <div
        className={classes.leftScrollIcon}
        style={{ visibility: isHovered ? 'visible' : 'hidden' }}
        onClick={() =>
          scroll(
            -(
              (carouselRef.current!.offsetWidth / 220) * 220 -
              (carouselRef.current!.offsetWidth % 220)
            )
          )
        }
      >
        <BsArrowLeftSquare
          style={{
            backgroundColor: 'silver',
            opacity: 0.5,
            borderRadius: '5px',
          }}
        />
      </div>
      <div
        className={classes.rightScrollIcon}
        style={{ visibility: isHovered ? 'visible' : 'hidden' }}
        onClick={() =>
          scroll(
            (carouselRef.current!.offsetWidth / 220) * 220 -
              (carouselRef.current!.offsetWidth % 220)
          )
        }
      >
        <BsArrowRightSquare
          style={{
            backgroundColor: 'silver',
            opacity: 0.5,
            borderRadius: '5px',
          }}
        />
      </div>
      {carouselComponents}
    </div>
  );
};

export default CustomCarousel;
