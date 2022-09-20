import React, { createContext, useContext, useMemo, useState } from "react";
import jsonData from "../givenJSON.json";
import { v4 as uuidv4 } from "uuid";

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const [quizes, setQuizes] = useState([jsonData]);
  const addQuiz = (quiz) => {
    setQuizes([
      ...quizes,
      {
        created: new Date().toDateString(),
        description: quiz.description,
        id: uuidv4(),
        modified: "",
        questions: quiz.questions,
        score: null,
        title: quiz.title,
        url: quiz.url,
      },
    ]);
  };
  const editQuiz = (quiz) => {
    setQuizes([...quizes, { ...quiz, modified: new Date().toDateString() }]);
  };
  const values = useMemo(
    () => ({
      quizes,
      addQuiz,
      editQuiz,
    }),
    [quizes]
  );

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw Error("useQuiz should be used within <QuizProvider />");
  return context;
};
