import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section class="quiz quiz-small">
        <h2>Setup Quiz</h2>
        <form className="setup-form">
          {/*amount*/}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleChange}
              value={quiz.amount} //default value
              className="form-input"
              min={1}
              max={50}
            />
          </div>
          {/*category*/}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={quiz.category} //default value
              className="form-input"
            >
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          {/*difficulty*/}
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={handleChange}
              value={quiz.difficulty} //default value
              className="form-input"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>

          {/*Set up error */}
          {error && (
            <p className="error">
              can't generate questions, please try different options.
            </p>
          )}
          <button type="submit" onClick={handleSubmit} className="submit-btn">
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
