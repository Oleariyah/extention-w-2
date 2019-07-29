import './marketplace';
import './provider';
import vmwareDisksService from './vmware-disks-service';
import vmwarePortsService from './vmware-ports-service';
import vmwareVirtualMachineDisks from './vmware-virtual-machine-disks';
import vmwareVirtualMachinePorts from './vmware-virtual-machine-ports';
import { VMwareVirtualMachineSummary } from './VMwareVirtualMachineSummary';
import { VMwareDiskSummary } from './VMwareDiskSummary';
import { VMwarePortSummary } from './VMwarePortSummary';
import * as ResourceSummary from '@waldur/resource/summary/registry';

import { actionsConfig } from './actions';
import { tabsConfig } from './tabs';

export default module => {
  ResourceSummary.register('VMware.VirtualMachine', VMwareVirtualMachineSummary);
  ResourceSummary.register('VMware.Disk', VMwareDiskSummary);
  ResourceSummary.register('VMware.Port', VMwarePortSummary);
  module.config(tabsConfig);
  module.config(actionsConfig);
  module.service('vmwareDisksService', vmwareDisksService);
  module.service('vmwarePortsService', vmwarePortsService);
  module.component('vmwareVirtualMachineDisks', vmwareVirtualMachineDisks);
  module.component('vmwareVirtualMachinePorts', vmwareVirtualMachinePorts);
};
