/**
 * Created by Administrator on 2014/8/11.
 */
var board;  //保存每个格子分数
var hasConflicted;  //是否发生过碰撞
var score = 0;

var startx,starty,endx,endy;    //保存触控坐标

$(document).ready(function(){
   prepareForMobile();
   newGame();
});

/**
 * 应用移动端的长度方案
 */
function prepareForMobile(){
    //当屏幕宽度大于500时应用绝对的长度
    if(documentWidth > 500){
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    $('#grid-container').css({
        width: gridContainerWidth - 2*cellSpace,
        height: gridContainerWidth - 2*cellSpace,
        padding: cellSpace
    }).css('border-radius',0.02*cellSideLength);

    $('.grid-cell').css({
        width:cellSideLength,
        height:cellSideLength
    }).css('border-radius',0.02*cellSideLength);
}

function newGame(){
   //初始化棋盘格
    init();

   //随机在两个格子里面生成数字
    generateOneNumber();
    generateOneNumber();
}


function init(){

    //初始化每一个格子
    for(var i = 0; i < 4 ; i++){
        for(var j = 0; j <4 ; j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left", getPosLeft(i,j));

        }
    }
    //初始化格子分数
    board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    //初始化碰撞标志
    hasConflicted = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
    //初始化分数
    score = 0;

    //更新界面
    updateBoardView();
}

/**
 * 绘制一次棋盘格
 */
function updateBoardView(){

    //清除所有的number格子
    $(".number-cell").remove();
    //清除所有的碰撞标志
    hasConflicted = [[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]];
    //绘制number格子
    for(var i = 0; i < 4 ; i++){
        for(var j = 0; j <4 ; j++){
            var thisCell;
            $("#grid-container").append(getNumberCellStr(i,j));
            thisCell = $('#number-cell-'+i+'-'+j);

            //number有值时出现，并给定属性
            if(board[i][j] == 0){
                //这里是为了后期动画效果而设
                thisCell.css({
                    width:'0px',
                    height:'0px',
                    top:getPosTop(i,j)+0.5*cellSideLength,
                    left:getPosLeft(i,j)+0.5*cellSideLength
                });
            }
            else{
                thisCell.css({
                    width:cellSideLength,
                    height:cellSideLength,
                    top:getPosTop(i,j),
                    left:getPosLeft(i,j),
                    backgroundColor:getNumberBgColor(board[i][j]),
                    color:getNumberColor(board[i][j])
                });
                thisCell.text(board[i][j]);
            }
        }
    }
    //刷新分数
    updateScore(score);
    //给新生成的number格子应用移动端长度
    $('.number-cell').css('line-height',cellSideLength+'px')
        .css('font-size',0.6*cellSideLength+'px');
}

/**
 * 随机生成一个数字格子
 */
function generateOneNumber(){

    //格子已满返回false
    if(noSpace(board)){
        alert("you fail");
        return false;
    }
    //随机生成一个数字(2,4)
    var randNum = Math.random() < 0.5 ? 2 : 4;

    //随机生成一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    //在计算机50次以内没有随机到合适的位置，则手动生成randx，randy
    var times = 0;
    while(times < 50){
        if(board[randx][randy] == 0){
            break;
        }

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
        times++;
    }
    if(times == 50){
        for(var i = 0; i < 4;i++){
            for(var j = 0; j < 4;j++){
                randx = i;
                randy = j;
            }
        }
    }

    //在随机位置生成一个num格子
    board[randx][randy] = randNum;
    //调用显示动画
    showNumAnimation(randx,randy,randNum);
    return true;
}
/**
 * 键盘按键检测
 */
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37:    //left
            //阻止默认操作
            event.preventDefault();
            if(moveLeft()){
                //move动画结束后生成格子
                setTimeout(function(){
                    generateOneNumber();
                },210);
                //格子生成后检测isGameover
                setTimeout(function(){
                    isGameover();
                },300);
            }
            break;
        case 38:    //up
            //阻止默认操作
            event.preventDefault();
            if(moveUp()){
                setTimeout(function(){
                    generateOneNumber();
                },210);
                setTimeout(function(){
                    isGameover();
                },300);
            }
            break;
        case 39:    //right
            //阻止默认操作
            event.preventDefault();
            if(moveRight()){
                setTimeout(function(){
                    generateOneNumber();
                },210);
                setTimeout(function(){
                    isGameover();
                },300);
            }
            break;
        case 40:    //down
            //阻止默认操作
            event.preventDefault();
            if(moveDown()){
                setTimeout(function(){
                    generateOneNumber();
                },210);
                setTimeout(function(){
                    isGameover();
                },300);
            }
            break;
        default :
            break;
    }
});

//监听触控事件
addEventListener('touchstart',function(event){
    //touches保存了触控信息，此处使用单点触控，所以取数组第一项
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
addEventListener('touchmove',function(event){
    //取消默认事件
    event.preventDefault();
});
addEventListener('touchend',function(event){
    //changedTouches保存了touch改变时的坐标位置
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    //x,y向量
    var deltax = endx - startx,
        deltay = endy - starty;

    //防误触操作
    if(Math.abs(deltax) < 0.05*documentWidth && Math.abs(deltay) < 0.05*documentWidth) return;

    //触控方向判断
    if(Math.abs(deltax) - Math.abs(deltay) > 0){
        //x
        if(deltax > 0){
            //right
            if(moveRight()){
                setTimeout(function(){
                    generateOneNumber();
                },210);
                setTimeout(function(){
                    isGameover();
                },300);
            }
        }else{
            //left
            if(moveLeft()){
                //move动画结束后生成格子
                setTimeout(function(){
                    generateOneNumber();
                },210);
                //格子生成后检测isGameover
                setTimeout(function(){
                    isGameover();
                },300);
            }
        }
    }else{
        //y
        if(deltay > 0 ){
            //down
            if(moveDown()){
                setTimeout(function(){
                    generateOneNumber();
                },210);
                setTimeout(function(){
                    isGameover();
                },300);
            }

        }else{
            //up
            if(moveUp()){
                setTimeout(function(){
                    generateOneNumber();
                },210);
                setTimeout(function(){
                    isGameover();
                },300);
            }
        }
    }

});
/**
 * 向左移动
 * @returns {boolean}
 */
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //moveLeft
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            //从左往右检索（j++）
            //board[i][j]如果有值则说明有可能需要向left移动
            if(board[i][j] != 0){
                //检测board[i][j]左边
                for(var k = 0; k < j ;k++){
                    //检测board[i][k]位置是否为空以及到此位置路径（k到j）是否有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    //检测是否碰撞过
                    if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }

    //整体刷新
    setTimeout(function(){
        updateBoardView();
    },200);
    return true;
}
/**
 * 向右移动
 * @returns {boolean}
 */
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //moveRight
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j--){
            //从右往左检索（j--）
            //board[i][j]如果有值则说明有可能需要向Right移动
            if(board[i][j] != 0){
                //检测board[i][j]右边
                for(var k = 3; k > j ;k--){
                    //检测board[i][k]位置是否为空以及到此位置路径（j到k）是否有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }

    //整体刷新
    setTimeout(function(){
        updateBoardView();
    },200);
    return true;
}
/**
 * 向上移动
 * @returns {boolean}
 */
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    //moveUp
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            //从上往下检索（i++）
            //board[i][j]如果有值则说明有可能需要向Up移动
            if(board[i][j] != 0){
                //检测board[i][j]上边
                for(var k = 0; k < i ;k++){
                    //检测board[k][j]位置是否为空以及到此位置路径（k到i）是否有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
                        //move
                        //固定j
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }

    //整体刷新
    setTimeout(function(){
        updateBoardView();
    },200);
    return true;
}
/**
 * 向下移动
 * @returns {boolean}
 */
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    //moveDown
    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            //从下往上检索（i--）
            //board[i][j]如果有值则说明有可能需要向Up移动
            if(board[i][j] != 0){
                //检测board[i][j]下边
                for(var k = 3; k > i ;k--){
                    //检测board[k][j]位置是否为空以及到此位置路径（i到k）是否有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
                        //move
                        //固定j
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[i][k]){
                        //move
                        showMoveAnimation(i,j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        hasConflicted[i][k] = true;
                        break;
                    }
                }
            }
        }
    }

    //整体刷新
    setTimeout(function(){
        updateBoardView();
    },200);
    return true;
}

/**
 * 游戏是否结束
 */
function isGameover(){
    if(noSpace(board) && noMove(board)){
        gameover();
    }
}
function gameover(){
    alert("gameover，your score"+score);
}
function updateScore(score){
    $('#score').text(score);
}




