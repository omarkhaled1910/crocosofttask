import React from "react";
import { Circle, Delete, Edit } from "@mui/icons-material";
import { TextField } from "@mui/material";
import SaceCancel from "../SaveCancel/SaceCancel";

const SingleAnswer = ({
  ans,
  i,
  setQuestionHover,
  questionHover,
  handleEditAnswerSubmit,
  handleDeleteAnswer,
  questionId,
}) => {
  const [answerEdit, setAnswerEdit] = React.useState(null);

  return (
    <>
      {answerEdit?.id === ans?.id ? (
        <>
          <div className="flex-center">
            <TextField
              value={answerEdit.text}
              onChange={(e) =>
                setAnswerEdit({ ...answerEdit, text: e.target.value })
              }
              type={"text"}
              fullWidth
            />
            <SaceCancel
              savefn={() => {
                handleEditAnswerSubmit(answerEdit, questionId);
                setAnswerEdit(null);
              }}
              cancelfn={() => setAnswerEdit(null)}
            />
          </div>
        </>
      ) : (
        <div
          className="flex-center"
          key={i}
          onMouseEnter={() => setQuestionHover(ans.id.toString())}
          style={{
            width: "80%",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <span>
            <Circle />
          </span>

          {ans.text}
          {ans.is_true && "(Right Answer)"}
          {questionHover === ans.id && !answerEdit && (
            <div
              onMouseEnter={() => setQuestionHover(ans.id.toString())}
              className="flex-center"
            >
              <div onClick={() => setAnswerEdit(ans)}>
                <Edit />
              </div>
              <div onClick={() => handleDeleteAnswer(ans.id, questionId)}>
                <Delete />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SingleAnswer;
