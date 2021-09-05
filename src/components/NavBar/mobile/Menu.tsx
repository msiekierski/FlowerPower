import {
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popper,
  makeStyles,
  Popover,
} from '@material-ui/core';
import React from 'react';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';

const useStyles = makeStyles((theme) => ({
  mobileMenu: {
    display: 'none',
    position: 'relative',
    backgroundColor: `${theme.palette.primary.light}`,
    height: '500px',
    width: '300px',
    borderBottom: '2px solid gray',
    borderBottomLeftRadius: '1em',
    borderBottomRightRadius: '1em',
    zIndex: 10000,
    // transition: 'height 0.5s ease',
  },
  userOptions: {
    width: '100%',
    columnCount: 2,
    display: 'flex',
    alignItems: 'center',
  },
}));

type MenuMobileProps = {
  isOpen: boolean;
  closeMenu: Function;
  navbarRef: HTMLDivElement | null;
};

const Menu = ({ isOpen, closeMenu, navbarRef }: MenuMobileProps) => {
  const classes = useStyles();
  return (
    <Popper className={classes.mobileMenu} open={isOpen} anchorEl={navbarRef}>
      <ClickAwayListener onClickAway={() => closeMenu()}>
        <MenuList>
          <div className={classes.userOptions}>
            <PersonOutlineOutlinedIcon />
            <ShoppingBasketOutlinedIcon />
          </div>
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
          <MenuItem>Item 4</MenuItem>
        </MenuList>
      </ClickAwayListener>
    </Popper>
  );
};

export default Menu;
