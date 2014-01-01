var IngredientsController = function (recipesController) {
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
      'name': 'salad',
      'image': 'item-salad.jpg',
      'id': 4.0898564643453534
    },
    {
      'name': 'condiments',
      'image': 'item-condiments.jpg',
      'id': 5.4234723432373234
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
  items = [],
  allowedIngredients = [],

  createIngredients = function(callback) {
    for(var x = 1; x <= ingredientCount; x++) {
      ingredients.push(createIngredient());
    }
    callback();
  },

  createIngredient = function() {
      var rand = Math.floor(Math.random() 
      * ((allowedIngredients.length-1) - 0 + 1) + 0);
      return ingredientTypes[rand];
  }

  getIngredients = function() {
    return ingredients;
  },

  getingredient = function(ingredientNr) {
    return ingredients[ingredientNr];
  },
  randomiseIngredients = function () {
    ingredients = _.shuffle(ingredients);
  },
  removeingredient = function (ingredientNr) {
    ingredients[ingredientNr] = undefined;
  },

  setNewIngredient = function (ingredientNr) {

    var rand = Math.floor(Math.random() 
      * ((ingredientTypes.length-1) - 0 + 1) + 0);

    ingredients[ingredientNr] = ingredientTypes[rand];
  },

  moveIngredient = function (newIngredientNr, oldIngredientNr) {
    ingredients[newIngredientNr] = oldingredientNr;
    ingredients[oldIngredientNr] = undefined;
  },

  init = function () {
    allowedIngredients = recipesController.getRecipeIngredients();
  };

  init();

  return {
    createIngredients : createIngredients,
    getIngredients : getIngredients,
    getIngredient: getIngredient,
    randomiseIngredients : randomiseIngredients,
    removeIngredient : removeIngredient,
    setNewIngredient : setNewIngredient,
    moveIngredient : moveIngredient
  }
};