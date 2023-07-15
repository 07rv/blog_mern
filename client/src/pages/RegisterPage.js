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
import { useState } from "react";

import { Navigate } from "react-router-dom";

const defaultTheme = createTheme();

const RegisterPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [inputField, setInputField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errorField, setErrorField] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
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
      if (field === "firstname") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter First Name");
          hasError = true;
        }
      } else if (field === "lastname") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter Last Name");
          hasError = true;
        }
      } else if (field === "email") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter Email");
          hasError = true;
        }
      } else if (field === "password") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter Password");
          hasError = true;
        }
      } else if (field === "confirmpassword") {
        if (inputField[field] === "") {
          setErrorMessage(field, "Enter Confirm Password");
        } else if (inputField[field] !== inputField["password"]) {
          setErrorMessage(field, "Confirm Password should match");
          hasError = true;
        }
      }
      return hasError;
    });
  };
  const handleSubmit = async (event) => {
    if (!checkAndSetValidationErrors()) {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/register`,
        {
          method: "POST",
          body: JSON.stringify({ inputField }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        alert("registration successful");
        setRedirect(true);
      } else {
        alert("registration failed");
      }
    }
  };
  if (redirect) return <Navigate to={"/login"} />;
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
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstname"
                  required
                  error={errorField && errorField.firstname !== ""}
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  defaultValue={inputField.firstname}
                  onChange={(e) => inputsHandler(e.target.name, e.target.value)}
                  helperText={
                    errorField && errorField.firstname !== ""
                      ? errorField.firstname
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastname"
                  required
                  error={errorField && errorField.lastname !== ""}
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  autoFocus
                  defaultValue={inputField.password}
                  onChange={(e) => inputsHandler(e.target.name, e.target.value)}
                  helperText={
                    errorField && errorField.lastname !== ""
                      ? errorField.lastname
                      : ""
                  }
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  name="confirmpassword"
                  required
                  error={errorField && errorField.confirmpassword !== ""}
                  fullWidth
                  id="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  defaultValue={inputField.confirmpassword}
                  onChange={(e) => inputsHandler(e.target.name, e.target.value)}
                  helperText={
                    errorField && errorField.confirmpassword !== ""
                      ? errorField.confirmpassword
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
