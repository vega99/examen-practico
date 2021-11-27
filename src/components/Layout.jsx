import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Button, ListItemAvatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/auth";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const drawerWidth = 240;

const Layout = (props) => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.userDetails);
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <NavLink
          exact
          to="/home"
          style={{ textDecoration: "none", color: "inherit" }}
          activeStyle={{
            color: theme.palette.primary.main,
            backgroundColor: "red",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>
        {isAuth && (
          <NavLink
            // exact
            to="/home/user"
            style={{ textDecoration: "none", color: "inherit" }}
            activeStyle={{
              color: theme.palette.primary.main,
              backgroundColor: "red",
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <ListItem button>
              <ListItemIcon>
                <QuestionMarkIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Preguntas" />
            </ListItem>
          </NavLink>
        )}
      </List>
      <Divider />
      {isAuth && (
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{user.user_fullname.substring(0, 2)}</Avatar>
            </ListItemAvatar>
            <ListItemText>{user.user_fullname}</ListItemText>
          </ListItem>
        </List>
      )}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className="between" style={{ width: "100%" }}>
            <div>
              <Typography variant="h6" noWrap component="div">
                Preguntas
              </Typography>
            </div>
            <div>
              {isAuth ? (
                <div className="between">
                  <Button
                    color="info"
                    variant="outlined"
                    onClick={handleLogout}
                    sx={{ mx: 1 }}
                  >
                    Salir
                  </Button>
                </div>
              ) : (
                <Button
                  color="info"
                  variant="outlined"
                  onClick={() => history.push("/login")}
                >
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        // className="hideScroll"
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
