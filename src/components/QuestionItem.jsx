import { Button, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useHistory } from "react-router";

const QuestionItem = ({question, to}) => {
  const history = useHistory();
  return (
    <Paper key={question.id} sx={{ my: 1, p: 1 }}>      
        <div className="between">
          <div>
            <Typography
              variant="h5"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              {question.title}
            </Typography>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "240px",
              }}
            >
              <Typography variant="subtitle1" noWrap={true}>
                {question.description}
              </Typography>
            </div>
            <Typography variant="subtitle2" color="GrayText">
              {dayjs(question.created_at)
                .locale("es")
                .format("dddd, MMM D, YYYY")}
            </Typography>
          </div>
          <div style={{ alignSelf: "center" }}>
            <Button
              onClick={() => history.push(to)}
              color="success"
            >
              ver más
            </Button>
          </div>
        </div>
      
    </Paper>
  );
};

export default QuestionItem;
