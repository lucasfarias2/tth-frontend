import { renderComponent } from '../renderComponent';
import Home from '@/shared/views/Home';

// import { renderComponent } from './renderComponent';

export function render(url: string, props: IInitialState) {
  return renderComponent({ Component: Home, url, props, withRouter: true });
}
