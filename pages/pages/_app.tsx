import '../styles/globals.css'; // Make sure Tailwind directives are in this file
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;