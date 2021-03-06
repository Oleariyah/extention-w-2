import Axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';

import { PROJECT_MANAGER_ROLE } from '@waldur/core/constants';
import { translate } from '@waldur/i18n';
import { showErrorResponse, showSuccess } from '@waldur/store/notify';
import { ActionButton } from '@waldur/table/ActionButton';

interface UserRemoveButtonProps {
  user: any;
  isProjectManager: boolean;
  refreshList;
}

export const UserRemoveButton: React.FC<UserRemoveButtonProps> = ({
  user,
  isProjectManager,
  refreshList,
}) => {
  const dispatch = useDispatch();
  const callback = async () => {
    try {
      await Axios.delete(user.permission);
      refreshList();
      dispatch(showSuccess(translate('Team member has been removed.')));
    } catch (e) {
      dispatch(
        showErrorResponse(e, translate('Unable to delete team member.')),
      );
    }
  };
  return (
    <ActionButton
      disabled={isProjectManager && user.role === PROJECT_MANAGER_ROLE}
      tooltip={
        isProjectManager && user.role === PROJECT_MANAGER_ROLE
          ? translate('Project manager cannot edit users with same role.')
          : ''
      }
      action={callback}
      title={translate('Remove')}
      icon="fa fa-trash"
    />
  );
};
