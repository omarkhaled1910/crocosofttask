import {
  Add,
  Cancel,
  Circle,
  Edit,
  ThumbUpAltSharp,
} from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import SaceCancel from "../SaveCancel/SaceCancel";
import { v4 as uuidv4 } from "uuid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import SingleAnswer from "../SingleAnswer/SingleAnswe";
const AddingQuestion = ({ setAddingQuestion, handleAddQuestion }) => {
  const [addAnswer, setAddAnswer] = useState(false);
  const [question, setQuestion] = useState({
    text: "",
    feedback_true: "",
    feedback_false: "",
  });
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [rightAns, setRightAns] = useState(false);
  const [questionHover, setQuestionHover] = useState("");
  const [answerEdit, setAnswerEdit] = useState(null);
  const handleSubmit = () => {
    if (answers.length < 2) {
      toast.error("atleast two answers have to exist");
      return;
    }
    handleAddQuestion({ id: uuidv4(), answers: answers, ...question });
    setAddingQuestion(false);
  };
  const handleEditAnswerSubmit = (answer) => {
    setAnswers(answers.map((ans) => (ans.id === answer.id ? answer : ans)));
  };
  const handleDeleteAnswer = (id) =>
    setAnswers(answers.filter((ans) => ans.id !== id));
  return (
    <div style={{ borderBottom: "2px solid black", marginBottom: "20px" }}>
      <div className="flex-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "20px",
          }}
        >
          <TextField
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            type={"text"}
            label="Question"
            fullWidth
          />
          <TextField
            value={question.feedback_true}
            onChange={(e) =>
              setQuestion({ ...question, feedback_true: e.target.value })
            }
            type={"text"}
            label="Right FeedBack"
            fullWidth
          />
          <TextField
            value={question.feedback_false}
            onChange={(e) =>
              setQuestion({ ...question, feedback_false: e.target.value })
            }
            type={"text"}
            label="Wrong FeedBack"
            fullWidth
          />
        </div>
        <SaceCancel
          savefn={handleSubmit}
          cancelfn={() => setAddingQuestion(false)}
        />
      </div>
      <br />
      {!addAnswer && (
        <div
          className="flex-center"
          onClick={() => question && setAddAnswer(true)}
        >
          Add Answer
          <span>
            <Add />
          </span>
        </div>
      )}
      {addAnswer && (
        <div className="flex-center">
          <TextField
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            type={"text"}
            label="Answer"
            fullWidth
          />

          <FormGroup style={{ margin: "20px" }}>
            <FormControlLabel
              control={
                <Switch
                  value={rightAns ? true : false}
                  onChange={() => setRightAns(!rightAns)}
                  disabled={answers?.find((ans) => ans?.is_true)}
                />
              }
              label={<ThumbUpAltSharp />}
            />
          </FormGroup>
          <SaceCancel
            savefn={() => {
              setAnswers([
                ...answers,
                { text: answer, id: uuidv4(), is_true: rightAns },
              ]);
              setAddAnswer(false);
              setAnswer("");
              setRightAns(false);
            }}
            cancelfn={() => setAddAnswer(false)}
          />
        </div>
      )}
      <div onMouseLeave={() => setQuestionHover("")}>
        {answers?.map((ans, i) => (
          <div
            style={{ justifyContent: "flex-start", gap: "50px" }}
            className="flex-center"
            key={i}
          >
            <SingleAnswer
              setAnswerEdit={setAnswerEdit}
              i={i}
              ans={ans}
              setQuestionHover={setQuestionHover}
              questionHover={questionHover}
              answerEdit={answerEdit}
              handleDeleteAnswer={handleDeleteAnswer}
              handleEditAnswerSubmit={handleEditAnswerSubmit}
            />
          </div>
        ))}
      </div>
      <br />
    </div>
  );
};

export default AddingQuestion;
