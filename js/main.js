var tapController = function(event,src) {

    },

    gameConfig = {
      cols: 6,
      rows: 6,
      ingredients : 6 * 6,
      level: 1,
      container: $('.food')
    },

    game = new Game(gameConfig);




$('.food').hammer().on('tap', tapController);
