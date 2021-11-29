import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../store/actions/data";

const QuestionForm = ({ open, onClose, userId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.allData.isLoading);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
  } = useForm({});

  const closeModal = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(addQuestion(data));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue("pUser", userId);
  }, [userId]);

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        scroll="paper"
        onClose={closeModal}
        keepMounted={false}
      >
        <DialogTitle>Agregar Pregunta</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <TextField
              margin="normal"
              label="Título"
              placeholder="Escribe tu pregunta"
              multiline
              minRows={2}
              {...register("pTitle", { required: true })}
              error={!!errors.pTitle}
              helperText={errors.pTitle && "La pregunta es requrida"}
              margin="normal"
            />
            <TextField
              margin="normal"
              label="Descripción"
              placeholder="Escribe los detalles de la pregunta"
              multiline
              minRows={4}
              {...register("pDescription", { required: true })}
              error={!!errors.pDescription}
              helperText={errors.pDescription && "Este campo es requerido"}
              margin="normal"
            />

            <DialogActions>
              <Button onClick={closeModal} color="error" disabled={isLoading}>
                cerrar
              </Button>
              <Button type="submit" color="success" disabled={isLoading}>
                Enviar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionForm;
