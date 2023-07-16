import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Link,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const defaultTheme = createTheme();

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [errorField, setErrorField] = useState({
    email: "",
    password: "",
  });

  const inputsHandler = (name, value) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (field, errorMessage) => {
    setErrorField((prevState) => ({
      ...prevState,
      [field]: errorMessage,
    }));
  };
  const checkAndSetValidationErrors = () => {
    var hasError = false;
    Object.keys(inputField).map((field) => {
      if (field === "email") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter Email");
          hasError = true;
        }
      } else if (field === "password") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter Password");
          hasError = true;
        }
      }
      console.log(hasError, 123);
      return hasError;
    });
  };
  const handleSubmit = async (event) => {
    if (!checkAndSetValidationErrors()) {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/login`,
        {
          method: "POST",
          body: JSON.stringify(inputField),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert("wrong credentials");
      }
    }
  };
  if (redirect) return <Navigate to={"/"} />;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  error={errorField && errorField.email !== ""}
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoFocus
                  defaultValue={inputField.email}
                  onChange={(e) => inputsHandler(e.target.name, e.target.value)}
                  helperText={
                    errorField && errorField.email !== ""
                      ? errorField.email
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  error={errorField && errorField.password !== ""}
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  defaultValue={inputField.password}
                  onChange={(e) => inputsHandler(e.target.name, e.target.value)}
                  helperText={
                    errorField && errorField.password !== ""
                      ? errorField.password
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
