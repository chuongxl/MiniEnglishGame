var gameBoard = function (io) {
    var me = this;
    var questions = [];
    var answers = [];
    var qIndex = 0;
    var timer = 30;
    var gameName = "";
    //private method
    function resetGame() {
        qIndex = 0;
        pointA = 0;
        pointB = 0;
        questions = [];
        answers = [];
        memberA = [];
        memberB = [];

    }

    function showQ() {
        if (qIndex >= questions.length) {
            alert("End-Game");
        } else {
            var nq = questions[qIndex];
            var temp = nq.Key + ":&nbsp;" + nq.Value;
            $("#n-question")
                .empty()
                .append($("<h2 class='text-danger'></h2>").text(nq.Key + ":"))
                .append(isPicture(nq.Value)
                    ? $("<img class='img-responsive'/>").attr("src", `/games/${gameName}/${nq.Value}`)
                    : $("<h2 class='text-danger'></h2>").text(nq.Value));
            qIndex++;
        }

    }

    function updateQuestionIndicator() {
        $("#question-count").text(`Question: ${qIndex}/${questions.length}`);
    }

    function isPicture(value) {
        return value != null && !!value.match(/\.(jpg|png|gif|jpeg)$/i);
    }

    //public method
    me.init = function () {
        var clock = $('.your-clock').FlipClock({countdown: true});
        $("#next-q").click(function () {
            
            showQ();
            updateQuestionIndicator();
            io.emit("start-new-q",'NQ');
            clock.setTime(timer);
            clock.start();
            io.emit('clock', {
                pic:`/games/${gameName}/${questions[qIndex].Value}`
            });
        });

        $("#game-guide").click(function () {
            if (gameName) {
                window.open(`/games/${gameName}.html`);
            }
        });

        $("#result").click(function () {
            window
                .open(`/resultboard?game=${gameName}`, "resultboard")
                .focus();
        });

        $("#game-run").click(function () {
            gameName = $("#game-name").val();
            $("#n-question").empty();
            resetGame();

            $
                .getJSON(`/games/${gameName}.json`)
                .done(function (result) {
                    questions = result.Q;
                    answers = result.answers;
                    memberA = result.MA;
                    memberB = result.MB;
                    timer = parseInt(result.Time);
                 
                })
                .fail(function () {
                    alert("Not found game!!");
                });
        });
    };
};