import { useRef } from "react";

export default function Answers({
    answers,
    selectedAnswer,
    answerState,
    correctAnswer,
    onSelect
}) {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                let cssClasses = "";
                const isSelected = selectedAnswer === answer;

                // الحالة المختارة
                if (answerState === "answered" && isSelected) {
                    cssClasses = "selected";
                }

                // الحالة الصحيحة أو الخاطئة
                if ((answerState === "correct" || answerState === "wrong") && answer === correctAnswer && answerState === "correct") {
                    cssClasses = "correct";
                } else if (answerState === "wrong" && isSelected) {
                    cssClasses = "wrong";
                }

                return (
                    <li key={answer} className="answer">
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClasses}
                            disabled={answerState !== ""}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
