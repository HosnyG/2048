var border = $('table tr');
var numColors = {2:'rgb(230, 255, 230)',4:'rgb(179, 179, 255)', 8:'rgb(128, 255, 128)',16:'rgb(255, 77, 77)',32:'rgb(179, 204, 230)',64:'rgb(51, 51, 255)',128:'rgb(255, 77, 255)',256:'rgb(148, 184, 184)',512:'rgb(119, 255, 51)',1024:'rgb(255, 255, 102)',2048:'rgb(255, 173, 51)'}
var defaultColor = 'rgb(242, 242, 242)'
var score = 0;

document.onkeydown = function(e) {
           switch (e.keyCode) {
               case 37: //left
                   allToLeft();
                   setTimeout(setRandomTile,110);
                   break;
               case 38: //up
                   allToUp();
                   setTimeout(setRandomTile,110);
                   break;
               case 39: //right
                   allToRight();
                   setTimeout(setRandomTile,110);
                   break;
               case 40: //down
                   allToDown();
                   setTimeout(setRandomTile,110);
                   break;
           }
           setScore(score);
       };

start();
function status(row, col){
  return border.eq(row).find('td').eq(col).find('button').find('h1').text();
}

function getEmptyTiles(){
  var emptyTiles = []
  for(var row = 0; row<4;row++ )
    for(var col =0 ; col<4;col++)
      if(status(row, col) === ' ')
        emptyTiles.push([row,col]);
  return emptyTiles;
}

function fullBorder(){
  if (getEmptyTiles().length == 0)
    return true;
  return false;
}

function changeColor(row, col, color){
  border.eq(row).find('td').eq(col).find('button').css('background-color',color);
}

function getColor(row, col){
  return border.eq(row).find('td').eq(col).find('button').css('background-color');

}

function changeTileNum(row, col, number){
  border.eq(row).find('td').eq(col).find('button').find('h1').text(number);
}

function setScore(s){
  $('#score').text(s);
}

function getScore(s){
  return $('#score').text();
}

function getRandomTileIndex(){
  var emptyTiles = getEmptyTiles()
  var r = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[r];
}

function getRandom2OR4(){
  var r = Math.random();
  if(r<=0.85)
    return 2
  return 4
}

function setRandomTile(){
    setTimeout(check2048,100)

    var tile1 =getRandomTileIndex();
    var tile1Score = getRandom2OR4();
    changeColor(tile1[0], tile1[1], numColors[tile1Score]);
    changeTileNum(tile1[0], tile1[1], tile1Score);
    if(fullBorder()){
      gameOver();
    }
}

function check2048(){
  for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
      if(status(i,j)== 2048)
        gamePassed();
}

function gameOver(){
  alert('Game Over, Your Socre is '+score);
  $('table').fadeOut('slow');
  $('#alert').fadeOut(2000);
  $('#playAgainbtn').fadeIn(2000);

}

function gamePassed(){
  alert('congratulations!!');
  $('table').fadeOut('slow');
  $('#alert').fadeOut(2000);
  $('#playAgainbtn').fadeIn(2000);
}

function start(){
  setRandomTile();
  setRandomTile();
}

function stepToRight(row,col){
  var merged = false;
  if(col == 3 || status(row,col)==' ')
    return true;
  if(status(row,col+1) == status(row,col)){ //merge
    changeTileNum(row,col+1,status(row,col)*2);
    score+=status(row,col)*2;
    changeColor(row,col+1,numColors[status(row,col)*2]);
   merged = true
  }else if(status(row,col+1) !== ' '){
    return;
  }else{
    changeTileNum(row,col+1, status(row,col));
    changeColor(row,col+1,getColor(row,col));
  }
  changeTileNum(row, col, ' ');
  changeColor(row, col, defaultColor);
  return merged;
}

function rightToEnd(row,col){
  for(var i=0; i<3; i++)
    if(stepToRight(row,col+i) === true)
      break;
}

function allToRight(){
  for(var k=3;k>=0;k--)
    for(var m=3;m>=0;m--)
      rightToEnd(k,m);
}

function stepToLeft(row,col){
  var merged = false;
  if(col == 0 || status(row,col)==' ')
    return true;
  if(status(row,col-1) == status(row,col)){ //merge
    changeTileNum(row,col-1,status(row,col)*2);
    score+=status(row,col)*2;
    changeColor(row,col-1,numColors[status(row,col)*2]);
    merged = true
 }else if(status(row,col-1) !== ' '){
    return;
  }else{
    changeTileNum(row,col-1, status(row,col));
    changeColor(row,col-1,getColor(row,col));
  }
  changeTileNum(row, col, ' ');
  changeColor(row, col, defaultColor);
  return merged;
}

function leftToEnd(row,col){
  for(var i=0; i<3; i++)
    if(stepToLeft(row,col-i) === true){
      console.log(row+','+(col-i)+','+i);
      break;
    }
}

function allToLeft(){
  for(var k=0;k<=3;k++)
    for(var m=0;m<=3;m++)
      leftToEnd(k,m);
}

function stepDown(row,col){
  var merged = false;
  if(row == 3 || status(row,col)==' ')
    return true;
  if(status(row+1,col) == status(row,col)){ //merge
    changeTileNum(row+1,col,status(row,col)*2);
    score+=status(row,col)*2;
    changeColor(row+1,col,numColors[status(row,col)*2]);
    merged = true
  }else if(status(row+1,col) !== ' '){
    return;
  }else{
    changeTileNum(row+1,col, status(row,col));
    changeColor(row+1,col,getColor(row,col));
  }
  changeTileNum(row, col, ' ');
  changeColor(row, col, defaultColor);
  return merged;
}

function downToEnd(row,col){
  for(var i=0; i<3; i++)
    if(stepDown(row+i,col) === true)
      break;
}

function allToDown(){
  for(var k=3;k>=0;k--)
    for(var m=3;m>=0;m--)
      downToEnd(k,m);
}

function stepUp(row, col){
  var merged = false;
  if(row == 0 || status(row,col)==' ')
    return true;
  if(status(row-1,col) == status(row,col)){ //merge
    changeTileNum(row-1,col,status(row,col)*2);
    score+=status(row,col)*2;
    changeColor(row-1,col,numColors[status(row,col)*2]);
    merged = true
  }else if(status(row-1,col) !== ' '){
    return;
  }else{
    changeTileNum(row-1,col, status(row,col));
    changeColor(row-1,col,getColor(row,col));
  }
  changeTileNum(row, col, ' ');
  changeColor(row, col, defaultColor);
  return merged;
}

function upToEnd(row,col){
  for(var i=0; i<3; i++)
    if(stepUp(row-i,col) === true)
      break;
}

function allToUp(){
  for(var k=0;k<=3;k++)
    for(var m=0;m<=3;m++)
      upToEnd(k,m);
}
