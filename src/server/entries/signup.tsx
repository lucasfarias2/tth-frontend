import renderComponent from '@/server/renderComponent';
import Signup from '@/shared/views/signup/Signup';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Signup, url, props);
}
