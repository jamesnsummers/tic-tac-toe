// wait for the DOM to finish loading
$(document).ready(function() {
//checks to see if app.js is linked to the index.html
console.log("JS IS LINKED");
//fills square with X or O upon a click
$('td').on('click', takeTurn);
//cleans the board and resets the clickCount upon clicking the reset button
$('input.reset').on('click', clearBoard);
//checks to see if X wins
$('.board td').on('click', checkForX);
//checks to see if O wins
$('.board td').on('click', checkForO);

//sets begining clickCount to zero
var clickCount = 0;
//sets initial value of winner to false
var winner = false;

//function to fill in the table squares with x or o by clicking in them
function takeTurn(e) {
  //prevents clicking the same square twice
  e.preventDefault();
  //if the winner=true
  if (winner) {
    //don't do anything
  } else {
    winner = false;
    //sets value of square to this: either true or false
    var square = $(this);
    //if the square that was clicked already has been played this sends an alert
    if (square.hasClass('player1') || square.hasClass('player2')) {
      alert("Try an empty square if you hate getting alerts.");
      //otherwise this fills that square with an x if the current player is 1 (looks at the h2 span text to determine)
    } else if ($('h2 span').text()==="1") {
      //adds a class of player1 to the data that is entered upon clicking and sets that data to an 'X'
      square.addClass('player1').data('player', 'x');
      square.text('X');
      //adds 1 to the click Counter
      clickCount++;
      //changes the text in h2 span in index.html to "2"
      $('h2 span').text("2");
      //or otherwise this fills that square with an o if the current player is 2 (looks at the h2 span text to determine)
    } else if ($('h2 span').text()==="2"){
      square.addClass('player2').data('player', 'o');
      square.text("O");
      clickCount++;
      $('h2 span').text("1");
    }
  }
}
//function that checks to see if there is an X in any square
function checkForX() {
  if (winner) {
    //don't do anything
  } else {
    //loop that determines if 3 squares in a row all have X in them then X wins
    for (var i = 0; i<3; i++) {
      if (($('#row1 td').eq(i).data('player') === 'x') && ($('#row2 td').eq(i).data('player') === 'x') && ($('#row3 td').eq(i).data('player') === 'x')) {
        player1Wins();
      }
    }
      //additional if else statements define what '3 squares in a row' means
      //HORIZONTALS AND VERTICALS - if the td's containing an X in row1 or row2 or row3 have a length of 3, then player1 wins
      if (($('#row1 td.player1').length === 3) || ($('#row2 td.player1').length === 3) || ($('#row3 td.player1').length === 3)) {
        player1Wins();
        //DIAGONAL 1 - if row1 td sub-0 has player which equals x AND row2 td sub-1 has player which equals x AND row3 td sub-2 has player which equals x then player1 wins
      } else if (($('#row1 td').eq(0).data('player')==='x') && ($('#row2 td').eq(1).data('player')==='x') && ($('#row3 td').eq(2).data('player')==='x')) {
        player1Wins();
        //DIAGONAL 2 - if row1 td sub-2 has player which equals x AND row2 td sub-1 has player which equals x AND row3 td sub-0 has player which equals x then player1 wins
      } else if (($('#row1 td').eq(2).data('player')==='x') && ($('#row2 td').eq(1).data('player')==='x') && ($('#row3 td').eq(0).data('player')==='x')) {
        player1Wins();
      }
      //if winner remains false AND clickCount equals 9 AND current player is 2 (if X goes last the clickCount makes the current player player2) then its a cats game
      if ((winner === false) && (clickCount===9) && ($('h2 span').text()==="2")) {
        catGame();
      }
  }

}

//same functionality as checkForX
function checkForO() {
  if (winner) {

  } else {
    for (var i = 0; i<3; i++) {
      if (($('#row1 td').eq(i).data('player')=== 'o') && ($('#row2 td').eq(i).data('player')=== 'o') && ($('#row3 td').eq(i).data('player')=== 'o')) {
        player2Wins();
      }
    }
      if (($('#row1 td.player2').length === 3) || ($('#row2 td.player2').length === 3) || ($('#row3 td.player2').length === 3)) {
        player2Wins();
      } else if (($('#row1 td').eq(0).data('player')==='o') && ($('#row2 td').eq(1).data('player')==='o') && ($('#row3 td').eq(2).data('player')==='o')) {
        player2Wins();
      } else if (($('#row1 td').eq(2).data('player')==='o') && ($('#row2 td').eq(1).data('player')==='o') && ($('#row3 td').eq(0).data('player')==='o')) {
        player2Wins();
      }

      if ((winner === false) && (clickCount===9)) {
        catGame();
      }
  }

}

//how player1 winning is determined
function player1Wins() {
  //sets value of xScore to whatever text is in td with ID of p1Score
  var xScore = +$('#p1Score').text();
  //adds 1 to xScore
  xScore++;
  //changes the text in the p1Score tag to whatever xScore is
  $('#p1Score').html(xScore);
  //adds the h1 class with this text to the index.html doc when checkForX has determined that player1 has won
  $('h2').append('<br><h4 class="winTag">The X\'s Have It!</h4>')
  //changes the value of winner to true
  winner = true;
}

//same functionality as player1Wins
function player2Wins() {
  var oScore = +$('#p2Score').text();
  oScore++;
  $('#p2Score').html(oScore);
  $('h2').append('<br><h4 class="winTag">The O\'s Have It!</h4>')
  winner = true;
}

//function to add an h1 showing its a cats game should no other requirements be met to determine a winner
function catGame() {
  $('h2').append('<br><h4 class="winTag">The Cat Has It!</h4>');
  winner = true;
}

//function to clear the board when the input button is clicked
//note that there is no object to reset the current player since them's the rulez
function clearBoard() {
  //clears the data from each board square
  $('.board td').data('player', '');
  //clears the class from each board square
  $('.board td').removeClass('player1 player2');
  //clears the text from each board square
  $('.board td').text("");
  //resets the click counter to zero
  clickCount = 0;
  //removes the "you win!" message from the screen
  $('.winTag').remove();
  //resets the winner value to being false
  winner = false;
}

});
