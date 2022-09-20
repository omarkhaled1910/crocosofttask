import { ArrowDownward, Delete } from "@mui/icons-material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SingleAnswer from "../SingleAnswer/SingleAnswe";

const SingleQuestion = ({
  quiz,
  deleteAnswer,
  editAnswer,
  handleQuestionDelete,
}) => {
  const [questionHover, setQuestionHover] = React.useState("");
  return (
    <div
      onMouseLeave={() => setQuestionHover("")}
      onMouseEnter={() => setQuestionHover(quiz?.id)}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={
            questionHover === quiz?.id ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuestionDelete(quiz?.id);
                }}
              >
                <Delete />
              </div>
            ) : (
              <ArrowDownward />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {quiz?.text}
        </AccordionSummary>
        <AccordionDetails onMouseLeave={() => setQuestionHover("")}>
          <div style={{ width: "100%" }}>
            {quiz?.answers?.map((ans, i) => (
              <SingleAnswer
                ans={ans}
                questionHover={questionHover}
                setQuestionHover={setQuestionHover}
                handleDeleteAnswer={deleteAnswer}
                handleEditAnswerSubmit={editAnswer}
                i={i}
                questionId={quiz?.id}
                key={i}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <br />
    </div>
  );
};

export default SingleQuestion;
