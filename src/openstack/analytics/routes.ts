import { lazyComponent } from '@waldur/core/lazyComponent';
import { StateDeclaration } from '@waldur/core/types';
import { checkPermission } from '@waldur/issues/utils';

const VmTypeOverviewContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "VmTypeOverviewContainer" */ './VmTypeOverviewContainer'
    ),
  'VmTypeOverviewContainer',
);

export const states: StateDeclaration[] = [
  {
    name: 'support.vm-type-overview',
    url: 'vm-type-overview/',
    component: VmTypeOverviewContainer,
    data: {
      feature: 'support.vm_type_overview',
    },
    resolve: {
      permission: checkPermission,
    },
  },
];
