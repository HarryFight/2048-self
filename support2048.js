/**
 * Created by Administrator on 2014/8/11.
 */

function getPosTop(i,j){
    return 1.2 + (1.2+6)*i +'rem';
}
function getPosLeft(i,j){
    return 1.2 + (1.2+6)*j +'rem';
}

function getNumberCellStr(i,j){
    var str = '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>';
    return str;
}
function getNumberBgColor(num){
    switch (num){
        case 2:
            return "#eee4de";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return '#f59563';
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#09c";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;

    }
}
function getNumberColor(num){
    if( num < 4){
        return "#776e65";
    }

    return "white";
}
/**
 * 检测棋盘格是否已满
 * @param board
 * @returns {boolean}
 */
function noSpace(board){
    for(var i = 0; i < 4 ; i++){
        for(var j = 0; j <4 ; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}
function noMove(board){
    if( canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board)
       ){
       return false;
    }
    return true;
}
/**
 * 判断是否能够向左移动
 * @param board
 * @returns {boolean}
 */
function canMoveLeft(board){
    for(var i = 0; i < 4; i++){
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * 判断是否能够向右移动
 * @param board
 * @returns {boolean}
 */
function canMoveRight(board){
    for(var i = 0; i < 4; i++){
        for(var j = 2; j >= 0; j--){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * 判断是否能够向上移动
 * @param board
 * @returns {boolean}
 */
function canMoveUp(board){
    for(var j = 0; j < 4; j++){
        for(var i = 1; i < 4; i++){
            if(board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * 判断是否能够向下移动
 * @param board
 * @returns {boolean}
 */
function canMoveDown(board){
    for(var j = 0; j < 4; j++){
        for(var i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * 检测col1到col2是否有障碍物
 * @param row
 * @param col1
 * @param col2
 * @param board
 * @returns {boolean}
 */
function noBlockHorizontal(row,col1,col2,board){
    for(var i = col1 + 1 ; i < col2 ; i++ ){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}
/**
 * 检测row1到row2是否有障碍物
 * @param col
 * @param row1
 * @param row2
 * @param board
 * @returns {boolean}
 */
function noBlockVertical(col,row1,row2,board){
    for(var i = row1 + 1 ; i < row2 ; i++ ){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}























