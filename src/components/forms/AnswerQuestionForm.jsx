import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "../../store/actions/data";

const AnswerQuestionForm = ({ qId, userId, open, onClose }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({});

  const isLoading = useSelector((state) => state.allData.isLoading);

  const closeModal = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    setValue("pUser", userId);
    setValue("pQuestion", qId);
  }, [qId, userId]);

  const onSubmit = async (data) => {
    try {
      await dispatch(addAnswer(data));
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        onClose={closeModal}
        keepMounted={false}
      >
        <DialogTitle>Agregar Comentario</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Escribe tu respuesta"
              multiline
              minRows={4}
              {...register("pAnswer", { required: true })}
              fullWidth
              margin="normal"
              error={!!errors.pAnswer}
              helperText={errors.pAnswer && "Este campo no pude estar vacío"}
            />
            <DialogActions>
              <Button onClick={closeModal} color="error" disabled={isLoading}>
                Cerrar
              </Button>
              <Button type="submit" color="info" disabled={isLoading}>
                Enviar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnswerQuestionForm;
