var Player = function (name) {
    var _cards = [];
    var _matches = [];
    var _name = name;

    return {
        cards: _cards,
        matches: _matches,
        name: _name
    };
};