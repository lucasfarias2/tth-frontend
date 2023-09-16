import { renderComponent } from '@packlify/server';
import Home from '@/shared/views/home/Home';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Home, url, props, true);
}
