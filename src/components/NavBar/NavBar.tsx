import {
  alpha,
  AppBar,
  makeStyles,
  Toolbar,
  InputBase,
  Menu,
  MenuItem,
  Popper,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../../resources/icons/logo.svg';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  navigation: {
    margin: '0 1.5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '50%',
    border: '2.5px solid',
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: '1em',
  },
  iconsPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2.5rem',
    gap: '30%',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  logo: {},
  menuIcon: {
    display: 'none',
  },
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
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    iconsPanel: {
      display: 'none',
    },
    navigation: {
      justifyContent: 'space-around',
    },
    logo: {
      display: 'none',
    },
    menuIcon: {
      display: 'block',
    },
  },
  [theme.breakpoints.between(
    theme.breakpoints.values.xs,
    theme.breakpoints.values.md
  )]: {
    menuIcon: {
      display: 'block',
    },
    iconsPanel: {
      display: 'none',
    },
    mobileMenu: {
      display: 'block',
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [menuPosition, setMenuPosition] = useState<SVGElement | null>(null);

  const onMenuIconClick = (e: React.MouseEvent<SVGElement>) => {
    if (menuPosition) {
      setMenuPosition(null);
    }
    e.preventDefault();
    setMenuPosition(e.currentTarget);
  };

  const isMenuOpen = (): boolean => {
    return menuPosition !== null;
  };

  return (
    <>
      <AppBar elevation={0}>
        <Toolbar className={classes.navigation}>
          <Logo className={classes.logo} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
              fullWidth
            />
          </div>
          <div className={classes.iconsPanel}>
            <PersonOutlineOutlinedIcon fontSize="inherit" />
            <ShoppingBasketOutlinedIcon fontSize="inherit" />
          </div>
          <MenuIcon className={classes.menuIcon} onClick={onMenuIconClick} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Popper className={classes.mobileMenu} open={isMenuOpen()}>
        <ClickAwayListener onClickAway={() => setMenuPosition(null)}>
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

export default NavBar;
