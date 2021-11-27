import {
  Alert,
  Button,
  Collapse,
  Paper,
  TextField,  
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { registerUser } from "../store/actions/auth";



const RegisterAccount = (props) => {
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
      await dispatch(registerUser(data));
      clearTimeout(time);
      push()
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

  const push = () => {
    // console.log('entro')
    history.push('/login')
  }

  return (
    <Paper sx={{ height: "100vh", width: "100vw" }} className="centered">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Collapse in={!!message}>
          <Alert severity="error">{message}</Alert>
        </Collapse>
        <TextField
          label="Nombre"
          margin="normal"          
          fullWidth
          {...register("pName", { required: true })}
          error={!!errors.pName}
          helperText={errors.pName && "El nombre es requerido"}
          // color="success"
        />
        <TextField
          label="Apellidos"
          margin="normal"          
          fullWidth
          {...register("pLastname", { required: true })}
          error={!!errors.pLastname}
          helperText={errors.pLastname && "los apellidos es requeridos"}        
        />
        <TextField
          label="Correo"
          margin="normal"
          type="email"
          fullWidth
          {...register("pEmail", { required: true })}
          error={!!errors.pEmail}
          helperText={errors.pEmail && "El correo es requerido"}
          // color="success"
        />
        <TextField
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
          Registrar
        </Button>        
      </form>
    </Paper>
  );
};

export default RegisterAccount;
