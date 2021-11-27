import {
  Alert,
  Button,
  Collapse,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../store/actions/auth";
import {Link} from 'react-router-dom'
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
const Login = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data));
      clearTimeout(time);
      history.push("/home");
    } catch (error) {
      displayAlert(error.message);
    }
  };

  const closeAlert = () => {
    setMessage("");
  };
  let time;
  const displayAlert = (message) => {
    setMessage(message);
    time = setTimeout(() => {
      closeAlert();
    }, 3000);
  };

  return (
    <Paper sx={{ height: "100vh", width: "100vw" }} className="centered">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Collapse in={!!message}>
          <Alert severity="error">{message}</Alert>
        </Collapse>
        <TextField
          label="Correo"
          margin="normal"
          type="email"
          fullWidth
          {...register("pEmail", { required: true })}
          error={!!errors.pEmail}
          helperText={errors.pEmail && "El correo es requerido"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )            
          }}
          />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            )            
          }}
          error={!!errors.pPassword}
          // color="success"
          helperText={errors.pPassword && "La contraseña es requerida"}
          label="Contraseña"
          margin="normal"
          type="password"
          {...register("pPassword", { required: true })}
          fullWidth
        />
        <Button type="submit" variant="contained" color="info">
          Iniciar sesión
        </Button>
        <div className="between register">
          <Typography variant="caption">
            ¿No tienes cuenta?
          </Typography>
          <Link to="/register" className="link">Registrate</Link>      
        </div>
      </form>
    </Paper>
  );
};

export default Login;
