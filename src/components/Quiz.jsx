import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectionAnswer = useCallback((selectedAnswer) => {
        setUserAnswers(prev => [...prev, selectedAnswer]);
    }, []);

    const handleSkipAnswer = useCallback(
        () => handleSelectionAnswer(null),
        [handleSelectionAnswer]
    );

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />;
    }

    // const currentQuestion = QUESTIONS[activeQuestionIndex];

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectionAnswer={handleSelectionAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}
