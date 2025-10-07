import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from '../questions';

export default function Summary({ userAnswers }) {
    const skippedAnswer = userAnswers.filter(answer => answer === null);
    const correctAnswer = userAnswers.filter(
        (answer, index) => answer === QUESTIONS[index].answers[0]
    );

    const skipAnswerShare = Math.round((skippedAnswer.length / userAnswers.length) * 100);
    const correctAnswerShare = Math.round((correctAnswer.length / userAnswers.length) * 100);
    const wrongAnswerShare = 100 - skipAnswerShare - correctAnswerShare;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Quiz Complete" />
            <h2>Quiz Complete!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skipAnswerShare}%</span>
                    <span className="text"> skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswerShare}%</span>
                    <span className="text"> answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswerShare}%</span>
                    <span className="text"> answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClasses = 'user-answer';
                    if (answer === null) {
                        cssClasses += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClasses += ' correct';
                    } else {
                        cssClasses += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className="question">{QUESTIONS[index].text}</p>
                            <p className={cssClasses}>{answer ?? 'Skipped'}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
