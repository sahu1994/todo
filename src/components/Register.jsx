import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { registerRequest } from "../redux/actions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Background from "./Background";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth || {}
  );

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = (data) => {
    dispatch(registerRequest(data));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const password = watch("password", "");

  return (
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
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#4caf50",
            fontWeight: 600,
            mb: 2,
          }}
        >
          Create Your Account
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
          Join us and start managing your tasks effectively
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
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
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
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("passwordConfirm", {
              required: "Confirm your password",
            })}
            error={!!errors.passwordConfirm}
            helperText={
              errors.passwordConfirm ? errors.passwordConfirm.message : ""
            }
            InputLabelProps={{ sx: { fontSize: "0.875rem" } }}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </Box>
    </Background>
  );
};

export default Register;
