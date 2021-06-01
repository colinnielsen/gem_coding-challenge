import { Express } from 'express';
import { getAnswerById, getQuestionById, initializeExpress, reject } from './helpers';

export type FirestoreDb = FirebaseFirestore.Firestore;

const runServer = (db: FirestoreDb): Express => {
    const app = initializeExpress();

    app.get('/questions', async (_, res) => {
        try {
            const questionsDoc = await db.collection('questions').get();
            const questions = questionsDoc.docs.map(question => ({ id: question.id, ...question.data() }));
            res.send(questions);
        } catch (e) {
            reject(res, e);
        }
    });

    app.get('/question/:questionId', async (req, res) => {
        try {
            const question = await getQuestionById(db, req.params.questionId);
            res.send(question.data());
        } catch (e) {
            reject(res, e);
        }
    });

    app.get('/answers', async (_, res) => {
        try {
            const answersDoc = await db.collection('answers').get();
            const answers = answersDoc.docs.map(question => ({ id: question.id, ...question.data() }));
            res.send(answers);
        } catch (e) {
            reject(res, e);
        }
    });

    app.post('/validate/:questionId', async (req, res) => {
        try {
            const {
                params: { questionId },
                body: { answer },
            } = req;
            const answerData = (await getAnswerById(db, questionId)).data();
            const isValid = answerData.answer === answer;

            res.send({ isValid });
        } catch (e) {
            reject(res, e);
        }
    });
    return app;
};

export default runServer;
