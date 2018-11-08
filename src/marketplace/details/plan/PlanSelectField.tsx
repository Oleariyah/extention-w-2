import * as React from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { required } from '@waldur/core/validators';
import { Plan } from '@waldur/marketplace/types';

interface PlanSelectFieldProps {
  plans: Plan[];
}

export const PlanSelectField = (props: PlanSelectFieldProps) => (
  <Field
    name="plan"
    validate={required}
    required={true}
    component={fieldProps => (
      <Select
        value={fieldProps.input.value}
        onChange={value => fieldProps.input.onChange(value)}
        labelKey="name"
        valueKey="url"
        options={props.plans}
        clearable={false}
      />
    )}
  />
);
