import { Heading, Link, VStack } from '@chakra-ui/layout';
import { Box, Button, Center } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAppState } from '../state/appState';

export default () => {
    const { questions } = useAppState();
    const history = useHistory();
    const handleClick = () => history.push(`/quiz/${questions[0].id}`); // push state to the first question

    return (
        <Center h="80vh">
            <VStack spacing="8">
                <Heading>Welcome to the 🎉 Green Egg Quiz Game 🎉</Heading>
                <Box>
                    <Button isLoading={!questions.length} onClick={handleClick}>
                        Click to begin 👀
                    </Button>
                </Box>
            </VStack>
        </Center>
    );
};
