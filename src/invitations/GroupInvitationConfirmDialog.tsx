import { useCallback, FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { translate } from '@waldur/i18n';
import { closeModalDialog } from '@waldur/modal/actions';

import { GroupInvitationButtons } from './GroupinvitationButtons';
import { GroupInvitationErrorMessage } from './GroupInvitationErrorMessage';
import { GroupInvitationMessage } from './GroupInvitationMessage';
import { InvitationService } from './InvitationService';

export const GroupInvitationsConfirmDialog: FunctionComponent<{
  resolve: { token; deferred };
}> = ({ resolve: { token, deferred } }) => {
  const dispatch = useDispatch();

  const close = useCallback(() => dispatch(closeModalDialog()), [dispatch]);

  const dismiss = useCallback(() => {
    deferred.reject();
    close();
  }, [close, deferred]);

  const submitRequest = useCallback(() => {
    close();
    deferred.resolve(true);
  }, [close, deferred]);

  const asyncResult = useAsync(() =>
    InvitationService.fetchGroupDetails(token).then(
      (response) => response.data,
    ),
  );

  const invitation = asyncResult.value;

  return (
    <>
      <ModalHeader>
        <ModalTitle>{translate('Request permission')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {asyncResult.loading && (
          <>
            <LoadingSpinner />
            <p className="text-center">
              {translate(
                'Please give us a moment to validate your invitation.',
              )}
            </p>
          </>
        )}
        {!asyncResult.loading &&
          (asyncResult.error ? (
            <GroupInvitationErrorMessage dismiss={dismiss} />
          ) : (
            <GroupInvitationMessage invitation={invitation} />
          ))}
      </ModalBody>
      <ModalFooter>
        {!asyncResult.loading && !asyncResult.error && (
          <GroupInvitationButtons
            dismiss={dismiss}
            submitRequest={submitRequest}
          />
        )}
      </ModalFooter>
    </>
  );
};
