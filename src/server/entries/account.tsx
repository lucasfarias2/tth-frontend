import renderComponent from '@/server/renderComponent';
import Account from '@/shared/views/account/Router';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Account, url, props, true);
}
