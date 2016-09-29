(function() {
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.searchTerm = '';

    narrowItDown.searchMenu = function (searchTerm) {
      if (searchTerm === '') {
        narrowItDown.menuItems = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(searchTerm)
        .then(function (foundItems) {
          narrowItDown.menuItems = foundItems;
        });
    };

    narrowItDown.dontWantThisOne = function (index) {
      narrowItDown.menuItems.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var menuSearch = this;

    menuSearch.getMatchedMenuItems = function (searchTerm) {
      return $http({
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      })
        .then(function (result) {
          var items = result.data.menu_items;
          return items.filter(function (item) {
            return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
          });
        });
    };
  }

  function FoundItemsDirective() {
    return {
      templateUrl: 'templates/found-items.template.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      bindToController: true,
      controllerAs: 'foundItemsDirectiveController'
    };
  }

  function FoundItemsDirectiveController() {
    var foundItemsDirectiveController = this;

    foundItemsDirectiveController.dontWantThisOne = function (index) {
      foundItemsDirectiveController.onRemove({index: index});
    };

    foundItemsDirectiveController.noItems = function () {
      return foundItemsDirectiveController.foundItems &&
        foundItemsDirectiveController.foundItems.length === 0;
    };
  }
})();
