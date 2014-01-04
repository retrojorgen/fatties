var UIController = function (gameConfig) {

  var recipescreen,

      drawGameIngredients = function (ingredientsController, callback) {
        var rowCounter = gameConfig.rows-1,
            colCounter = gameConfig.cols-1,
            ingredientsCount = gameConfig.ingredients;
        // reverse through items
        //
        elementLoop(ingredientsCount-1, colCounter, rowCounter, ingredientsController, callback);
      },

      drawRecipeScreen = function(config, recipesController, ingredientsController) {
        var recipeScreen = $('<div>')
              .addClass('recipeScreen')
              .css({
                'left': window.innerWidth-10
              }),
            header = $('<h1>')
              .text('Recipes');

        recipeScreen.append(header);

        recipesController.getRecipes().forEach(function(recipe) {
          recipeScreen.append(makeRecipeElement(recipe, ingredientsController));
        });

        $('body').append(recipeScreen);
        config.container.hammer().on('swipeleft',function(event) {
          recipeScreen.animate({
            'left': 0
          }, 100);
        });
        recipeScreen.hammer().on('swiperight', function() {
          recipeScreen.animate({
            'left': window.innerWidth-10
          }, 100);
        })
        .hammer().on('swipeleft',function(event) {
          recipeScreen.animate({
            'left': 0
          }, 100);
        });
      },

      makeRecipeElement = function(recipe, ingredientsController) {
        var recipeContainer = $('<div>')
              .addClass('recipe')
              .append(
                $('<h2>')
                  .addClass('title')
                  .text(recipe.name)
                );

        recipe.recipe.forEach(function(ingredient) {
          recipeContainer
            .append(
              $('<div>')
                .addClass('ingredient')
                .css({
                  'background-image': 'url(img/' + ingredientsController.getIngredientType(ingredient).image + ')',
                  'width': uIConfig.itemWidth,
                  'height': uIConfig.itemHeight
                })
            );
        });
        return recipeContainer;
      }

      elementLoop = function(ingredientNr, colCounter, rowCounter, ingredientsController, callback) {
        var rowCol = rowColDecrease(colCounter, rowCounter);

        if(ingredientNr>=0) {

          if(!document.getElementById(ingredientNr)) {

            createNewElement(ingredientNr, colCounter, rowCounter, ingredientsController, function() {
              elementLoop(ingredientNr-1, rowCol.colCounter, rowCol.rowCounter, ingredientsController, callback);
            });
          }

          else {

            elementLoop(ingredientNr-1, rowCol.colCounter, rowCol.rowCounter, ingredientsController, callback);
          }
        } else {
          // Run callback at last iteration of ingredients
          callback();
        }
      },

      getRow = function(itemNr, callback) {
        callback(Math.floor(itemNr / gameConfig.cols)); // The girlfriend helped me with this one
      }

      deleteLoop = function(itemNr, ingredientsController) {
        getRow(itemNr,function(itemRow) {
          if(itemNr >= 0) {
            emptyElement(itemNr, itemRow, (itemNr-(itemRow*10)), ingredientsController, function () {
              deleteLoop(itemNr-gameConfig.cols, ingredientsController);
            });
          }
        });
      },

      rowColDecrease = function(_colCounter, _rowCounter) {
          return {
            'colCounter': (_colCounter === 0) ? (gameConfig.cols-1) : (_colCounter-1),
            'rowCounter': (_colCounter === 0) ? (_rowCounter-1) : _rowCounter
          }
      },

      configUI = function(callback) {
        var innerWidth = gameConfig.container.width(),
            widthPerItem = Math.round(innerWidth/gameConfig.cols),
            heightPerItem = widthPerItem,
            containerHeight = gameConfig.rows*heightPerItem,
            containerMarginTop = (containerHeight/2)*-1;

            gameConfig.container.css({
              'height': containerHeight,
              'margin-top': containerMarginTop
            });

        uIConfig = {
          'itemWidth' : widthPerItem,
          'itemHeight' : widthPerItem
        };

        callback();
      },

      emptyElement = function(itemNr, itemRow, itemCol, ingredientsController, callback) {
        var aboveElementNr = findElementsAbove(itemNr, ingredientsController);

        if(aboveElementNr) {
          ingredientsController.moveIngredient(itemNr, aboveElementNr);
          $('#' + aboveElementNr)
          .attr('id', itemNr);
          animateToPosition($('#' + itemNr), itemRow, 100, function() {
            callback();
          });
        } else {
          ingredientsController.setNewIngredient(itemNr);
          createNewElement(itemNr, itemCol, itemRow, ingredientsController, function () {
            callback();
          });
        }
      },
      // this should probably be moved to the ingredientsController
      findElementsAbove = function(itemNr, ingredientsController) {
        for(var x = itemNr; x >= 0; x = x-gameConfig.cols) {
          if(ingredientsController.getIngredient(x)) {
            return x;
          }
        }
        return false;
      },

      createNewElement = function(ingredientNr, colCounter, rowCounter, ingredientsController, callback) {

        var width = uIConfig.itemWidth,
            height = uIConfig.itemHeight,
            ingredient = ingredientsController.getIngredient(ingredientNr),
            innerElement = $('<div>')
              .addClass('inner-ingredient')
              .css({
                'background-image': 'url(img/' + ingredient.image + ')',
              }),
            element = $('<div>')
              .attr('id', ingredientNr)
              .addClass('ingredient')
              .addClass(ingredient.name + '')
              .css({
                'width': uIConfig.itemWidth,
                'height': uIConfig.itemHeight,
                'left': uIConfig.itemWidth * colCounter + 'px',
                'top': ((uIConfig.itemHeight * rowCounter)-10) + 'px',
              })
              .append(innerElement);
        gameConfig.container.append(element);
        animateToPosition(element, rowCounter, 50, function() {
          callback();
        });
      },

      removeElement = function(itemNr, ingredientsController) {
        var element = $('#' + itemNr);
        element.remove();
        ingredientsController.removeIngredient(itemNr, ingredientsController);
        deleteLoop(itemNr, ingredientsController);
      },

      removeIngredientsFromIdArray = function(itemArray, ingredientsController, callback) {
        itemArray.forEach(function(itemNr) {
          removeElement(itemNr, ingredientsController, function ());
        });
      },

      animateToPosition = function(element, rowCounter, speed, callback) {
        element.animate({
          'top': uIConfig.itemHeight * rowCounter + 'px',
        }, speed, 'easein', function () {
          element.children('.inner-ingredient').addClass('rotated');
          callback();
        });
      },


      randomiseElements = function() {
        items.randomiseItems();

      },

      drawScoreBoard = function () {
        var scoreBoard = $('<div>')
          .addClass('score-board')
          .text("0");

        $('body').append(scoreBoard);
      },

      updateScoreBoard = function(score) {
        $('.score-board')
          .text(score);
      },

      drawMakeIngredientsButton = function() {
        var ingredientsButton = $('<button>')
          .addClass('ingredients-button')
          .text('Make Ingredients');
        $('body').append(ingredientsButton);
        return ingredientsButton;
      },

      getIngredientElements = function() {
        
        return $('.food .ingredient');
      },

      init = function() {
        configUI(function() {
          drawScoreBoard();
        });
      };

  init();

  return {
    removeElement: removeElement,
    drawGameIngredients: drawGameIngredients,
    drawRecipeScreen: drawRecipeScreen,
    removeIngredientsFromIdArray: removeIngredientsFromIdArray,
    drawMakeIngredientsButton: drawMakeIngredientsButton,
    getIngredientElements: getIngredientElements,
    updateScoreBoard: updateScoreBoard
  };
};
