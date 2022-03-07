import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true); // for setup form
  const [loading, setLoading] = useState(true); //while fetching data
  const [questions, setQuestions] = useState([]); //data from API
  const [index, setIndex] = useState(0); //index to cycle through the questions
  const [correct, setCorrect] = useState(0); //for correct answers
  const [error, setError] = useState(false); //if data can't be retrieved
  const [isModalOpen, setIsModalOpen] = useState(false); //for modal

  //set up data fetching from api
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url).catch((err) => console.log(err));
    if (response) {
      const data = response.data.results;
      //if we get response and data back from the api
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        //if we get response but no data back,
        setWaiting(true);
        setError(true);
      }
    } else {
      //if no response from API
      setWaiting();
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        //openModal
        return 0;
      } else return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((correct) => correct + 1);
    }
    nextQuestion();
  };

  useEffect(() => {
    fetchQuestions(tempUrl);
  }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
