import { get } from '@waldur/core/api';
import { format } from '@waldur/core/ErrorMessageFormatter';
import { translate, gettext } from '@waldur/i18n';
import { validateState } from '@waldur/resource/actions/base';

const getConsoleURL = (id: string) =>
  get(`/vmware-virtual-machine/${id}/console/`);

export function actionsConfig(ActionConfigurationProvider) {
  ActionConfigurationProvider.register('VMware.VirtualMachine', {
    order: [
      'pull',
      'console',
      'update',
      'create_disk',
      'create_port',
      'start',
      'stop',
      'reset',
      'suspend',
      'destroy',
    ],
    options: {
      pull: {
        title: gettext('Synchronise'),
      },
      create_disk: {
        tab: 'disks',
        title: translate('Create disk'),
      },
      create_port: {
        tab: 'ports',
        title: translate('Create Ethernet adapter'),
      },
      update: {
        title: translate('Edit'),
      },
      console: {
        name: 'console',
        title: translate('Open console'),
        type: 'callback',
        enabled: true,
        execute: resource => {
          getConsoleURL(resource.uuid).then(response => {
            window.open(response.data.url);
          }).catch(error => {
            const ctx = {message: format(error)};
            const message = translate('Unable to open console. Error message: {message}', ctx);
            alert(message);
          });
        },
        validators: [validateState('OK')],
      },
    },
  });

  ActionConfigurationProvider.register('VMware.Disk', {
    options: {
      pull: {
        title: gettext('Synchronise'),
      },
      extend: {
        fields: {
          size: {
            resource_default_value: true,
          },
        },
      },
    },
  });

  ActionConfigurationProvider.register('VMware.Port', {
    options: {
      pull: {
        title: gettext('Synchronise'),
      },
    },
  });
}

actionsConfig.$inject = ['ActionConfigurationProvider'];