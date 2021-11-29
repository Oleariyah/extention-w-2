import { Button } from 'react-bootstrap';

import { translate } from '@waldur/i18n';

export const GroupInvitationButtons = ({ dismiss, submitRequest }) => (
  <>
    <Button bsStyle="primary" onClick={submitRequest}>
      {translate('Submit Request')}
    </Button>
    <Button onClick={dismiss}>{translate('Cancel Request')}</Button>
  </>
);
