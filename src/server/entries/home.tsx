import Home from '@/shared/views/Home';
import { renderComponent } from '@packlify/core/server';

export function render(url: string, props: IInitialState) {
  return renderComponent({ Component: Home, url, props, withRouter: true });
}
