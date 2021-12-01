import { FunctionComponent } from 'react';

import { formatDate } from '@waldur/core/dateUtils';
import { translate } from '@waldur/i18n';
import { Field } from '@waldur/resource/summary';
import { CreatedField } from '@waldur/resource/summary/CreatedField';
import { ResourceDetailsTable } from '@waldur/resource/summary/ResourceDetailsTable';

import { KeyValueButton } from './KeyValueButton';
import { MarketplaceResourceStateField } from './list/MarketplaceResourceStateField';
import { ResourceDetailsLink } from './ResourceDetailsLink';
import { Resource } from './types';

export const ResourceSummary: FunctionComponent<{ resource: Resource }> = ({
  resource,
}) => (
  <ResourceDetailsTable>
    <Field label={translate('Offering name')} value={resource.offering_name} />
    <Field
      label={translate('Client organization')}
      value={resource.customer_name}
    />
    <Field label={translate('Client project')} value={resource.project_name} />
    <Field label={translate('Category')} value={resource.category_title} />
    <Field label={translate('Plan')} value={resource.plan_name || 'N/A'} />
    <Field
      label={translate('Created')}
      value={<CreatedField resource={resource} />}
    />
    <Field
      label={translate('Termination date')}
      value={resource.end_date ? formatDate(resource.end_date) : null}
    />
    <Field
      label={translate('UUID')}
      value={resource.uuid}
      valueClass="ellipsis"
    />
    {resource.backend_id ? (
      <Field label={translate('Backend ID')} value={resource.backend_id} />
    ) : null}
    <Field
      label={translate('State')}
      value={<MarketplaceResourceStateField resource={resource} />}
    />
    <Field
      label={translate('Attributes')}
      value={
        Object.keys(resource.attributes).length > 0 && (
          <KeyValueButton items={resource.attributes} />
        )
      }
    />
    {resource.resource_uuid && resource.resource_type ? (
      <Field
        label={translate('Resource')}
        value={
          <ResourceDetailsLink item={resource}>
            {translate('Resource link')}
          </ResourceDetailsLink>
        }
      />
    ) : null}
  </ResourceDetailsTable>
);
