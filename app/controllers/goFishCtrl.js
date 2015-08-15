app.controller("goFishCtrl", function ($scope, dealerSvc, cardSvc, gameLogSvc) {
    $scope.you;
    $scope.computer;
    $scope.cards = cardSvc.cards;
    $scope.computerTurn = false;
    $scope.gameOver = true;
    $scope.logs = gameLogSvc.logs;

    $scope.newGame = function () {
        $scope.you = new Player("You");
        $scope.computer = new Player("Computer");
        dealerSvc.newGame($scope.you, $scope.computer);
        $scope.gameOver = false;
    };

    $scope.processTurn = function (cardAskedFor) {
        $scope.gameOver = dealerSvc.processTurn($scope.you, $scope.computer, cardAskedFor);
    };
});