import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../state/appState';
import { Answer, Question } from '../types';

const calculateScore = (questions: Question[], answers: Answer | {}): number => {
    const totalTrue = Object.values(answers).reduce((total, answer) => (answer ? (total += 1) : total), 0);
    return Math.round((totalTrue / questions.length) * 100);
};

export default () => {
    const { questions, answers } = useAppState();
    const score = calculateScore(questions, answers);
    const nailedIt = score === 100;
    const history = useHistory();

    return (
        <Center h="80vh">
            <VStack>
                {nailedIt ? <Heading>Nailed it 🎉🎉🎉</Heading> : <Heading>Not quite 😕</Heading>}
                <Heading>Your score: {score}</Heading>
                <Button onClick={() => history.push('/')}>
                    {!nailedIt ? "Let's try again?" : 'One more for the books!'}
                </Button>
            </VStack>
        </Center>
    );
};
