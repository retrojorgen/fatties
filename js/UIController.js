var UIController = function (gameConfig, callback) {
  
      elementsInDom = [],
      gameConfig = {},
      uIConfig = {},
      recipescreen,

  drawGameIngredients = function (ingredients) {
    var rowCounter = gameConfig.rows-1,
        colCounter = gameConfig.cols-1,
        itemNr = gameConfig.items;
    // reverse through items
    // 
    elementLoop(itemNr-1, colCounter, rowCounter);
  },

  createRecipeScreen = function() {
    var recipeScreen = $('<div>')
      .addClass('recipeScreen')
      .css({
        'left': window.innerWidth
      });



  },

  elementLoop = function(itemNr, colCounter, rowCounter) {
    var rowCol = rowColDecrease(colCounter, rowCounter);
    if(itemNr>=0) {
      if(!document.getElementById(itemNr)) {
        currentElement = createNewElement(itemNr, colCounter, rowCounter, function() {
          elementLoop(itemNr-1, rowCol.colCounter, rowCol.rowCounter);
        });
        
      }
      else {
        elementLoop(itemNr-1, rowCol.colCounter, rowCol.rowCounter);
      }
    }
  },

  getRow = function(itemNr, callback) {
    callback(Math.floor(itemNr / gameConfig.cols)); // The girlfriend helped me with this one
  }

  deleteLoop = function(itemNr) {
    
    getRow(itemNr,function(itemRow) {
      if(itemNr >= 0) {
        emptyElement(itemNr, itemRow, (itemNr-(itemRow*10)), function () {
          deleteLoop(itemNr-gameConfig.cols);
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
    var innerWidth = window.innerWidth,
        innerHeight = window.innerHeight-200,
        widthPerItem = Math.floor(window.innerWidth/gameConfig.cols),
        heightPerItem = Math.floor(window.innerHeight/gameConfig.rows);

    uIConfig = {
      'itemWidth' : widthPerItem,
      'itemHeight' : heightPerItem
    };

    callback();
  },

  emptyElement = function(itemNr, itemRow, itemCol, callback) {
    console.log(itemNr, itemRow, itemCol);

    var aboveElementNr = findElementsAbove(itemNr);

    if(aboveElementNr) {
      items.moveItem(itemNr, aboveElementNr);
      $('#' + aboveElementNr)
      .attr('id', itemNr);
      animateToPosition($('#' + itemNr), itemRow, 100, function() {
        callback();
      });
    } else {
      console.log("yepp");
      items.setNewItem(itemNr);
      createNewElement(itemNr, itemCol, itemRow, function () {
        callback();
      });
    }
  },

  findElementsAbove = function(itemNr) {
    for(var x = itemNr; x >= 0; x = x-gameConfig.cols) {
      if(items.getItem(x)) {
        return x;
      }
    }
    return false;
  },

  createNewElement = function(itemNr, colCounter, rowCounter,callback) {

    var width = uIConfig.itemWidth,
        height = uIConfig.itemHeight,
        item = items.getItem(itemNr),
        innerElement = $('<div>')
          .addClass('inner-item')
          .css({
            'background-image': 'url(img/' + item.image + ')',
          }),
        element = $('<div>')
          .attr('id', itemNr)
          .addClass('item')
          .addClass(item.name + '')
          .css({
            'width': uIConfig.itemWidth,
            'height': uIConfig.itemHeight,
            'left': uIConfig.itemWidth * colCounter + 'px',
            'top': '-100px'
          })
          .append(innerElement);
    gameConfig.container.append(element);
    animateToPosition(element, rowCounter, 50, function() {
      callback();
    });
    return element;
  },

  removeElement = function(itemNr) {
    var element = $('#' + itemNr);
    element.remove();
    items.removeItem(itemNr);
    deleteLoop(itemNr);
  },

  animateToPosition = function(element, rowCounter, speed, callback) {
    element.animate({
      'top': uIConfig.itemHeight * rowCounter + 'px',
    }, speed, 'easein', function () {
      callback();
    });
  },


  randomiseElements = function() {
    items.randomiseItems();

  },

  init = function(callback) {
    items.createItems(function() {
      configUI(function() {
        callback
      }
  };

  init(function() {
    callback();
  });
  return {
    removeElement : removeElement
  };
};