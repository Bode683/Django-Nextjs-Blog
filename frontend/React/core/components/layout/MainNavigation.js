// import classes from "../../styles/MainNavigation.module.css";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import DrawerComponent from "./DrawerComponent";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    height: " 5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    padding: " 0 10%",
  },

  logo: {
    flexGrow: "1",
    cursor: "pointer",
    fontSize: "2rem",
    color: "white",
    fontWeight: "bold",
  },

  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },

  linkItem: {
    textDecoration: "none",
    cursor: "pointer",
    color: "white",
    display: { xs: "none", md: "flex" },
    fontSize: "1em",
    fontWeight: 700,

    marginLeft: theme.spacing(3),
    "&:hover": {
      color: theme.palette.secondary.main,
      // borderBottom: "1em solid white",
    },
    "&:active": {
      color: theme.palette.secondary.main,
      // borderBottom: "1em solid white",
    },
  },
}));

function MainNavigation() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <header className={classes.header}>
          <div>
            <Link href="/">
              <Typography className={classes.logo}>Weetyu</Typography>
            </Link>
          </div>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <div className={classes.navlinks}>
              <Link href="/">
                <Typography className={classes.linkItem}>Home</Typography>
              </Link>

              <Link className={classes.linkItem} href="/new">
                <Typography className={classes.linkItem}>Add</Typography>
              </Link>

              <Link className={classes.linkItem} href="/myposts">
                <Typography className={classes.linkItem}>My Posts</Typography>
              </Link>

              {/* <Link className={classes.linkItem} href="/edit">
                <Typography className={classes.linkItem}>Update</Typography>
              </Link> */}
            </div>
          )}
        </header>
      </Toolbar>
    </AppBar>
  );
}

export default MainNavigation;
