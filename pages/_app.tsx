import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Store } from 'redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { AppInitialProps, AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';

import configureStore from '../redux/configureStore';
import { TRootState } from '@redux/rootReducer';

type Props = { store: Store<TRootState> } & AppInitialProps & AppProps;

type AppPage<P = {}> = {
  (props: P): JSX.Element | null;
  getInitialProps: ({ Component, ctx }: AppContext) => Promise<AppInitialProps>;
};

const App: AppPage<Props> = ({ store, pageProps, Component }) => {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Best runner</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: { ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}) },
  };
};
export default withRedux(configureStore)(withReduxSaga(App));

