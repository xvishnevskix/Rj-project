import Head from 'next/head';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';


import { Header } from '../components/Header';
import { theme } from '../theme';

import '../styles/globals.scss';
import { Provider } from 'react-redux'
import {store, wrapper } from '../redux/store'


import 'macro-css';
import React from 'react';
import { AppProps } from 'next/dist/shared/lib/router/router';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>RJournal</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />

                <Header />
                <Component {...pageProps} />
            </MuiThemeProvider>
        </>
    );
}

export default wrapper.withRedux(App);
