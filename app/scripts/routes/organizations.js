(function() {
  angular.module('ncsaas').config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard/',
        abstract: true,
        templateUrl: 'views/customer/base.html',
        data: {
          pageTitle: 'Dashboard',
          pageClass: 'gray-bg',
          workspace: 'organization',
          auth: true
        },
      })

      .state('dashboard.index', {
        url: '?tab',
        templateUrl: 'views/dashboard/organization.html',
        controller: 'OrganizationDashboardController',
        controllerAs: 'DashboardCtrl',
        bindToController: true
      })

      .state('organization', {
        url: '/organizations/:uuid/',
        abstract: true,
        data: {
          auth: true,
          workspace: 'organization'
        },
        templateUrl: 'views/customer/base.html',
      })

      .state('organization.details', {
        url: '',
        templateUrl: 'views/partials/filtered-list.html',
        controller: 'CustomerEventTabController',
        controllerAs: 'ListController',
        data: {
          pageTitle: 'Audit logs'
        }
      })

      .state('organization.alerts', {
        url: 'alerts/',
        templateUrl: 'views/partials/filtered-list.html',
        controller: 'CustomerAlertsListController',
        controllerAs: 'ListController',
        data: {
          pageTitle: 'Alerts'
        }
      })

      .state('organization.projects', {
        url: 'projects/',
        templateUrl: 'views/partials/filtered-list.html',
        controller: 'CustomerProjectTabController',
        controllerAs: 'ListController',
        data: {
          pageTitle: 'Projects'
        }
      })

      .state('organization.team', {
        url: 'team/',
        templateUrl: 'views/customer/tab-team.html',
        data: {
          pageTitle: 'Team'
        },
        abstract: true
      })

      .state('organization.team.tabs', {
        url: '',
        views: {
          users: {
            template: '<customer-users-list></customer-users-list>'
          },
          invitations: {
            template: '<invitations-list></invitations-list>'
          }
        }
      })

      .state('organization.providers', {
        url: 'providers/?providerUuid&providerType',
        templateUrl: 'views/partials/filtered-list.html',
        controller: 'ProviderListController',
        controllerAs: 'ListController',
        data: {
          pageTitle: 'Providers'
        }
      })

      .state('organization.billing', {
        url: 'billing/',
        templateUrl: 'views/customer/tab-billing.html',
        data: {
          pageTitle: 'Billing'
        },
        abstract: true
      })

      .state('organization.billing.tabs', {
        url: '',
        views: {
          invoices: {
            controller: 'InvoicesListController',
            controllerAs: 'ListController',
            templateUrl: 'views/partials/filtered-list.html'
          }
        }
      })

      .state('organization.invoiceDetails', {
        url: 'invoice/:invoiceUUID/',
        template: '<invoice-details></invoice-details>'
      })

      .state('organization.sizing', {
        url: 'sizing/',
        templateUrl: 'views/customer/tab-sizing.html',
        data: {
          pageTitle: 'Sizing'
        }
      })

      .state('organization.delete', {
        url: 'delete/',
        templateUrl: 'views/customer/tab-delete.html',
        controller: 'CustomerDeleteTabController',
        controllerAs: 'DeleteController',
        data: {
          pageTitle: 'Delete organization'
        }
      })

      .state('organization.plans', {
        url: 'plans/',
        templateUrl: 'views/customer/plans.html',
        data: {
          pageTitle: 'Plans'
        }
      })

      .state('organization.analysis', {
        url: '',
        abstract: true,
        template: '<ui-view/>'
      })

      .state('organization.analysis.cost', {
        url: 'cost-analysis/',
        templateUrl: 'views/dashboard/cost-tab.html',
        data: {
          pageTitle: 'Cost analysis'
        }
      })

      .state('organization.analysis.resources', {
        url: 'resource-usage/',
        templateUrl: 'views/dashboard/resources-tab.html',
        data: {
          pageTitle: 'Resource usage'
        }
      })

      .state('services', {
        url: '/services/',
        abstract: true,
        templateUrl: 'views/customer/base.html',
        data: {
          auth: true,
          workspace: 'organization'
        }
      })

      .state('services.create', {
        url: 'add/',
        template: '<provider-create></provider-create>',
        data: {
          pageTitle: 'Create provider'
        }
      })
  });
})();
