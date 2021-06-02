import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Fade,
    Heading,
    HStack,
    IconButton,
    Radio,
    RadioGroup,
    SlideFade,
    Spacer,
    Stack,
    VStack,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppState } from '../state/appState';
import { Question } from '../types';

export type QuestionCardProps = Question & {
    number: number;
    next: () => void;
};

export default () => {
    const { questions } = useAppState();
    const history = useHistory();

    return (
        <Center h="80vh">
            <Box pos="relative" w="30%">
                {questions.map((question: Question, i) => (
                    <QuestionCard
                    number={i + 1}
                    key={question.id}
                    next={() => {
                        console.log(i);
                        
                        history.push(`/quiz/${questions[i].id}`);
                    }}
                    {...question}
                    />
                ))}
            </Box>
        </Center>
    );
};

const QuestionCard = ({ number, choices, next, id }: QuestionCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = React.useState('');
    const handleChange = (answer: ChangeEvent<HTMLInputElement>) => setSelectedAnswer(answer)
    const match = useRouteMatch<{ questionId: string }>();
    const questionId = match.params?.questionId;

    return (
        <SlideFade in={questionId === id} offsetY="20px">
            <Box minW="lg" pos="absolute" borderWidth="1px" borderRadius="lg" p='8' shadow='lg'>
                <VStack spacing="8">
                    <Heading>Question #{number}</Heading>
                    <RadioGroup onChange={handleChange} value={selectedAnswer}>
                        <Stack>
                            {choices.map(({ label, value }) => (
                                <Radio size='lg' value={label} key={label}>
                                    {(selectedAnswer === label).toString()}
                                    {label}: {value}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </VStack>
                <HStack>
                    <Spacer />
                    <Fade in={!!selectedAnswer}>
                        <IconButton icon={<ArrowForwardIcon />} aria-label="next" onClick={next} />
                    </Fade>
                </HStack>
            </Box>
        </SlideFade>
    );
};
