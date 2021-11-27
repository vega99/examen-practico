import React, {useState} from "react";
import { Paper, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import isMine from "../helpers/isMine";
import AnswerQuestionForm from "./forms/AnswerQuestionForm";




const Question = ({ question }) => {
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const user = useSelector(state => state.auth.userDetails)
  const isAuth = useSelector(state => state.auth.isAuth)
  const mine = isMine(user?.user_key, question?.id_user);  
  
  return (
    <Paper sx={{ p: 1, mt: 1 }}>
      <AnswerQuestionForm open={open} qId={question?.id} userId={user?.user_key} onClose={() => setOpen(false)}/>
      <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
        {question?.title}
      </Typography>
      <Typography variant="h6">{question?.description}</Typography>
      <div style={{ marginTop: 10 }} className="grayText between">
        <div>
          <label>Por: </label>
          <span>
            <em>
              {" "}
              <b>{mine ? 'Hecha por mí' : `${question?.name} ${question?.lastname}`} </b>
            </em>
          </span>
          <p>
            {dayjs(question?.created_at)
              .locale("es")
              .format("dddd, MMMM D, YYYY")}
          </p>
        </div>
        <div className="self-end">
          {(!question?.answer_id && !mine) && (
            <Button onClick={() => setOpen(true)} variant="outlined" color="success" disabled={isAuth ? false : true}>
              Responder
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default Question;
