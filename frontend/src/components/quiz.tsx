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
import { Answer, Question } from '../types';

export type QuestionCardProps = Question & {
    number: number;
    answers:
        | {
              [id: string]: boolean;
          }
        | {};
    loading: boolean;
    next: (answer: string) => void;
};

export default () => {
    const history = useHistory();
    const { questions, answers, setAnswers } = useAppState();
    const [loading, setLoading] = React.useState(false);

    const handleNext = async (question: Question, answer: string) => {
        setLoading(true);
        const questionIndex = questions.findIndex(({ id }) => id === question.id);
        const isValid = await questionsAPI.validate(question.id, answer);
        setAnswers((answers: Answer) => ({
            ...answers,
            [question.id]: isValid,
        }));
        setLoading(false);
        if (questions.length === questionIndex + 1) history.push(`/results`);
        else history.push(`/quiz/${questions[questionIndex + 1].id}`);
    };

    return (
        <Center h="80vh">
            <Box pos="relative" w="30%">
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
            </Box>
        </Center>
    );
};

const QuestionCard = ({ number, choices, next, id, loading, question }: QuestionCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState<string>('');
    const handleChange = (next: string | number) => setSelectedAnswer(next.toString());

    const match = useRouteMatch<{ questionId: string }>();
    const questionId = match.params?.questionId;
    return (
        <>
            {questionId === id && (
                <SlideFade in={questionId === id} offsetY="20px">
                    <Box minW="lg" pos="absolute" borderWidth="1px" borderRadius="lg" p="8" shadow="lg">
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
