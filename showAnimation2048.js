/**
 * Created by Administrator on 2014/8/11.
 */

/**
 * 显示格子动画
 * @param i
 * @param j
 * @param num
 */
function showNumAnimation(i,j,num) {
    var numCell = $("#number-cell-"+i+"-"+j);

    //设定基本属性
    numCell.css({
        backgroundColor:getNumberBgColor(board[i][j]),
        color:getNumberColor(board[i][j])
    });
    numCell.text(num);

    //设定动画效果
    numCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}
/**
 * 从from移动到to
 * @param fromx
 * @param fromy
 * @param tox
 * @param toy
 */
function showMoveAnimation(fromx,fromy,tox,toy){
    var numCell = $('#number-cell-'+fromx+'-'+fromy);
    numCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}
