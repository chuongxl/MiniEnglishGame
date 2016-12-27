var pointRepository=function()
{
    var socket = io();
    var me=this;
    me.Update=function(point)
    {
        socket.emit("update-point",point);
    };

};