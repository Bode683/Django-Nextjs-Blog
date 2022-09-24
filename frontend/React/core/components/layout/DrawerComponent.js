import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "#fcb8d2",
    fontSize: "20px",
    fontWeight: "bold",
  },
  icon: {
    color: "white",
  },
  logo: {
    color: "white",
    fontWeight: "bold",
    marginRight: "3rem",
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer
        anchor="right"
        sx={{ width: 250, color: "#fff" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar
          sx={{
            backgroundColor: "primary.main",
            justifyContent: "space-between",
            Display: "flex",
          }}
        >
          <Typography variant="h4" className={classes.logo}>
            Menu
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer", color: "#fff" }}
            onClick={() => setOpenDrawer(!openDrawer)}
          />
        </Toolbar>
        <box sx={{ backgroundColor: "primary.main" }} height="100vh">
          <List sx={{ marginTop: 0, alignItems: "center" }} height="100vh">
            {/* <Divider /> */}
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText disableTypography>
                <Link className={classes.link} href="/">
                  <Typography>Home</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            {/* <Divider /> */}
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText disableTypography>
                <Link className={classes.link} href="/new">
                  <Typography>Add</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            {/* <Divider /> */}
            <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText disableTypography>
                <Link className={classes.link} href="/myposts">
                  <Typography>My Posts</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            {/* <Divider /> */}
            {/* <ListItem divider button onClick={() => setOpenDrawer(false)}>
              <ListItemText disableTypography>
                <Link href="/edit">
                  <Typography>Update</Typography>
                </Link>
              </ListItemText>
            </ListItem> */}
            {/* <Divider /> */}
          </List>
        </box>
      </Drawer>
      <IconButton
        className={classes.icon}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
