import { Button } from 'react-bootstrap';

import { translate } from '@waldur/i18n';

export const GroupInvitationButtons = ({ dismiss, acceptRequest }) => (
  <>
    <Button bsStyle="primary" onClick={acceptRequest}>
      {translate('Accept Request')}
    </Button>
    <Button onClick={dismiss}>{translate('Cancel Request')}</Button>
  </>
);
