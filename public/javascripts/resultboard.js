var resultBoard = function (io) {
    var me = this;
    var pointA = 0;
    var pointB = 0;

    function showPoints() {
        $('#p-A').text(pointA);
        $('#p-B').text(pointB);
    }

    function emitPoints() {
        io.emit('update-point', {pointA, pointB});
    }

    me.init = function () {
        showPoints();
        var clock = $('.your-clock').FlipClock({countdown: true});
        $("#save-point").click(function () {
            var pAStr = $("#input-point-a").val();
            var pBStr = $("#input-point-b").val();

            if (pAStr) {
                pointA += parseInt(pAStr);
            }
            if (pBStr) {
                pointB += parseInt(pBStr);
            }

            emitPoints();
        });
        io.on('update-point', function (data) {
            pointA = data.msg.pointA;
            pointB = data.msg.pointB;
            showPoints();
        });

         io.on('clock', function (data) {
            clock.setTime(timer);
            clock.start();
        });
    }
};
