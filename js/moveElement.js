/**
  dragAction = function(event) {

    event.gesture.stopPropagation();
    event.gesture.preventDefault();
    event.gesture.stopDetect();

    var element = $(event.target);

    if(element.hasClass('item')) {
      moveElement($(event.target), event.gesture.direction);
      console.log(elements);
    }
  },

  moveElement = function(element, direction) {
    var position = element.attr('id').split('-'),
        row = parseInt(position[0]),
        col = parseInt(position[1]);

    if(direction === 'up') {
      if(row > 0) {
        var tempElement = elements[row-1][col];
        elements[row-1][col] = elements[row][col];
        elements[row][col] = tempElement;

        var tempElId = row + '-' + col;
        var elId = (row-1) + '-' + col;
        console.log(tempElId, elId);

        $(elements[row-1][col]).attr('id', elId);
        $(elements[row][col]).attr('id', tempElId);
        $(elements[row-1][col]).animate({
          'top': '-=' + buildUIConfig.height + '%'
        }, 100);
        $(elements[row][col]).animate({
          'top': '+=' + buildUIConfig.height +'%'
        }, 100);
      }
    }

    if(direction === 'down') {
      if(row < buildUIConfig.rows) {
        var tempElement = elements[row+1][col];
        elements[row+1][col] = elements[row][col];
        elements[row][col] = tempElement;

        var tempElId = row + '-' + col;
        var elId = (row+1) + '-' + col;
        console.log(tempElId, elId);

        $(elements[row+1][col]).attr('id', elId);
        $(elements[row][col]).attr('id', tempElId);
        $(elements[row+1][col]).animate({
          'top': '+=' + buildUIConfig.height + '%'
        }, 100);
        $(elements[row][col]).animate({
          'top': '-=' + buildUIConfig.height + '%'
        }, 100);
      }
    }

    if(direction === 'left') {
      if(col > 0) {
        var tempElement = elements[row][col-1];
        elements[row][col-1] = elements[row][col];
        elements[row][col] = tempElement;

        var tempElId = row + '-' + col;
        var elId = row + '-' + (col-1);
        console.log(tempElId, elId);

        $(elements[row][col-1]).attr('id', elId);
        $(elements[row][col]).attr('id', tempElId);
        $(elements[row][col-1]).animate({
          'left': '-=' + buildUIConfig.width + '%'
        }, 100);
        $(elements[row][col]).animate({
          'left': '+=' + buildUIConfig.width + '%'
        }, 100);
      }
    }

    if(direction === 'right') {
      if(col < buildUIConfig.cols-1) {
        var tempElement = elements[row][col+1];
        elements[row][col+1] = elements[row][col];
        elements[row][col] = tempElement;

        var tempElId = row + '-' + col;
        var elId = row + '-' + (col+1);
        console.log(tempElId, elId);

        $(elements[row][col+1]).attr('id', elId);
        $(elements[row][col]).attr('id', tempElId);
        $(elements[row][col+1]).animate({
          'left': '+=' + buildUIConfig.width + '%'
        }, 100);
        $(elements[row][col]).animate({
          'left': '-=' + buildUIConfig.width + '%'
        }, 100);
      }
    }
  };
**/