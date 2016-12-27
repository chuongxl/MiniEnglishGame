var resultBoard = function () {
    var me = this;
    var gameBoard = {};

    function showTeams() {
        var teams = gameBoard.getTeams();
        $("#m-A")
            .empty()
            .append(teams.A.map(name => $("<p></p>").text(name)));

        $("#m-B")
            .empty()
            .append(teams.B.map(name => $("<p></p>").text(name)));
    }

    function showPoints() {
        var points = gameBoard.getPoints();
        $('#p-A').text(points.A);
        $('#p-B').text(points.B);
    }

    me.init = function () {
        gameBoard = window.opener.board;
        showTeams();
        showPoints();

        $("#save-point").click(function () {
            var pAStr = $("#input-point-a").val();
            var pBStr = $("#input-point-b").val();
            var points = gameBoard.getPoints();

            if (pAStr) {
                points.A += parseInt(pAStr);
            }
            if (pBStr) {
                points.B += parseInt(pBStr);
            }
            gameBoard.setPoints(points.A, points.B);
            showPoints();
        });
    }
};
