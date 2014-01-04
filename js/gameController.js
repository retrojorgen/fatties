var Game  = function (_gameConfig) {

  var uiController,
      ingredientsController,
      recipesController,
      scoreController,
      gameData = {
        'tempScore': [],
        'tempIds': []
      },
      gameConfig,
      levels = [
        {
          'name': 'Sausage Sam',
          'image': 'img/characters/sausage-sam.png'
        }
      ],

      itemTapped = function(event) {
        var target = $(event.target).hasClass('ingredient') ? $(event.target) : $(event.target).parent(),
            id = parseInt(target.attr('id'));
        target.children('.inner-ingredient').addClass('selected');
        gameData['tempIds'].push(id);
        gameData['tempScore'].push(ingredientsController.getIngredientTypeKey(id));
      },

      cookIngredients = function(event) {
        recipesController.checkRecipe(ingredientsController, gameData['tempScore'], function(success) {
          if(success) {
            scoreController.addScore(success);
            uiController.updateScoreBoard(scoreController.getScore());
            uiController.removeIngredientsFromIdArray(gameData['tempIds'], ingredientsController, function() {
              console.log(uiController.getIngredientElements());
              uiController.getIngredientElements().hammer().on('tap', itemTapped);
            });
            resetGameData();

          } else {
            $('.inner-ingredient.selected')
            .removeClass('selected')
            .addClass('failure');
            resetGameData();
            uiController.getIngredientElements().hammer().on('tap', itemTapped);
          }
        });
      },

      resetGameData = function () {
        gameData = {
          'tempScore': [],
          'tempIds': []
        }
      },

      startNewGame = function() {
        scoreController = new ScoreController();
        recipesController = new RecipesController();
        ingredientsController = new IngredientsController(gameConfig.ingredients,recipesController);
        uiController = new UIController(gameConfig);
        uiController.drawGameIngredients(ingredientsController, function() {
          uiController.getIngredientElements().hammer().on('tap', itemTapped);
          gameConfig.container.hammer().on('swipedown', cookIngredients);
          uiController.drawMakeIngredientsButton().hammer().on('tap', cookIngredients);
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