import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import Features from './components/Features';
import Header from './components/Header';
import Steps from './components/Steps';
import ContactUs from './contact-us/ContactUs';
import Roadmap from './roadmap/Roadmap';

const HomeRouter = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page className="" initialState={initialState} device={device} withNavbar inRouter>
      <Routes>
        <Route path="/" element={<Home device={device} />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Page>
  );
};

const Home = ({ device }: { device: IDevice }) => {
  return (
    <>
      <Header device={device} />
      <Features />
      <Steps />
    </>
  );
};

export default HomeRouter;
