import React from 'react';
import questionsAPI from '../tools/questionsAPI';
import { Answer, Question } from '../types';

type AppState = {
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    answers: Answer[];
    setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
};
const initialState: AppState = {
    questions: [],
    setQuestions: () => undefined,
    answers: [],
    setAnswers: () => undefined,
};
const AppContext = React.createContext<AppState>(initialState);

export const AppState = ({ children }: { children: JSX.Element }) => {
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [answers, setAnswers] = React.useState<Answer[]>([]);

    React.useEffect(() => {
        questionsAPI.getQuestions().then(setQuestions).catch(console.error);
    }, []);

    return (
        <AppContext.Provider value={{ questions, setQuestions, answers, setAnswers }}>{children}</AppContext.Provider>
    );
};

export const useAppState = () => {
    return React.useContext(AppContext);
};
