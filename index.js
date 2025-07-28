let stage = 1;

//stage 1: start
$("html").on("keydown", function(event) {
    if (event.key === "a" && stage === 1) {
        $("h1").text("Start Playing");
        displaySequence();
        stage = 2
    }
})

//stage 2: show the challenge
let blockSequence = [];
const blockChoice = ["green", "red", "yellow", "blue"];

function displaySequence() {
    blockSequence.push(Math.floor(Math.random()*4)); //隨機選擇方塊並加入序列
    $("h1").text("Stage " + (blockSequence.length));
    
    for (let i = 0; i < blockSequence.length; i++) {
        setTimeout(function () {
            blockPressAnimation(blockChoice[blockSequence[i]]); //顯示按下的動畫
        }, i * 600); // 每個顏色間隔 600ms 播放
    }

    setTimeout(function () { //不能太快運行 stage = 3
        stage = 3;
    }, blockSequence.length * 600);
}

let blockSequenceCheck = [];

//Detect Block Press
const wrongAudio = new Audio("sounds/wrong.mp3");

$(".block").on("click", function() {
    if (stage === 3 && blockSequenceCheck.length === 0){ //如果是新的一個階段剛開始的話
        blockSequenceCheck = blockSequence.slice(); //複製blockSequence
    }

    if (stage === 3){
        blockPressAnimation($(this).attr("id")); //顯示按下的動畫

        if (blockChoice[blockSequenceCheck.shift()] === $(this).attr("id")) { //比對按的方塊是否正確
            if (blockSequenceCheck.length == 0) { //正確且都按完的話
                setTimeout(function (){
                    stage = 2;
                    displaySequence();
                }, 1000)
            }
        } else { //錯誤進度歸零
            stage = 1;
            $("h1").text("You failed!!! Press A to try Again");
            wrongAudio.play(); //播放失敗音效

            //背景顏色改變
            $("body").addClass("wrong");
            setTimeout(function() {
                $("body").removeClass("wrong");
            }, 400)

            // 重設變數
            blockSequence = [];
            blockSequenceCheck = [];
        }
    }      
})


//Block Press Animation
const greenAudio = new Audio("sounds/green.mp3");
const redAudio = new Audio("sounds/red.mp3");
const yellowAudio = new Audio("sounds/yellow.mp3");
const blueAudio = new Audio("sounds/blue.mp3");

function blockPressAnimation(block) {
    $("#" + block).addClass("block-pressed"); //只對被按下的按鍵增加Class
    
    if (block === "green") {
        greenAudio.play();
    } else if (block === "red") {        
        redAudio.play();
    } else if (block === "yellow") {
        yellowAudio.play();
    } else {
        blueAudio.play();
    }

    setTimeout(function() {
        $('#' + block).removeClass("block-pressed");
    }, 100)
}