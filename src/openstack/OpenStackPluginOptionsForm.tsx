import * as React from 'react';

import { FormContainer, SelectField} from '@waldur/form-react';
import { translate } from '@waldur/i18n';

export const OpenStackPluginOptionsForm = ({ container, locale }) => {
  const STORAGE_MODE_OPTIONS = React.useMemo(() => [
    {
      label: translate('Fixed'),
      value: 'fixed',
    },
    {
      label: translate('Dynamic'),
      value: 'dynamic',
    },
  ], locale);

  return (
    <FormContainer {...container}>
      <SelectField
        name="storage_mode"
        label={translate('Storage mode')}
        options={STORAGE_MODE_OPTIONS}
        simpleValue={true}
        required={true}
      />
    </FormContainer>
  );
};
