import React from 'react';
import questionsAPI from '../tools/questionsAPI';
import { Question } from '../types';

type AppState = { questions: Question[]; setQuestions: (questions: Question[]) => void };
const initialState: AppState = { questions: [], setQuestions: () => undefined };
const AppContext = React.createContext<AppState>(initialState);

export const AppState = ({ children }: { children: JSX.Element }) => {
    const [questions, setQuestions] = React.useState<Question[]>([]);
    React.useEffect(() => {
        questionsAPI.getQuestions().then(setQuestions).catch(console.error);
    }, []);

    return <AppContext.Provider value={{ questions: questions, setQuestions }}>{children}</AppContext.Provider>;
};

export const useAppState = () => {
    return React.useContext(AppContext);
};
