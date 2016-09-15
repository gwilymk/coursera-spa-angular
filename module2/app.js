(function () {
  angular
    .module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    this.itemsToBuy = ShoppingListCheckOffService.itemsToBuy();

    this.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };

    this.noItemsToBuy = function () {
      return ShoppingListCheckOffService.itemsToBuy().length === 0;
    };
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    this.itemsAlreadyBought = ShoppingListCheckOffService.boughtItems();

    this.anyItemsBought = function () {
      return ShoppingListCheckOffService.boughtItems().length !== 0;
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = [
      {name: 'cookies for Yaakov', quantity: 10},
      {name: 'bags of chips', quantity: 3},
      {name: 'bread', quantity: '8 loaves'},
      {name: 'water', quantity: '3 bottles'},
      {name: 'mushrooms', quantity: '700g'},
      {name: 'leek', quantity: 1}
    ];

    var bought = [];

    service.buyItem = function (index) {
      bought.push(toBuy[index]);
      toBuy.splice(index, 1);
    };

    service.itemsToBuy = function () {
      return toBuy;
    };

    service.boughtItems = function () {
      return bought;
    };
  }
})();
