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
  const [loading, setLoading] = useState(false); //while fetching data
  const [questions, setQuestions] = useState([]); //data from API
  const [index, setIndex] = useState(0); //index to cycle through the questions
  const [correct, setCorrect] = useState(0); //for correct answers
  const [error, setError] = useState(false); //if data can't be retrieved
  const [isModalOpen, setIsModalOpen] = useState(false); //for modal

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
