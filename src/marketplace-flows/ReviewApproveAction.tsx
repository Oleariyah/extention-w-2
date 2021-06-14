import { translate } from '@waldur/i18n';
import { DialogActionButton } from '@waldur/resource/actions/DialogActionButton';

import { ReviewDialog } from './ReviewDialog';

export const ReviewApproveAction = ({ request, refreshList, apiMethod }) =>
  request.state === 'pending' ? (
    <DialogActionButton
      title={translate('Approve')}
      icon="fa fa-check text-info"
      resource={request}
      modalComponent={ReviewDialog}
      extraResolve={{
        refreshList,
        apiMethod,
      }}
    />
  ) : null;
