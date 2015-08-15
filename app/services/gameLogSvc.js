app.service("gameLogSvc", function () {
    var _logs = [];

    function _logAction(player, action) {
        _logs.push(new Log(player, action));
    }

    function _reset() {
        _logs.length = 0;
    }

    return {
        logAction: _logAction,
        logs: _logs,
        reset: _reset
    };
});