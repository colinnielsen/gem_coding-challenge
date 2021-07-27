import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Heading,
    HStack,
    IconButton,
    Radio,
    RadioGroup,
    SlideFade,
    Spacer,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppState } from '../state/appState';
import questionsAPI from '../tools/questionsAPI';
import { Answer, Question, QuestionCardProps } from '../types';
import { calculateScore } from '../utils';

export default () => {
    const history = useHistory();
    const { questions, answers, setAnswers } = useAppState();
    const [loading, setLoading] = React.useState(false);

    const finishTest = async () => {
        setLoading(true);
        const validation = await questionsAPI.validate(answers);
        const score = calculateScore(questions, validation);
        window.localStorage.setItem('score', String(score));
        setLoading(false);
        history.push(`/results`);
    };

    const nextQuestion = (nextId: string) => {
        history.push(`/quiz/${nextId}`);
    };

    const handleNext = (question: Question, answer: string) => {
        setAnswers((answers: Answer[]) => [...answers, { id: question.id, answer }]);
        const questionIndex = questions.findIndex(({ id }) => id === question.id);
        if (questions.length === questionIndex + 1) finishTest();
        else nextQuestion(questions[questionIndex + 1].id);
    };

    return (
        <Center h="80%" w="100%">
            {questions.map((question: Question, i) => (
                <QuestionCard
                    number={i + 1}
                    loading={loading}
                    key={question.id}
                    answers={answers}
                    next={answer => handleNext(question, answer)}
                    {...questions[i]}
                />
            ))}
        </Center>
    );
};

const QuestionCard = ({ number, choices, next, id, loading, question }: QuestionCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState<string>('');
    const handleChange = (next: string | number) => setSelectedAnswer(String(next));

    const match = useRouteMatch<{ questionId: string }>();
    const questionId = match.params?.questionId;

    return (
        <>
            {questionId === id && (
                <SlideFade in={questionId === id} offsetY="20px">
                    <Box minW="lg" borderWidth="1px" borderRadius="lg" p="8" shadow="lg">
                        <Heading>Question #{number}</Heading>
                        <VStack spacing="8">
                            <Text>{question}</Text>
                            <RadioGroup onChange={handleChange} value={selectedAnswer}>
                                <Stack>
                                    {choices.map(({ label, value }) => (
                                        <Radio size="lg" value={label} key={label}>
                                            {label}: {value}
                                        </Radio>
                                    ))}
                                </Stack>
                            </RadioGroup>
                        </VStack>
                        <HStack>
                            <Spacer />
                            <IconButton
                                isDisabled={!selectedAnswer}
                                isLoading={loading}
                                icon={<ArrowForwardIcon />}
                                aria-label="next"
                                onClick={() => next(selectedAnswer)}
                            />
                        </HStack>
                    </Box>
                </SlideFade>
            )}
        </>
    );
};
