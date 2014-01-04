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

            removeIngredientsFromGame(gameData['tempIds'], function(key) {

              gameData['tempIds'] = gameData['tempIds'].sort().reverse();
              gameData['tempIds'].forEach(function(ingredientId, key) {
                moveIngredientsDownRecursive(ingredientId, ingredientId, function() {
                });
              });
            });

          } else {
            $('.inner-ingredient.selected')
            .removeClass('selected')
            .addClass('failure');
            resetGameData();
            uiController.getIngredientElements().hammer().on('tap', itemTapped);
          }
        });
      },

      InsertNewIngredientInEmptyPlaceRecursive = function(startIngredientId, ingredientId,callback) {
        if(!ingredientsController.getIngredient(ingredientId)) {
          ingredientsController.setNewIngredient(ingredientId);
        }
      },

      moveIngredientsDownRecursive = function(startIngredientId, ingredientId, callback) {
        var ingredientAboveId = ingredientsController.findIngredientsAbove(ingredientId, gameConfig),
            newRow = Math.floor(ingredientId/gameConfig.cols);

        if(ingredientAboveId) {
          console.log(ingredientId,ingredientAboveId,newRow);
          ingredientsController.moveIngredient(ingredientId, ingredientAboveId);
          $('#' + ingredientAboveId).attr('id', ingredientId);
          uiController.animateIdToNewRow(ingredientId, newRow, 100, function() {
            moveIngredientsDownRecursive(startIngredientId, ingredientAboveId, callback);
          });
        }
        else {
          callback();
        }
      },

      removeIngredientsFromGame = function(ingredientIds,callback) {
        ingredientIds.forEach(function(id, key) {
          uiController.removeElement(id);
          ingredientsController.removeIngredient(id, ingredientsController);
          if(ingredientIds.length-1 === key) {
            callback(key);
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