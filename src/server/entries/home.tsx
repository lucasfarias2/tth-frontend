import { renderComponent } from '@packlify/server';
import Home from '@/shared/views/Home';

export function render(url: string, props: IInitialState) {
  return renderComponent(Home, url, props, true);
}
