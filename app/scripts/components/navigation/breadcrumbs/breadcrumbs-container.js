const breadcrumbsContainer = {
  template: '<breadcrumbs items="$ctrl.items" active-item="$ctrl.activeItem"/>',
  controller: class BreadcrumbsContainerController {
    constructor(BreadcrumbsService) {
      this.BreadcrumbsService = BreadcrumbsService;
    }

    $onInit() {
      this.refresh();
      this.unlisten = this.BreadcrumbsService.listen(() => this.refresh());
    }

    $onDestroy() {
      this.unlisten();
    }

    refresh() {
      this.activeItem = this.BreadcrumbsService.activeItem;
      this.items = this.BreadcrumbsService.items;
    }
  }
};

export default breadcrumbsContainer;
