import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isValid } from 'redux-form';

import { defaultCurrency } from '@waldur/core/formatCurrency';
import { Panel } from '@waldur/core/Panel';
import { formatFilesize } from '@waldur/core/utils';
import { isFeatureVisible } from '@waldur/features/connect';
import { translate } from '@waldur/i18n';
import { ShoppingCartButtonContainer } from '@waldur/marketplace/cart/ShoppingCartButtonContainer';
import { OfferingLogo } from '@waldur/marketplace/common/OfferingLogo';
import { RatingStars } from '@waldur/marketplace/common/RatingStars';
import { OfferingCompareButtonContainer } from '@waldur/marketplace/compare/OfferingCompareButtonContainer';
import { FORM_ID } from '@waldur/marketplace/details/constants';
import { OfferingDetailsProps } from '@waldur/marketplace/details/OfferingDetails';
import { pricesSelector } from '@waldur/marketplace/details/plan/utils';
import { formatOrderItemForCreate } from '@waldur/marketplace/details/utils';
import { ProviderLink } from '@waldur/marketplace/links/ProviderLink';
import { formDataSelector } from '@waldur/marketplace/utils';
import { Quota } from '@waldur/openstack/types';
import { parseQuotas, parseQuotasUsage } from '@waldur/openstack/utils';
import { PriceTooltip } from '@waldur/price/PriceTooltip';
import { QuotaUsageBarChart } from '@waldur/quotas/QuotaUsageBarChart';
import { isVisible } from '@waldur/store/config';
import { RootState } from '@waldur/store/reducers';
import { getCustomer, getProject } from '@waldur/workspace/selectors';

const getDailyPrice = (formData, components) => {
  /**
   * In Marketplace OpenStack plugin storage prices are stored per GB.
   * But in UI storage is storead in MB.
   * Therefore we should convert storage from GB to MB for price estimatation.
   */

  if (!components || !formData.size) {
    return 0;
  }
  const size = formData.size / 1024.0;
  const component = formData.type
    ? `gigabytes_${formData.type.name}`
    : 'storage';
  return size * (components[component] || 0);
};

const getQuotas = ({ formData, usages, limits }) => {
  const quotas: Quota[] = [
    {
      name: 'storage',
      usage: usages.disk,
      limit: limits.disk,
      required: formData.size || 0,
    },
  ];
  if (isFeatureVisible('openstack.volume_types')) {
    const required = {};
    if (formData.type) {
      const key = `gigabytes_${formData.type.name}`;
      required[key] = (required[key] || 0) + formData.size / 1024.0;
    }
    Object.keys(limits)
      .filter((key) => key.startsWith('gigabytes_'))
      .forEach((key) => {
        quotas.push({
          name: key,
          usage: usages[key] || 0,
          limit: limits[key],
          required: required[key] || 0,
        });
      });
  }
  return quotas;
};

const formIsValidSelector = (state: RootState) => isValid(FORM_ID)(state);

const formAttributesSelector = (state: RootState) => {
  const formData = formDataSelector(state);
  return formData.attributes || {};
};

export const OpenstackVolumeCheckoutSummary: React.FC<OfferingDetailsProps> = ({
  offering,
}) => {
  const customer = useSelector(getCustomer);
  const project = useSelector(getProject);
  const shouldConcealPrices = useSelector((state: RootState) =>
    isVisible(state, 'marketplace.conceal_prices'),
  );
  const formData = useSelector(formAttributesSelector);
  const formIsValid = useSelector(formIsValidSelector);
  const total = useSelector((state: RootState) =>
    pricesSelector(state, { offering }),
  ).total;
  const components = React.useMemo(
    () => (offering.plans.length > 0 ? offering.plans[0].prices : {}),
    [offering],
  );
  const usages = React.useMemo(
    () => parseQuotasUsage(offering.quotas || []),
    [offering],
  );
  const limits = React.useMemo(
    () => parseQuotas(offering.quotas || []),
    [offering],
  );
  const dailyPrice = React.useMemo(
    () => getDailyPrice(formData, components),
    [formData, components],
  );

  const quotas = React.useMemo(
    () => getQuotas({ formData, usages, limits }),
    [formData, usages, limits],
  );

  const orderItem = React.useMemo(
    () =>
      formatOrderItemForCreate({
        formData: { attributes: formData },
        offering,
        customer,
        project,
        total,
        formValid: formIsValid,
      }),
    [formData, offering, customer, project, total, formIsValid],
  );

  return (
    <>
      <p id="invalid-info">
        {!formData.size &&
          translate('Please enter volume size to see price estimate.')}
      </p>
      {!offering.shared && !offering.billable && (
        <p>
          {translate(
            'Note that this volume will not be charged separately for {organization}.',
            {
              organization: customer.name,
            },
          )}
        </p>
      )}
      <OfferingLogo src={offering.thumbnail} size="small" />
      {!!formData.size && (
        <Table bordered={true}>
          <tbody>
            <tr>
              <td>
                <strong>{translate('Offering')}</strong>
              </td>
              <td>{offering.name}</td>
            </tr>
            <tr>
              <td>
                <strong>{translate('Storage')}</strong>
              </td>
              <td>{formatFilesize(formData.size)}</td>
            </tr>
            <tr>
              <td>
                <strong>{translate('Service provider')}</strong>
              </td>
              <td>
                <ProviderLink customer_uuid={offering.customer_uuid}>
                  {offering.customer_name}
                </ProviderLink>
              </td>
            </tr>
            {offering.rating && (
              <tr>
                <td>
                  <strong>{translate('Rating')}</strong>
                </td>
                <td>
                  <RatingStars rating={offering.rating} size="medium" />
                </td>
              </tr>
            )}
            {!shouldConcealPrices && (
              <tr>
                <td>
                  <strong>{translate('Price per day')}</strong> <PriceTooltip />
                </td>
                <td>{defaultCurrency(dailyPrice)}</td>
              </tr>
            )}
            {!shouldConcealPrices && (
              <tr>
                <td>
                  <strong>{translate('Price per 30 days')}</strong>{' '}
                  <PriceTooltip />
                </td>
                <td>{defaultCurrency(dailyPrice * 30)}</td>
              </tr>
            )}
            <tr>
              <td>
                <strong>{translate('Invoiced to')}</strong>
              </td>
              <td>{customer.name}</td>
            </tr>
            <tr>
              <td>
                <strong>{translate('Project')}</strong>
              </td>
              <td>{project ? project.name : <>&mdash;</>}</td>
            </tr>
          </tbody>
        </Table>
      )}
      {components && (
        <Panel title={translate('Limits')}>
          <QuotaUsageBarChart quotas={quotas} />
        </Panel>
      )}
      <div className="display-flex justify-content-between">
        <ShoppingCartButtonContainer
          item={orderItem}
          flavor="primary"
          disabled={!formIsValid}
        />
        <OfferingCompareButtonContainer
          offering={offering}
          flavor="secondary"
        />
      </div>
    </>
  );
};
