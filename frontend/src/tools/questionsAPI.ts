import axios from 'axios';
import { Answer, Question, Validation } from '../types';
export const FIREBASE_URL = 'https://us-central1-gemcodinginterview.cloudfunctions.net/api';

export default {
    getQuestions: async (): Promise<Question[]> => {
        const response = await axios.get(`${FIREBASE_URL}/questions`);
        return response.data as Question[];
    },
    getQuestion: async (questionId: string): Promise<Question> => {
        const response = await axios(`${FIREBASE_URL}/question/${questionId}`);
        return response.data as Question;
    },
    validate: async (answers: Answer[]): Promise<Validation> => {
        const response = await axios.post(`${FIREBASE_URL}/validate/`, {
            answers,
        });

        return response.data as Validation;
    },
};
