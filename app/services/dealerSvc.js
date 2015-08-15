app.service("dealerSvc", function (cardSvc, gameLogSvc) {
    var _dealer = { name: "Dealer" };
    function _newGame(you, computer) {
        cardSvc.reset();
        cardSvc.buildDeck();
        cardSvc.shuffle();

        gameLogSvc.reset();
        gameLogSvc.logAction(_dealer, "New game started. Let's deal 'em out!");

        _deal(you, computer);

        gameLogSvc.logAction(_dealer, "Cards are dealt! Please, ask for a card.");
    }

    function _deal(you, computer) {
        for (var i = 0; i < 14; i++) {
            var card = _drawFromDeck();
            if (i % 2 === 0) {
                _giveCardToPlayer(you, card);
            }
            else {
                _giveCardToPlayer(computer, card);
            }
        }
    }

    function _drawFromDeck(player) {
        if (cardSvc.cards.length === 0) {
            gameLogSvc.logAction(_dealer, "Sorry there's no cards left!");

            return null;
        }
        return cardSvc.draw();
    }

    function _giveCardToPlayer(player, card) {
        gameLogSvc.logAction(player, "Received a card");

        var matchedCard = _findMatchedCard(player, card);
        if (matchedCard !== null) {
            gameLogSvc.logAction(player, "Made a match!");

            player.matches.push(new Match(card, matchedCard));
            return true;
        }

        player.cards.push(card);
        return false;
    }

    function _processTurn(you, computer, cardAskedFor) {
        var gotMatch = _processYourTurn(you, computer, cardAskedFor);
        if (gotMatch) {
            if (_gameIsOver(you, computer)) {
                _logGameOver(you, computer);
                return true;
            }
        }
        else {
            _processComputerTurn(you, computer);
            if (_gameIsOver(you, computer)) {
                _logGameOver(you, computer);
                return true;
            }
        }
    }

    function _processYourTurn(you, computer, cardAskedFor) {
        gameLogSvc.logAction(you, "Do you have a " + cardAskedFor.value + "?");

        var computersCard = _findMatchedCard(computer, cardAskedFor);
        if (computersCard !== null) {
            return _giveCardToPlayer(you, computersCard); //Got Match?
        }

        gameLogSvc.logAction(computer, 'Tells you, "Go fish"');

        var drawnCard = _drawFromDeck();
        if (drawnCard !== null) {
            return _giveCardToPlayer(you, drawnCard); //Got Match?
        }
    }

    function _processComputerTurn(you, computer) {
        var mathedNumber = Math.floor(Math.random() * computer.cards.length);
        var cardAskedFor = computer.cards[mathedNumber];

        gameLogSvc.logAction(computer, "Do you have a " + cardAskedFor.value + "?");
        
        var gotMatch;

        var yourCard = _findMatchedCard(you, cardAskedFor);
        if (yourCard !== null) {
            gotMatch = _giveCardToPlayer(computer, yourCard);
        }

        if (!gotMatch) {
            gameLogSvc.logAction(you, 'Tell Computer, "Go fish"');

            var drawnCard = _drawFromDeck();
            if (drawnCard !== null) {
                gotMatch = _giveCardToPlayer(computer, drawnCard);
            }
        }

        if (gotMatch & !_gameIsOver(you,computer)) {
            _processComputerTurn(you, computer);
        }
        else {
            return true;
        }
    }

    function _logGameOver(you, computer) {
        gameLogSvc.logAction(_dealer, (you.cards.length === 0 ? "You are" : "Computer is") + " out of cards!");

        if (you.matches.length > computer.matches.length) {
            gameLogSvc.logAction(_dealer, "You won " + you.matches.length + " matches to " + computer.matches.length);
        }
        else {
            gameLogSvc.logAction(_dealer, "You lost " + computer.matches.length + " matches to " + you.matches.length);
        }
    }

    function _gameIsOver(you, computer) {
        if (you.cards.length === 0 || computer.cards.length === 0) {
            return true;
        }
        return false;
    }

    function _findMatchedCard(player, card) {
        for (var i = 0; i < player.cards.length; i++) {
            if (player.cards[i].value === card.value) {
                return player.cards.splice(i, 1)[0];;
            }
        }
        return null;
    }

    return {
        newGame: _newGame,
        deal: _deal,
        processTurn: _processTurn
    };
});