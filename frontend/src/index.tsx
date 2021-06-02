import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { AppState } from './state/appState';

render(
    <AppState>
            <BrowserRouter>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </AppState>,
    document.getElementById('app'),
);
