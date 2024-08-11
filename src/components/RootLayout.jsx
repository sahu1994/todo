import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";
import { getInitials, getRandomColor } from "../utils/avatarUtils";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const location = useLocation();

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',
  };

  const currentHeading = pageTitles[location.pathname]

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    navigate("/profile")
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/logout");
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          color: "#000",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            {currentHeading}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleMenuOpen}
          >
            {user && (
              <Avatar
                src={user?.photo || ""}
                sx={{ backgroundColor: getRandomColor() }}
              >
                {getInitials(user?.name)}
              </Avatar>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <List>
            <ListItem>
              <ListItemText
                primary="Home"
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Profile"
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </ListItem>
            <Divider />
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Logout" />
              <LogoutIcon />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
