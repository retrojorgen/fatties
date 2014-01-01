var tapController = function(event,src) {
 
    },

    gameConfig = {
      cols: 10,
      rows: 8,
      ingredients : 10 * 8,
      level: 1,
      container: $('.food')
    },
    
    game = new Game(gameConfig);




$('.food').hammer().on('tap', tapController);