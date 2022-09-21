import { Add, ThumbUpAltSharp } from "@mui/icons-material";
import { Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import SaceCancel from "../SaveCancel/SaceCancel";
import { v4 as uuidv4 } from "uuid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import SingleAnswer from "../SingleAnswer/SingleAnswe";
import DialogTitle from "@mui/material/DialogTitle";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const AddingQuestion = ({
  setAddingQuestion,
  handleAddQuestion,
  addingQuestion,
}) => {
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

  const isThereEaxctlyOneAnswer = () =>
    answers.find((ans) => ans.is_true) ? true : false;

  const handleEditAnswerSubmit = (answer) =>
    setAnswers(answers.map((ans) => (ans.id === answer.id ? answer : ans)));

  const handleDeleteAnswer = (id) =>
    setAnswers(answers.filter((ans) => ans.id !== id));

  const handleSubmit = () => {
    if (answers.length < 2 || !question?.text) {
      toast.error("atleast two answers have to exist");
      return;
    }
    if (!isThereEaxctlyOneAnswer()) {
      toast.error("one of the answers have to be coorect !");
      return;
    }
    handleAddQuestion({ id: uuidv4(), answers: answers, ...question });
    setAddingQuestion(false);
  };
  return (
    <Dialog
      className="dialouge_container"
      onClose={() => setAddingQuestion(false)}
      open={addingQuestion}
    >
      <DialogTitle className="dialougeHeader">
        <div>Add a new Question</div>
        <SaceCancel
          savefn={handleSubmit}
          cancelfn={() => setAddingQuestion(false)}
        />
      </DialogTitle>

      <div style={{ borderBottom: "2px solid black", marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            type={"text"}
            label="Question"
          />
          <TextField
            value={question.feedback_true}
            onChange={(e) =>
              setQuestion({ ...question, feedback_true: e.target.value })
            }
            type={"text"}
            label="Correct FeedBack"
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
                label={<DoneAllOutlinedIcon />}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onMouseLeave={() => setQuestionHover("")}
        >
          {answers?.map((ans, i) => (
            <SingleAnswer
              i={i}
              ans={ans}
              setQuestionHover={setQuestionHover}
              questionHover={questionHover}
              handleDeleteAnswer={handleDeleteAnswer}
              handleEditAnswerSubmit={handleEditAnswerSubmit}
              key={i}
            />
          ))}
        </div>
        <br />
      </div>
    </Dialog>
  );
};

export default AddingQuestion;
