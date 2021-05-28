import * as functions from 'firebase-functions';
import { getAnswerById, getQuestionById, initializeApp, reject } from './helpers';

const { db, main } = initializeApp();

main.get('/questions', async (_, res) => {
    try {
        const questionsDoc = await db.collection('questions').get();
        const questions = questionsDoc.docs;
        res.send(questions);
    } catch (e) {
        reject(res, e);
    }
});

main.get('/question/:questionId', async (req, res) => {
    try {
        const question = await getQuestionById(db, req.params.questionId);
        res.send(question);
    } catch (e) {
        reject(res, e);
    }
});

main.post('/validate/:questionId', async (req, res) => {
    try {
        const {
            params: { questionId },
            body: { answer },
        } = req;

        const question = await getAnswerById(db, questionId);
        const isValid = question.answer === answer;

        res.send({ isValid });
    } catch (e) {
        reject(res, e);
    }
});

export const api = functions.https.onRequest(main);
