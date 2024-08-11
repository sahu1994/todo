import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  googleLoginFailure,
  googleLoginSuccess,
  loginRequest,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Background from "./Background";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(false);
  const { user, error, loading } = useSelector((state) => state.auth || {});
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
    setShowProgress(true);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      setShowProgress(false);
    }
    if (error || !loading) setShowProgress(false);
  }, [user, error, loading, navigate]);

  const handleGoogleSuccess = async (response) => {
    try {
      setShowProgress(true);
      dispatch(googleLoginSuccess(response?.credential));
    } catch (error) {
      setShowProgress(false);
      dispatch(googleLoginFailure("Google login error"));
    }
  };

  const handleGoogleFailure = () => {
    dispatch(googleLoginFailure("Google login error"));
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Background>
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 5,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#3f51b5" }}>
            Login
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            Log in to your account and start organizing your tasks effortlessly.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputLabelProps={{ sx: { fontSize: "0.875rem" } }}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={showProgress}
            >
              {showProgress ? (
                <CircularProgress color="primary" size={24} />
              ) : (
                "Login"
              )}
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
              onClick={() => {
                navigate("/register");
              }}
              disabled={showProgress}
            >
              Register
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            or
          </Typography>
          <GoogleLogin
            size="large"
            logo_alignment="center"
            width={400}
            text="signup_with"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          ></GoogleLogin>
        </Box>
      </Background>
    </GoogleOAuthProvider>
  );
};

export default Login;
