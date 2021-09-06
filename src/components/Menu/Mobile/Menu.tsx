import {
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popper,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';

const useStyles = makeStyles((theme) => ({
  mobileMenu: {
    display: 'none',
    position: 'relative',
    zIndex: 100,
    backgroundColor: `${theme.palette.primary.light}`,
    height: '100vh',
    width: '100vw',
  },
  accountOptions: {
    width: '100%',
    columnCount: 2,
    display: 'flex',
    alignItems: 'center',
  },
}));

type MenuProps = {
  isMenuOpen: boolean;
  closeMenu: Function;
  navRef: HTMLDivElement | null;
};

const Menu = ({ isMenuOpen, closeMenu, navRef }: MenuProps) => {
  const classes = useStyles();
  return (
    <>
      <Popper
        className={classes.mobileMenu}
        open={isMenuOpen}
        anchorEl={navRef}
        style={{ top: `${navRef && navRef.offsetHeight}px` }}
      >
        <ClickAwayListener onClickAway={() => closeMenu()}>
          <MenuList>
            <div className={classes.accountOptions}>
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
    </>
  );
};

export default Menu;
