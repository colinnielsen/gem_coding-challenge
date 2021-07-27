import { Express } from 'express';
import { getAnswers, getQuestionById, initializeExpress, reject } from './helpers';
import { Answer, Validation } from './types';

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

    app.post('/validate', async (req, res) => {
        try {
            const {
                body: { answers: userAnswers },
            } = req;
            const answerData = await getAnswers(db);

            const validation = userAnswers.reduce((validation: Validation, { id, answer }: Answer) => {
                const isValid = answerData.find((answer: Answer) => answer.id === id).answer === answer;
                return { ...validation, [id]: isValid };
            }, {});

            res.send({ validation });
        } catch (e) {
            reject(res, e);
        }
    });
    return app;
};

export default runServer;
