import { useCallback, useState } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@waldur/auth/SubmitButton';
import { ENV } from '@waldur/configs/default';
import { post } from '@waldur/core/api';
import {
  CUSTOMER_OWNER_ROLE,
  PROJECT_ADMIN_ROLE,
  PROJECT_MANAGER_ROLE,
} from '@waldur/core/constants';
import { required } from '@waldur/core/validators';
import {
  FormContainer,
  SelectField,
  StringField,
  TextField,
} from '@waldur/form';
import { AsyncSelectField } from '@waldur/form/AsyncSelectField';
import { reactSelectMenuPortaling } from '@waldur/form/utils';
import { translate } from '@waldur/i18n';
import { NOTIFICATION_CREATE_FORM_ID } from '@waldur/issues/notifications/constants';
import { NumberIndicator } from '@waldur/issues/notifications/NumberIndicator';
import {
  offeringsAutocomplete,
  organizationAutocomplete,
} from '@waldur/marketplace/common/autocompletes';
import { closeModalDialog } from '@waldur/modal/actions';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';
import { showErrorResponse, showSuccess } from '@waldur/store/notify';

import { projectAutocomplete } from './utils';

export const NotificationCreateDialog = reduxForm({
  form: NOTIFICATION_CREATE_FORM_ID,
})(({ submitting, invalid, handleSubmit }) => {
  const [fetchNumber, setFetchNumber] = useState<any>();
  const dispatch = useDispatch();

  const createNotification = useCallback(
    async (formData) => {
      try {
        const response = await post<{ emails: string[] }>('/notifications/', {
          subject: formData.subject,
          body: formData.body,
          query: {
            customers: formData.customers?.map((c) => c.uuid),
            projects: formData.projects?.map((c) => c.uuid),
            customer_roles: formData.customer_roles?.map((c) => c.value),
            project_roles: formData.project_roles?.map((c) => c.value),
            offerings: formData.offerings?.map((c) => c.uuid),
          },
        });
        dispatch(
          showSuccess(
            translate('Notifications has been sent to {count} users.', {
              count: response.data.emails.length,
            }),
          ),
        );
        dispatch(closeModalDialog());
      } catch (e) {
        dispatch(
          showErrorResponse(e, translate('Unable to create notifications.')),
        );
      }
    },
    [dispatch],
  );

  return (
    <form
      onSubmit={handleSubmit(createNotification)}
      onChange={(e) => setFetchNumber(e)}
    >
      <ModalHeader>
        <ModalTitle>{translate('Create a broadcast')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormContainer submitting={submitting}>
          <StringField
            name="subject"
            label={translate('Subject')}
            required={true}
            validate={required}
          />
          <TextField
            name="body"
            label={translate('Message')}
            required={true}
            validate={required}
          />
          <AsyncSelectField
            name="customers"
            label={translate('Organizations')}
            placeholder={translate('Select organizations...')}
            loadOptions={organizationAutocomplete}
            isMulti={true}
            {...reactSelectMenuPortaling()}
            onChange={(e) => setFetchNumber(e)}
          />
          <SelectField
            label={translate('Organization roles')}
            name="customer_roles"
            placeholder={translate('Select role')}
            options={[
              {
                label: translate('Owner'),
                value: CUSTOMER_OWNER_ROLE,
              },
              {
                label: translate('Support'),
                value: 'support',
              },
            ]}
            isMulti={true}
            noUpdateOnBlur={true}
            onChange={(e) => setFetchNumber(e)}
          />
          <AsyncSelectField
            name="projects"
            label={translate('Projects')}
            placeholder={translate('Select projects...')}
            loadOptions={(query, prevOptions, page) =>
              projectAutocomplete(query, prevOptions, page)
            }
            isMulti={true}
            {...reactSelectMenuPortaling()}
            onChange={(e) => setFetchNumber(e)}
          />
          <SelectField
            label={translate('Project roles')}
            name="project_roles"
            placeholder={translate('Select role')}
            options={[
              {
                label: translate(ENV.roles.manager),
                value: PROJECT_MANAGER_ROLE,
              },
              {
                label: translate(ENV.roles.admin),
                value: PROJECT_ADMIN_ROLE,
              },
            ]}
            isMulti={true}
            noUpdateOnBlur={true}
            onChange={(e) => setFetchNumber(e)}
          />
          <AsyncSelectField
            name="offerings"
            label={translate('Offerings')}
            placeholder={translate('Select offerings...')}
            loadOptions={(query, prevOptions, page) =>
              offeringsAutocomplete(
                { name: query, shared: true },
                prevOptions,
                page,
              )
            }
            isMulti={true}
            {...reactSelectMenuPortaling()}
            onChange={(e) => setFetchNumber(e)}
          />
        </FormContainer>
        <NumberIndicator shouldFetch={fetchNumber} />
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          block={false}
          label={translate('Create')}
          submitting={submitting}
          invalid={invalid}
        />
        <CloseDialogButton />
      </ModalFooter>
    </form>
  );
});
