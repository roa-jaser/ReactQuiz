import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import { useState } from 'react';
import QUESTIONS from '../questions.js';

export default function Question({
    index,
    onSelectionAnswer,
    onSkipAnswer
}) {
    const [answer, setAnswer] = useState({
        selectionAnswer: '',
        isCorrect: null
    });

    let timer = 10000;
    if (answer.selectionAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(selected) {
        setAnswer({
            selectionAnswer: selected,
            isCorrect: null
        });
        setTimeout(() => {
            setAnswer({
                selectionAnswer: selected,
                isCorrect: QUESTIONS[index].answers[0] === selected
            });
            setTimeout(() => {
                onSelectionAnswer(selected);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectionAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectionAnswer) {
        answerState = 'answered';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                mode={answerState}
                timeout={timer}
                onTimeOut={answer.selectionAnswer === '' ? onSkipAnswer : undefined}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectionAnswer}
                answerState={answerState}
                correctAnswer={QUESTIONS[index].answers[0]}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}
