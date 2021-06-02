import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Quiz from './components/quiz';
import Results from './components/results';
import { useAppState } from './state/appState';

export default () => {
    const { questions } = useAppState();

    if (!questions.length) {
        return (
            <Center h="60vh">
                <Spinner />
            </Center>
        );
    }

    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/quiz/:questionId">
                <Quiz />
            </Route>
            <Route path="/results/">
                <Results />
            </Route>
        </Switch>
    );
};
