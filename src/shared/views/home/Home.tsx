import Page from '@/shared/components/page/Page';
import Features from './components/Features';
import Header from './components/Header';
import Steps from './components/Steps';

const Home = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page className="md:px-16 2xl:px-48" initialState={initialState} device={device} withNavbar>
      <Header device={device} />
      <Features />
      <Steps />
    </Page>
  );
};

export default Home;
