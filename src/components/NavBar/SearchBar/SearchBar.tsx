import { alpha, InputBase, makeStyles } from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import SearchList from './SearchList';
import { useHistory } from 'react-router';

type StyleProps = {
  isSearchFocused: boolean;
};

const useStyles = (props: StyleProps) =>
  makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      width: '50%',
      [theme.breakpoints.down(450)]: {
        maxWidth: props.isSearchFocused ? 'inherit' : '50%',
      },
      border: '2.5px solid',
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.enteringScreen,
      }),
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
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 0, 1, 1),
      paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
      width: '100%',
    },
    [theme.breakpoints.between(
      theme.breakpoints.values.xs,
      theme.breakpoints.values.md
    )]: {
      menuIcon: {
        display: props.isSearchFocused ? 'none' : 'block',
      },
      logo: {
        display: props.isSearchFocused ? 'none' : 'block',
      },
      search: {
        width: props.isSearchFocused ? '100%' : 'inherit',
      },
      iconsPanel: {
        display: 'none',
      },
      mobileMenu: {
        display: 'block',
      },
      navigation: {
        margin: 0,
      },
    },
  }));

type Props = {
  isSearchFocused: boolean;
  setIsSearchFocused: (value: boolean) => void;
};

const SearchBar: React.FC<Props> = ({
  isSearchFocused,
  setIsSearchFocused,
}) => {
  const [input, setInput] = useState<string>('');
  const classes = useStyles({ isSearchFocused })();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search/?phrase=${input}`);
    setIsSearchFocused(false);
  };

  return (
    <>
      <div className={classes.search} ref={searchBarRef}>
        <form onSubmit={onSearchSubmit}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
              focused: classes.focusedSearch,
            }}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            fullWidth
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      <SearchList
        inputText={input}
        searchRef={searchBarRef.current}
        isFocused={isSearchFocused}
      />
    </>
  );
};

export default SearchBar;
