app.directive("log", function () {
    return {
        scope: {
            log: "=info"
        },
        template: function () {
            return "<span class='{{log.player.name}}'>{{log.player.name}}: {{log.action}}</span>";
        }
    };
});