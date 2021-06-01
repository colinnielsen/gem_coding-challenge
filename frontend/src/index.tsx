import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { render } from 'react-dom';

render(<ChakraProvider theme={theme}>helllloooo</ChakraProvider>, document.getElementById('app'));
