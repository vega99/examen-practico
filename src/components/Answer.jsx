import {
  Card,
  Typography,
  Grid,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import isMine from "../helpers/isMine";
import { useDispatch, useSelector } from "react-redux";
import { favorite } from "../store/actions/data";
import AnswerQuestionForm from "./forms/AnswerQuestionForm";

const Answer = ({ answer, isRight, ownerQtn, thereIsRightAnswer }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userDetails);

  let mine = isMine(answer.user_id, user?.user_key);

  const handleAddFavorite = async () => {
    const data = {
      pAnswer: answer.id,
      pQuestion: answer.question_id,
    };
    try {
      await dispatch(favorite(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="card">
      <AnswerQuestionForm
        qId={answer.question_id}
        userId={answer.user_id}
        open={open}
        onClose={() => setOpen(false)}
        answerId={answer.id}        
      />
      <Grid container spacing={1}>
        <Grid item xs={12} md={1}>
          {isRight ? (
            <div className="centered height-100">
              <Tooltip title="Esta el la respuesta correcta">
                <CheckIcon color="success" sx={{ fontSize: 80 }} />
              </Tooltip>
            </div>
          ) : (
            <div className="centered height-100">
              <Tooltip title="Marcar como correcta?">
                <span>
                  <IconButton
                    disabled={!ownerQtn || thereIsRightAnswer ? true : false}
                    onClick={handleAddFavorite}
                  >
                    <CheckIcon
                      fontSize="small"
                      color={
                        !ownerQtn || thereIsRightAnswer ? "disabled" : "info"
                      }
                    />
                    <QuestionMarkIcon
                      color={
                        !ownerQtn || thereIsRightAnswer ? "disabled" : "info"
                      }
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={11}>
          <Typography paragraph>{answer.answer}</Typography>
          <div className="between">
            <div>
              <Typography variant="body2" color="InactiveCaptionText">
                -- <em>{`${answer.name} ${answer.lastname}`}</em>
              </Typography>
              <Typography variant="caption" color="GrayText">
                --{" "}
                <em>
                  {dayjs(answer.created_at)
                    .locale("es")
                    .format("dddd, MMMM D, YYYY")}
                </em>
              </Typography>
            </div>
            <div>
              {mine && (
                <Button color="info" variant="outlined" onClick={() => setOpen(true)}>
                  Editar
                </Button>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Answer;
