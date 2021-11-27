import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Answer from "../components/Answer";

import Question from "../components/Question";
import isMine from "../helpers/isMine";

const QuestionDetails = (props) => {
  // const [open, setOpen] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const question = useSelector((state) =>
    state.allData.questions.find((ques) => ques.id === id)
  );
  const user = useSelector((state) => state.auth.userDetails);
  const answers = useSelector((state) =>
    state.allData.answers.filter((an) => an.question_id === id)
  );

  const rightAnswer = useSelector((state) =>
    state.allData.answers.find((an) => an.id === question?.answer_id)
  );

  let mine = isMine(user?.user_key, question?.user_id);
  return (
    <div>
      <IconButton onClick={() => history.goBack()}>
        <ArrowBack />
      </IconButton>
      <Question question={question} />
      {rightAnswer && (
        <Answer answer={rightAnswer} ownerQtn={mine} isRight={true} />
      )}
      {answers.length > 0  ? (
        <div>
          {answers.map((an) => {
            if (an?.id !== rightAnswer?.id) {
              return (
                <Answer
                  key={an.id}
                  answer={an}
                  ownerQtn={mine}
                  isRight={false}
                  thereIsRightAnswer={!!rightAnswer}
                />
              );
            }
          })}
        </div>
      ) : (
        <div>
          <h1>No hay Respuestas</h1>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
