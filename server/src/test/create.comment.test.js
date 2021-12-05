const commentController = require('../controllers/comment.controller')
const assert = require('assert');
var expect = require('chai').expect



describe('User creates new comment', () => {
    var req = {
        body: {
            body:"lorem ipsum"
        },
        userId: "53aae1d126d57c198d861cfd",
        params: {
            id: "53aae1d126d57c198d861cfd"
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
    it("Should error, because post with given id doesn't exist", async function() {
        await commentController.addComment(req, res)
        expect(res.statusCode).to.equal(400)
    });
});