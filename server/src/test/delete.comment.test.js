const commentController = require('../controllers/comment.controller')
var expect = require('chai').expect

describe('Deletes user comment', () => {
    var req = {
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
    it("Should error, because comment with this id doesn't exist", async function() {
        await commentController.deleteComment(req, res)
        expect(res.statusCode).to.equal(404)
    });
    
});