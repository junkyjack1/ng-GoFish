var Log = function (player, action, type) {
    var _player = player;
    var _action = action;
    var _type = type;

    return {
        player: _player,
        action: _action,
        type: _type
    };
}