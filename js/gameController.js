var Game  = function (_gameConfig) {

  var uiController,
      ingredientsController,
      recipesController,
      scoreController,
      gameConfig,
      levels = [
        {
          'name': 'Sausage Sam',
          'image': 'img/characters/sausage-sam.png'
        }
      ],

      itemTapped = function(event) {
        var target = $(event.target);
        target.addClass('selected');
      }

      startNewGame = function() {
        scoreController = new ScoreController();
        recipesController = new RecipesController();
        ingredientsController = new IngredientsController(gameConfig.ingredients,recipesController);
        uiController = new UIController(gameConfig);
        uiController.drawGameIngredients(ingredientsController, function() {
          uiController.getIngredientElements().hammer().on('tap', itemTapped);
        });
        uiController.drawRecipeScreen({
          'container' : gameConfig.container
        }, recipesController, ingredientsController);
        
      },

      init = function() {
        document.ontouchstart = function(e){ e.preventDefault(); }
        gameConfig = _gameConfig;
        startNewGame();
      };
      init();
};