import { useCallback, FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { translate } from '@waldur/i18n';
import { closeModalDialog } from '@waldur/modal/actions';

import { GroupInvitationButtons } from './GroupinvitationButtons';
import { GroupInvitationMessage } from './GroupInvitationMessage';

export const GroupInvitationsConfirmDialog: FunctionComponent<{
  resolve: { token; deferred };
}> = ({ resolve: { deferred } }) => {
  const dispatch = useDispatch();

  const close = useCallback(() => dispatch(closeModalDialog()), [dispatch]);

  const dismiss = useCallback(() => {
    deferred.reject();
    close();
  }, [close, deferred]);

  const acceptRequest = useCallback(() => {
    close();
    deferred.resolve(true);
  }, [close, deferred]);

  const rejectRequest = useCallback(() => {
    close();
    deferred.resolve(false);
  }, [close, deferred]);

  return (
    <>
      <ModalHeader>
        <ModalTitle>{translate('Request confirmation')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <GroupInvitationMessage />
      </ModalBody>
      <ModalFooter>
        <GroupInvitationButtons
          dismiss={dismiss}
          acceptRequest={acceptRequest}
          rejectRequest={rejectRequest}
        />
      </ModalFooter>
    </>
  );
};
