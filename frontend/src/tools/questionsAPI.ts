import axios from 'axios';
import { Question } from '../types';
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
    validate: async (questionId: string, answer: string): Promise<boolean> => {
        const response = await axios.post(`${FIREBASE_URL}/validate/${questionId}`, {
            answer,
        });

        return response.data.isValid as boolean;
    },
};
