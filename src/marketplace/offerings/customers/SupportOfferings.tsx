import * as React from 'react';

import { Panel } from '@waldur/core/Panel';
import { translate } from '@waldur/i18n';
import { SupportOfferingsFilter } from '@waldur/marketplace/offerings/customers/SupportOfferingsFilter';
import { useTitle } from '@waldur/navigation/title';

import { OfferingsList } from '../OfferingsList';

export const SupportOfferings = () => {
  useTitle(translate('Offerings'));
  return (
    <Panel>
      <SupportOfferingsFilter />
      <OfferingsList isReporting={true} />
    </Panel>
  );
};
