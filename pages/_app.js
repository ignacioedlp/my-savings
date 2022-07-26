import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../context/store';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
