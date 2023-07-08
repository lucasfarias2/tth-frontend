import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { analytics } from '@/config/firebase';
import Page from '@/shared/components/page/Page';
import Features from './components/Features';
import Header from './components/Header';
import Steps from './components/Steps';
import ContactUs from './contact-us/ContactUs';
import Login from './login/Login';
import Roadmap from './roadmap/Roadmap';
import Signup from './signup/Signup';

const GuestRouter = (props: IViewProps) => {
  const { device, initialState } = props;

  useEffect(() => {
    if (analytics)
      logEvent(analytics, 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: 'Home',
      });
  }, []);

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
  return (
    <>
      <Header device={device} />
      <Features />
      <Steps />
    </>
  );
};

export default GuestRouter;
