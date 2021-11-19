import { FormattedHtml } from '@waldur/core/FormattedHtml';
import { translate } from '@waldur/i18n';
import { ImagesTab } from '@waldur/marketplace/offerings/images/ImagesTab';
import { Offering, Section } from '@waldur/marketplace/types';

import { AttributesTable } from './attributes/AttributesTable';
import { LimitTable } from './LimitDetail';
import { OfferingTab } from './OfferingTabsComponent';
import { OverviewTab } from './OverviewTab';

interface OfferingTabsProps {
  sections: Section[];
  offering: Offering;
}

export const getTabs = (props: OfferingTabsProps): OfferingTab[] => {
  const attributes = props.offering.attributes;

  const filterSection = (section: Section) =>
    section.attributes.some((attr) =>
      props.offering.attributes.hasOwnProperty(attr.key),
    );

  const sections = props.sections.filter(filterSection);
  const basicSections = sections.filter((s) => s.is_standalone === false);
  const standaloneSections = sections.filter((s) => s.is_standalone === true);

  let tabs = [
    {
      visible: !!attributes,
      title: translate('Attributes'),
      component: () => (
        <AttributesTable
          attributes={attributes}
          sections={[...sections]}
          hideHeader={false}
        />
      ),
    },
    {
      visible: !!props.offering.full_description,
      title: translate('Limits'),
      component: () => <LimitTable limits={props.offering.components} />,
    },
    {
      visible: !!props.offering.full_description,
      title: translate('Description'),
      component: () => <OverviewTab offering={props.offering} />,
    },
    {
      visible: !!props.offering.terms_of_service,
      title: translate('Terms of Service'),
      component: () => <FormattedHtml html={props.offering.terms_of_service} />,
    },
    {
      visible: basicSections.length > 0,
      title: translate('Features'),
      component: () => (
        <AttributesTable
          attributes={attributes}
          sections={basicSections}
          hideHeader={false}
        />
      ),
    },
    {
      visible: props.offering.screenshots.length > 0,
      title: translate('Images'),
      component: () => <ImagesTab images={props.offering.screenshots} />,
    },
  ];

  standaloneSections.forEach((section) => {
    tabs.push({
      visible: true,
      title: section.title,
      component: () => (
        <AttributesTable
          attributes={attributes}
          sections={[section]}
          hideHeader={true}
        />
      ),
    });
  });
  tabs = tabs.filter((tab) => tab.visible);
  return tabs;
};
