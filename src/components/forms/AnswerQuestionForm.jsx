import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer, putAnswer } from "../../store/actions/data";



const AnswerQuestionForm = ({ qId, userId, open, onClose, answerId }) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({});

  const isLoading = useSelector((state) => state.allData.isLoading);
  const selectedAnswer = useSelector(state => state.allData.answers.find(an => an.id === answerId))

  const closeModal = () => {
    reset();
    onClose();
  };  

  useEffect(() => {
    setValue("pUser", userId);
    setValue("pQuestion", qId);
    if (answerId) {
      setValue("id", answerId);
      setValue("pAnswer", selectedAnswer.answer);
    }
  }, [qId, userId, answerId, open]);

  const closeAlert = () => {
    setOpenAlert(false)
    setMessage('')
  }


  const openMessage = (msg) => {
    setMessage(msg)
    setOpenAlert(true)
    setTimeout(() => {
      closeAlert()
    }, 4000);
  }

  const onSubmit = async (data) => {    
    if (answerId) {
      try {
        await dispatch(putAnswer(data));
        closeModal();
      } catch (error) {
        openMessage(error.message)
      }
    } else {
      try {
        await dispatch(addAnswer(data));
        closeModal();
      } catch (error) {
        openMessage(error.message)        
      }
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
        <DialogTitle>{answerId ? 'Editar respuesta' : 'Agregar respuesta'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Collapse in={openAlert}>
              <Alert severity="error" onClose={closeAlert}>{message}</Alert>
            </Collapse>
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
