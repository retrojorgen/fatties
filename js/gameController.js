var Game  = function (_gameConfig) {

  var uiController,
      ingredientsController,
      recipesController,
      gameConfig,
      levels = [
        {
          'name': 'Sausage Sam',
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
        recipesController = new RecipesController();
        ingredientsController = new IngredientsController(gameConfig.ingredients,recipesController);
        uiController = new UIController(gameConfig);
        uiController.drawGameIngredients(ingredientsController);
      },

      init = function() {
        document.ontouchstart = function(e){ e.preventDefault(); };
        gameConfig = _gameConfig;
        startNewGame();
      };
      init();
};