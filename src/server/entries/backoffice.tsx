import renderComponent from '@/server/renderComponent';
import Backoffice from '@/shared/views/backoffice/BackofficeRouter';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Backoffice, url, props, true);
}
