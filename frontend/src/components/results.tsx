import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const score = window.localStorage.getItem('score');
    const nailedIt = score === '100';
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
