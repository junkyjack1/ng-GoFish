app.service("cardSvc", function () {

    var _cards = [];

    function _buildDeck() {
        var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < suits.length; j++) {
                _cards.push(new Card(values[i], suits[j]));
            }
        }
    }

    function _draw() {
        return _cards.pop();
    }

    function _add(card) {
        _cards.push(card);
    }

    function _getRandomCard(cards) {
        var mathedNumber = Math.floor(Math.random() * cards.length);

        var card = cards.splice(mathedNumber, 1)[0];

        return card;
    }

    function _shuffle() {
        var cards = [];
        while (_cards.length > 0) {
            var card = _getRandomCard(_cards);
            cards.push(card);
        }
        
        for (var i = 0; i < cards.length; i++) {
            _cards.push(cards[i]);
        }
    }

    function _reset() {
        _cards.length = 0;
    }

    return {
        cards: _cards,
        buildDeck: _buildDeck,
        draw: _draw,
        add: _add,
        shuffle: _shuffle,
        reset: _reset
    };
});