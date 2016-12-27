var resultBoard = function (io) {
    var me = this;
    var pointA = 0;
    var pointB = 0;

    function showPoints() {
        $('#p-A').text(pointA);
        $('#p-B').text(pointB);
    }

    function emitPoints() {
        io.emit('update-point', "asd asd asd asd");
    }

    me.init = function () {
        showPoints();

        $("#save-point").click(function () {
            var pAStr = $("#input-point-a").val();
            var pBStr = $("#input-point-b").val();

            if (pAStr) {
                pointA += parseInt(pAStr);
            }
            if (pBStr) {
                pointB += parseInt(pBStr);
            }
            showPoints();
            emitPoints();
        });
        io.on('update-point', function (id, msg) {
            console.log(msg)
        });
    }
};
