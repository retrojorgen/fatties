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

      init = function () {
        basicRecipes = [
          {
            'name': 'basic burger',
            'recipe': [0,1,0],
            'points': 100
          },
          {
            'name': 'basic burger with condiments',
            'recipe': [0,1,4,0],
            'points': 150
          }
        ]
      };

  init();

  return {
    getRecipeIngredients: getRecipeIngredients,
    getRecipes: getRecipes
  };

  
}