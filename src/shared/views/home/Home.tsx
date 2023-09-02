import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/page/Page';
import trackEvent from '@/shared/utils/ga-tracking';
import Features from './components/Features';
import Header from './components/Header';
import Steps from './components/Steps';
import ContactUs from './contact-us/ContactUs';
import Login from './login/Login';
import Roadmap from './roadmap/Roadmap';
import Signup from './signup/Signup';

const GuestRouter = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page initialState={initialState} device={device} withNavbar flow="guest">
      <Routes>
        <Route path="/" element={<Home device={device} />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Page>
  );
};

const Home = ({ device }: { device: IDevice }) => {
  useEffect(() => {
    trackEvent('page_view', { title: 'home' });
  }, []);

  return (
    <>
      <Header device={device} />
      <Features />
      <Steps />
    </>
  );
};

export default GuestRouter;
