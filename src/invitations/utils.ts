import { AuthService } from '@waldur/auth/AuthService';
import { lazyComponent } from '@waldur/core/lazyComponent';
import { createDeferred } from '@waldur/core/utils';
import { translate } from '@waldur/i18n';
import { openModalDialog } from '@waldur/modal/actions';
import { router } from '@waldur/router';
import { showError, showSuccess } from '@waldur/store/notify';
import store from '@waldur/store/store';

import { InvitationService } from './InvitationService';
import { clearInvitationToken, setInvitationToken } from './InvitationStorage';

const InvitationConfirmDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InvitationConfirmDialog" */ './InvitationConfirmDialog'
    ),
  'InvitationConfirmDialog',
);

const GroupInvitationsConfirmDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "GroupInvitationsConfirmDialog" */ './GroupInvitationsConfirmDialog'
    ),
  'GroupInvitationsConfirmDialog',
);

export function checkAndAccept(token, invitationType = '') {
  /*
     Call confirm token dialog, accept it and redirect user to profile.
     If user is not logged in - set token and redirect user to registration.
     If user is logged in and token is not valid - clear the token and redirect to user profile with the error message.
     */
  if (AuthService.isAuthenticated()) {
    if (invitationType === 'user-group-request') {
      return confirmInvitation(token, invitationType)
        .then((accept) => {
          if (accept) {
            acceptGroupRequest(token).then(() => {
              router.stateService.go('profile.details');
            });
          } else {
            rejectGroupRequest(token).then(() => {
              router.stateService.go('profile.details');
            });
          }
        })
        .catch(() => {
          router.stateService.go('profile.details');
        });
    } else {
      return confirmInvitation(token, invitationType)
        .then((replaceEmail) => {
          acceptInvitation(token, replaceEmail).then(() => {
            router.stateService.go('profile.details');
          });
        })
        .catch(() => {
          clearInvitationToken();
          store.dispatch(
            showError(translate('Invitation is not valid anymore.')),
          );
          router.stateService.go('profile.details');
        });
    }
  } else {
    setInvitationToken(token);
    router.stateService.go('login');
  }
}

export function acceptInvitation(token, replaceEmail) {
  return InvitationService.accept(token, replaceEmail)
    .then(() => {
      store.dispatch(showSuccess(translate('Your invitation was accepted.')));
      clearInvitationToken();
      // TODO: Invalidate customers list
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        store.dispatch(showError(translate('Invitation is not found.')));
      } else if (response.status === 400) {
        clearInvitationToken();
        store.dispatch(showError(translate('Invitation is not valid.')));
      } else if (response.status === 500) {
        store.dispatch(
          showError(
            translate(
              'Internal server error occurred. Please try again or contact support.',
            ),
          ),
        );
      }
    });
}

export function acceptGroupRequest(token) {
  return InvitationService.acceptRequest(token)
    .then(() => {
      store.dispatch(showSuccess(translate('Your invitation was accepted.')));
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        store.dispatch(showError(translate('Invitation is not found.')));
      } else if (response.status === 400) {
        store.dispatch(showError(translate('Invitation is not valid.')));
      } else if (response.status === 500) {
        store.dispatch(
          showError(
            translate(
              'Internal server error occurred. Please try again or contact support.',
            ),
          ),
        );
      }
    });
}

export function rejectGroupRequest(token) {
  return InvitationService.rejectRequest(token)
    .then(() => {
      store.dispatch(showSuccess(translate('Your invitation was rejected.')));
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        store.dispatch(showError(translate('Invitation is not found.')));
      } else if (response.status === 400) {
        store.dispatch(showError(translate('Invitation is not valid.')));
      } else if (response.status === 500) {
        store.dispatch(
          showError(
            translate(
              'Internal server error occurred. Please try again or contact support.',
            ),
          ),
        );
      }
    });
}

export function confirmInvitation(token, invitationType) {
  const deferred = createDeferred();
  store.dispatch(
    openModalDialog(
      invitationType === 'user-group-request'
        ? GroupInvitationsConfirmDialog
        : InvitationConfirmDialog,
      {
        resolve: {
          token,
          deferred,
        },
        backdrop: 'static',
      },
    ),
  );
  return deferred.promise;
}
