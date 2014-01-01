var Game  = function (gameConfig) {

  var uiController,
      itemController,
      recipeController,
      levels = [
        {
          'name': 'Sausage Sam'
          'image': 'img/characters/sausage-sam.png'
        }
      ],

      deleteItem = function(event) {
        var element = $(event.target);
        var id = -1;

        if(element.hasClass('item')) {
          id = element.attr('id');
          uiController.removeElement(id);
        } else {
          id = element.parent().attr('id');
          uiController.removeElement(id);
        }
      },

      startNewGame = function() {
        ingredientsController = new IngredientsController();
        recipeController = new RecipeController(function() {
          ingredientsController.createIngredients(function() {
            uiController = new UIController(function() {
              uiController.drawGameIngredients(ingriendsController.getIngredients());
            });
        });
      }

      init = function () {
        document.ontouchstart = function(e){ e.preventDefault(); }
      }

  init();
};