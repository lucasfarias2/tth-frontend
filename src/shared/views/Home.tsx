import { Route, Routes } from 'react-router-dom';
import Page from '@/shared/components/Page';

const Router = (props: IViewProps) => {
  const { device, initialState } = props;

  return (
    <Page initialState={initialState} device={device}>
      <Routes>
        <Route path="/" element={<Home device={device} initialState={initialState} />} />
      </Routes>
    </Page>
  );
};

const Home = ({ device, initialState }: { device: IDevice; initialState: IInitialState }) => {
  return (
    <>
      <h1>{initialState.title}</h1>
      <h2>Home page</h2>
      <p>Current device: {device.type}</p>
    </>
  );
};

export default Router;
