import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };
  const username = userInfo?.username;
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/" underline="none" sx={{ color: "black" }}>
          RvVerse
        </Link>
      </Typography>
      <Divider />
      <List>
        {username && (
          <>
            <Link href="/create" underline="none" sx={{ color: "Black" }}>
              {" "}
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={"Create new post"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Button
              sx={{ color: "Black", textTransform: "none" }}
              onClick={logout}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={`Logout ${username})`} />
                </ListItemButton>
              </ListItem>
            </Button>
          </>
        )}
        {!username && (
          <>
            <Link href="/login" underline="none" sx={{ color: "black" }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={`Login`} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/register" underline="none" sx={{ color: "black" }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={`Register`} />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <CssBaseline />
      <AppBar component="nav" position="static">
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href="/" underline="none" sx={{ color: "#fff" }}>
              RvVerse
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {username && (
              <>
                <Button sx={{ color: "#fff", textTransform: "none" }}>
                  <Link href="/create" underline="none" sx={{ color: "#fff" }}>
                    {"Create new post"}
                  </Link>
                </Button>
                <Button
                  sx={{ color: "#fff", textTransform: "none" }}
                  onClick={logout}
                >
                  Logout ({username})
                </Button>
              </>
            )}
            {!username && (
              <>
                <Button sx={{ color: "#fff" }}>
                  <Link href="/login" underline="none" sx={{ color: "#fff" }}>
                    Login
                  </Link>
                </Button>

                <Button sx={{ color: "#fff" }}>
                  <Link
                    href="/register"
                    underline="none"
                    sx={{ color: "#fff" }}
                  >
                    Register
                  </Link>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
      </Box>
    </Box>
  );
};

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
