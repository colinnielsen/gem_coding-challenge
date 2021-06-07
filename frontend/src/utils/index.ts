import { Question, Validation } from '../types';

export const calculateScore = (questions: Question[], answers: Validation): number => {
    const totalTrue = Object.values(answers).reduce((total, answer) => (answer ? (total += 1) : total), 0);
    return Math.round((totalTrue / questions.length) * 100);
};
