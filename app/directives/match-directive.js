app.directive("match", function () {
    return {
        scope: {
            match: "=info"
        },
        template: function () {
            return "<span class='{{match.cardOne.suit}}'>{{match.cardOne.value}} of {{match.cardOne.suit}}</span>" +
                      " & " +
                    "<span class='{{match.cardTwo.suit}}'>{{match.cardTwo.value}} of {{match.cardTwo.suit}}</span>";
        }
    };
});