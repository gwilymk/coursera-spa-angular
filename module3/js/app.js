(function() {
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.searchTerm = '';
    narrowItDown.menuItems = [];

    narrowItDown.searchMenu = function () {
      MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm)
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
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
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
        onRemove: '&onRemove'
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
  }
})();
