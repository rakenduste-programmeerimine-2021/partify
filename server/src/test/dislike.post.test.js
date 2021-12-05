const votesController = require('../controllers/vote.controller')
var expect = require('chai').expect



describe('User dislikes a post', () => {
    var req = {
        userId: "53aae1d126d57c198d861cfd",
        params: {
            id: "53aae1d126d57c198d861cfd",
        }
    };

    var res = {
        sendCalledWith: '',
        send: function (arg) {
            this.sendCalledWith = arg;
        },
        json: function (err) {
            console.log("\n : " + err);
        },
        status: function (s) {
            this.statusCode = s;
            return this;
        }
    };
    it("Should work, because it updates or creates new entry, doesn't check for post", async function() {
        await votesController.dislikePost(req, res)
        expect(res.statusCode).to.equal(200)
    });
});