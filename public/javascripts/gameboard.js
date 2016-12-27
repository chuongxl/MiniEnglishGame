var gameBoard = function () {
    var me = this;
    var pointA = 0;
    var pointB = 0;
    var questions = [];
    var answers = [];
    var memberA = [];
    var memberB = [];
    var qIndex = 0;
    var timer = 30;
    var gameName = "";
    var resultWindow;

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

    me.getTeams = function () {
        return {"A": memberA, "B": memberB}
    }

    me.getPoints = function () {
        return {"A": pointA, "B": pointB}
    }

    me.setPoints = function (pA, pB) {
        pointA = pA;
        pointB = pB;
    }

    //public method
    me.init = function () {
        var clock = $('.your-clock').FlipClock({countdown: true});
        $("#next-q").click(function () {
            showQ();
            updateQuestionIndicator();
            clock.setTime(timer);
            clock.start();
        });

        $("#game-guide").click(function () {
            if (gameName) {
                window.open(`/games/${gameName}.html`);
            }
        });

        $("#result").click(function () {
            window.open("/resultboard", "resultboard").focus();
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