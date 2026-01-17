import type { NextPage } from 'next';
import Head from 'next/head';
import WeatherApp from './components/WeatherApp';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Lumina</title>
        <meta name="description" content="Next.js Glassmorphism Project" />
      </Head>

      <main>
        <WeatherApp />
      </main>
    </div>
  );
};

export default Home;