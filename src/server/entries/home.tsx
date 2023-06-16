import renderComponent from '@/server/renderComponent';
import Home from '@/shared/views/Home';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Home, url, props);
}
