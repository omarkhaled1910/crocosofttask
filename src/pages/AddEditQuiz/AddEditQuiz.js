import { Add } from "@mui/icons-material";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddingQuestion from "../../Components/AddingQuestion/AddingQuestion";
import SaceCancel from "../../Components/SaveCancel/SaceCancel";
import SingleQuestion from "../../Components/SingleQuestion/SingleQuestion";
import { useQuiz } from "../../QuizContext/quizContext";
import "./addquiz.css";

const deafultValues = {
  title: "",
  questions: [],
  url: "",
  description: "",
};

const AddEditQuiz = () => {
  const { id } = useParams(); // if id exist editing mode
  const { quizes, addQuiz, editQuiz } = useQuiz();
  const navigate = useNavigate();
  const [quiz, setQuiz] = React.useState(
    id ? quizes.find((quiz) => quiz.id == id) : { ...deafultValues }
  );

  const [addingQuestion, setAddingQuestion] = useState(false);
  const handleAddQuestion = (question) => {
    setQuiz({
      ...quiz,
      questions: [...quiz?.questions, question],
    });
  };
  const deleteAnswer = (id, questionId) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((qus) =>
        qus?.id === questionId
          ? { ...qus, answers: qus.answers.filter((ans) => ans.id !== id) }
          : qus
      ),
    });
  };
  const editAnswer = (newAnswer, questionId) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((qus) =>
        qus?.id === questionId
          ? {
              ...qus,
              answers: qus.answers.map((ans) =>
                ans.id === newAnswer?.id ? { ...newAnswer } : ans
              ),
            }
          : qus
      ),
    });
  };
  const handleQuestionDelete = (id) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((qus) => qus.id !== id),
    });
  };
  return (
    <>
      <div className="headercontainer">
        <h3> {id ? "Edit Quiz" : "Add Quiz"}</h3>
        <SaceCancel
          savefn={() => {
            if (!quiz.questions.length || !quiz.title) {
              toast.error(
                !quiz.title
                  ? "you have to enter a title"
                  : "you have to add a question"
              );
              return;
            }
            id ? editQuiz(quiz) : addQuiz(quiz);
            navigate("/");
          }}
          cancelfn={() => navigate("/")}
        />
      </div>
      <div className="quizforumContaine">
        <div className="quizinfocontainer">
          <h3>Quiz Info</h3>
          <div className="medium-width">
            <TextField
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              value={quiz?.title}
              label="Quiz Title"
              type={"text"}
              fullWidth
            ></TextField>
          </div>
          <div className="medium-width">
            <TextField
              onChange={(e) => setQuiz({ ...quiz, url: e.target.value })}
              value={quiz?.url}
              label="Quiz Url"
              type={"text"}
              fullWidth
            ></TextField>
          </div>
          <div className="medium-width">
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              placeholder="Quiz Descrioption goes here"
              style={{ width: "100% " }}
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
              value={quiz?.description}
            />
          </div>
        </div>
        <div className="quizquestionscontainer">
          <h3>Questions</h3>
          <Button
            style={{
              cursor: "pointer",
              width: "200px",
              textAlign: "center",
              marginBottom: "10px",
            }}
            onClick={() => setAddingQuestion(true)}
            className="flex-center "
          >
            Add New Question
            <span>
              <Add />
            </span>
          </Button>
          <div className="questions-container">
            {addingQuestion && (
              <AddingQuestion
                handleAddQuestion={handleAddQuestion}
                setAddingQuestion={setAddingQuestion}
                addingQuestion={addingQuestion}
              />
            )}
            {quiz?.questions?.map((quizdate, i) => (
              <SingleQuestion
                editAnswer={editAnswer}
                deleteAnswer={deleteAnswer}
                key={i}
                quiz={quizdate}
                handleQuestionDelete={handleQuestionDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditQuiz;
