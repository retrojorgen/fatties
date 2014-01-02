var ScoreController = function() {
  var score = 0,
      addScore = function(newScore) {
        score = score + newScore;
      },
      getScore = function() {
        return score;
      };
      return {
        addScore: addScore,
        getScore: getScore
      }
};