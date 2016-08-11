var gameBoard = function () {
    var me = this;
    var pointA = 0;
    var pointB = 0;
    var questions = [];
    var answers = [];
    var memberA = [];
    var memberB = [];
    var qIndex = 0;
    var timer=30;
    //private method
    var reflectPoint = function () {
        $('#p-A').html(pointA);
        $('#p-B').html(pointB);
    };
    var reflectMember = function () {
        $("#m-A").html("");
        $("#m-B").html("");
        memberA.forEach(function (element) {
            $("#m-A").append('<p>' + element + "</p>");
        }, this);

        memberB.forEach(function (element) {
            $("#m-B").append('<p>' + element + "</p>");
        }, this);
    };
    var resetGame = function () {
        qIndex = 0;
        pointA = 0;
        pointB = 0;
        questions = [];
        answers = [];
        memberA = [];
        memberB = [];
        
    };
    var showQ = function () {

        if (qIndex >= questions.length) {
            alert("End-Game");
        } else {
            var nq = questions[qIndex];
            var temp = nq.Key + ":&nbsp;" + nq.Value;
            $("#n-question").html(temp);
            qIndex++;
        }

    };
    //public method
    me.init = function () {
        var clock = $('.your-clock').FlipClock({
            countdown: true
        });
        $("#next-q").click(function () {
            showQ();
            clock.setTime(timer);
            clock.start();
        });

        $("#save-point").click(function () {
            var pAStr = $("#input-point-a").val();
            var pBStr = $("#input-point-b").val();

            if (pAStr) {
                pointA += parseInt(pAStr);
            }
            if (pBStr) {
                pointB += parseInt(pBStr);
            }
            reflectPoint();
        });
        $("#game-guide").click(function(){
             var name = $("#game-name").val();
             if(name)
             {
                window.open("/games/"+name+".html");
             }
        });
    };
    $("#game-run").click(function () {
        var name = $("#game-name").val();
         $("#n-question").html("");
         resetGame();
        if (name) {
            $.getJSON("/games/" + name + ".json", function (result) {
                questions = result.Q;
                answers = result.answers;
                memberA = result.MA;
                memberB = result.MB;
                timer=parseInt(result.Time);
                reflectPoint();
                reflectMember();
            });
        } else {
             
             reflectPoint();
             reflectMember();
            alert("Not found game!!");
        }
      
    });
    //pull data
};