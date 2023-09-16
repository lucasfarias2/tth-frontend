import { renderComponent } from '@packlify/server';
import Backoffice from '@/shared/views/backoffice/BackofficeRouter';

export function render(url: string, props: { user: TTHUser }) {
  return renderComponent(Backoffice, url, props, true);
}
