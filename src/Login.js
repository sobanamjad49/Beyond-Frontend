import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (data?.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("login"));
      window.dispatchEvent(new Event("userChanged")); // ✅ IMPORTANT!
      toast.success("Login Successfully!");
      sessionStorage.removeItem("checkoutToastShown");
      navigate(from);
    } else {
      setError("Login failed. Try again.");
    }
  } catch (err) {
    console.log("Frontend Error:", err);
    if (err.response?.data?.error) {
      setError(err.response.data.error);
    } else {
      setError("Something went wrong.");
    }
    setTimeout(() => setError(""), 5000);
  }
};


  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Sign In
        </Button>

        <Box mt={2} textAlign="center">
  <Typography fontSize="14px">
    Don’t have an account?{" "}
    <Link
      to="/register"
      state={{ from }}
      style={{
        textDecoration: "none",
        color: theme.palette.primary.main,
        fontWeight: "bold",
      }}
    >
      Please Register
    </Link>
  </Typography>
</Box>


        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Return to Store
        </Button>
      </form>
    </Box>
  );
};

export default Login;
