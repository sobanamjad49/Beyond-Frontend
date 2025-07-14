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

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ") || "";

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        { firstName, lastName, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
 toast.success("User Registered Successfully!");
sessionStorage.removeItem("checkoutToastShown");
navigate("/login", { state: { from } });

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
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" mb={2}>
          Sign Up
        </Typography>

        <TextField
          label="Full Name"
          type="text"
          required
          fullWidth
          margin="normal"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          margin="normal"
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
          Sign Up
        </Button>

      <Typography mt={2} fontSize="14px" textAlign="center">
  Already have an account?{" "}
  <Link
    to="/login"
    state={{ from }}
    style={{
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: "bold",
    }}
  >
    Please Login
  </Link>
</Typography>

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

export default Register;
