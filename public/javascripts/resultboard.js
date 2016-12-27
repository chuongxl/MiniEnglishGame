var resultBoard = function () {
    var me = this;
    var pointA = 0;
    var pointB = 0;

    function showPoints() {
        $('#p-A').text(pointA);
        $('#p-B').text(pointB);
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
        });
    }
};
