app.directive("card", function () {
    return {
        scope: {
            card: "=info"
        },
        template: function () {
            return "<div class='{{card.suit}}'>{{card.value}} of {{card.suit}}</div>";
        }
    };
});