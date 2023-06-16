import renderComponent from '@/server/renderComponent';
import Login from '@/shared/views/login/Login';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Login, url, props);
}
