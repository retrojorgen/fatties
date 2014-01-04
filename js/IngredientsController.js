var IngredientsController = function (ingredientCount, recipesController) {


  var ingredientTypes = [
        {
          'name': 'bread',
          'image': 'item-bread.jpg',
          'id': 1.3461346345323214
        },
        {
          'name': 'patty',
          'image': 'item-patty.jpg',
          'id': 2.43432642632463426
        },
        {
          'name': 'condiments',
          'image': 'item-condiments.jpg',
          'id': 5.4234723432373234
        },
        {
          'name': 'salad',
          'image': 'item-salad.jpg',
          'id': 4.0898564643453534
        },
        {
          'name': 'cheese',
          'image': 'item-cheese.jpg',
          'id': 3.56845695674632452
        },
        {
          'name': 'oil',
          'image': 'item-oil.jpg',
          'id': 12344.12344
        },
        {
          'name': 'chicken',
          'image': 'item-chicken.jpg',
          'id': 6.696796435746445456
        },
        {
          'name': 'donut',
          'image': 'item-donut.jpg',
          'id': 3333.3333
        },
        {
          'name': 'hotdog',
          'image': 'item-hotdog.jpg',
          'id': 5555.555
        },
        {
          'name': 'chocolate-bun',
          'image': 'item-chocolate-bun.jpg',
          'id': 656.656
        },
        {
          'name': 'sprinkles',
          'image': 'item-sprinkles.jpg',
          'id': 999.999
        },
        {
          'name': 'bacon',
          'image': 'item-bacon.jpg',
          'id': 2222.22222
        }
      ],
      ingredients = [],
      allowedIngredients = [],

      createIngredients = function() {
        for(var x = 1; x <= ingredientCount; x++) {
          ingredients.push(createIngredient());
        }
      },

      createIngredient = function() {
          var rand = Math.floor(Math.random() 
          * ((allowedIngredients.length-1) - 0 + 1) + 0);
          return ingredientTypes[rand];
      },

      getIngredients = function() {
        return ingredients;
      },

      getIngredient = function(ingredientNr) {
        return ingredients[ingredientNr.toString()];
      },

      getIngredientType = function(ingredientNr) {
        var ingredientTypeId = getIngredientTypeKey(ingredientNr);
        return ingredientTypes[ingredientTypeId];
      },

      getIngredientsArray = function(ingredientTypeKeyArray) {
        ingredientArray = [];
        ingredientTypeKeyArray.forEach(function(ingredientTypeKey) {
          ingredientArray.push(getIngredientTypeFromTypeKey(ingredientTypeKey));
        });
        return ingredientArray;
      }

      getIngredientTypeFromTypeKey = function(typeKey) {
        return ingredientTypes[typeKey];
      };

      getIngredientTypeKey = function(ingredientNr) {
        return ingredientTypes.indexOf(getIngredient(ingredientNr));
      },

      randomiseIngredients = function () {
        ingredients = _.shuffle(ingredients);
      },

      removeIngredient = function (ingredientNr) {
        ingredients[ingredientNr] = undefined;
      },

      setNewIngredient = function (ingredientNr) {

        ingredients[ingredientNr] = createIngredient();
      },

      moveIngredient = function (newIngredientNr, oldIngredientNr) {
        ingredients[newIngredientNr] = oldIngredientNr;
        ingredients[oldIngredientNr] = undefined;
      },

      findIngredientsAbove = function(ingredientId, gameConfig) {
        for(var x = ingredientId; x >= 0; x = x-gameConfig.cols) {
          if(getIngredient(x)) {
            return x;
          }
        }
        return false;
      }

      init = function () {
        allowedIngredients = recipesController.getRecipeIngredients();
        createIngredients();
      };

  init();

  return {
    createIngredients : createIngredients,
    getIngredients : getIngredients,
    getIngredientTypeKey: getIngredientTypeKey,
    getIngredientTypeFromTypeKey: getIngredientTypeFromTypeKey,
    getIngredientsArray: getIngredientsArray,
    getIngredient: getIngredient,
    getIngredientType: getIngredientType,
    findIngredientsAbove: findIngredientsAbove,
    randomiseIngredients : randomiseIngredients,
    removeIngredient : removeIngredient,
    setNewIngredient : setNewIngredient,
    moveIngredient : moveIngredient
  }
};