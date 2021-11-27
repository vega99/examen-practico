import React from "react";
import { useSelector } from "react-redux";
import QuestionItem from "../../components/QuestionItem";

export const UserQuestions = () => {
  const user = useSelector((state) => state.auth.userDetails);
  const questions = useSelector((state) =>
    state.allData.questions.filter((q) => q.user_id == user.user_key)
  );

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          {questions.map((que) => (
            <QuestionItem
              key={que.id}
              question={que}
              to={`/home/user/${que.id}`}
            />
          ))}
        </div>
      ) : (
        <div>
          <h1>No tienes preguntas</h1>
        </div>
      )}
    </div>
  );
};
