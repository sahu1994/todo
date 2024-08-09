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
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";
import { getInitials, getRandomColor } from "../utils/avatarUtils";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/");
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleMenuOpen}
          >
            <Avatar sx={{ backgroundColor: getRandomColor() }}>
              {getInitials(user.data?.email)}
            </Avatar>
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
            <ListItem >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem  onClick={handleLogout}>
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

      <Container>
        <TaskList />
      </Container>
    </Box>
  );
};

export default Dashboard;
