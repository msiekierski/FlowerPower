import {
  alpha,
  AppBar,
  makeStyles,
  Toolbar,
  InputBase,
} from "@material-ui/core";
import { ReactComponent as Logo } from "../../resources/icons/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";

const useStyles = makeStyles((theme) => ({
  navigation: {
    margin: "0 1.5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "50%",
    border: "2.5px solid",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: "1em",
  },
  iconsPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    gap: "30%",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar elevation={0}>
        <Toolbar className={classes.navigation}>
          <Logo />
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
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
