var RecipesController = function() {
  var basicRecipes,

      getRecipes = function() {
        return basicRecipes;
      },

      getRecipeIngredients = function() {
        var uniQueIngredients = [];
        basicRecipes.forEach(function(recipe) {
          recipe.recipe.forEach(function(ingredient) {
            if(uniQueIngredients.indexOf(ingredient) === -1) {
              uniQueIngredients.push(ingredient)
            }
          });
        });
        return uniQueIngredients;
      },

      checkRecipe = function(ingredientsController, recipe, callback) {

        var recipeToggle = false;

        basicRecipes.forEach(function(savedRecipe) {
          savedRecipeArray = [ingredientsController.getIngredientsArray(savedRecipe.recipe)];
          if(_.isEqual(recipe, savedRecipe.recipe)) {
            callback(savedRecipe.points);
            recipeToggle = true;
          }
        });
        if(!recipeToggle) {
          callback(false);
        }
      },

      init = function () {
        basicRecipes = [
          {
            'name': 'basic burger',
            'recipe': [0,1,0],
            'points': 100
          },
          {
            'name': 'basic burger with condiments',
            'recipe': [0,1,2,0],
            'points': 150
          }
        ]
      };

  init();

  return {
    getRecipeIngredients: getRecipeIngredients,
    checkRecipe: checkRecipe,
    getRecipes: getRecipes
  };

  
}