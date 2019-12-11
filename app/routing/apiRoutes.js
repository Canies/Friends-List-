
var friendsData = require("../data/friends")

module.exports = function (app) {
    app.post("/api/survey", function (request, response) {
        console.log(request.body)
        var userScore = request.body.scores
        var totalDifference = 0
        var newFriendsData = []
        for (let index = 0; index < friendsData.length; index++) {
            var scores = friendsData[index].scores;

            for (let j = 0; j < scores.length; j++) {
                var friendScore = scores[j];
                totalDifference = totalDifference + Math.abs(friendScore[j] - parseInt(userScore[j]))

            }
            newFriendsData.push({
                name: friendsData[index].name,
                photo: friendsData[index].scores,
                totalDiff: totalDifference
            })

        }
         friendsData.push(request.body)

        newFriendsData.sort(function(a, b) {
            return parseFloat(a.totaldiff) - parseFloat(b.totalDiff);
        });
          
        for (let index = 0; index < newFriendsData.length; index++) {
            console.log(newFriendsData[index]);
            
        }
        response.json(newFriendsData[0])
    })
}