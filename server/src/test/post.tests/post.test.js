var fs = require('fs')

// Configure chai
var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

var userInfo = {};


describe("Post", () => {
    beforeEach(done => {
        chai.request("localhost:8080")
            .post('/api/auth/signin')
            .send({
                "email": "testt@test.com",
                "password": "123123123",
            })
            .end(function (req, res) {
                res.should.have.status(200);
                userInfo.id = res.body.id
                userInfo.accessToken = res.body.accessToken
                done();
            })
    });

    describe("GET /api/post", () => {
        it("Should get all the posts", done => {
            chai.request("localhost:8080")
                .get('/api/post/')
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });


    describe("POST /api/post/create", () => {
        it("Should make a new post", (done) => {
            chai.request("localhost:8080")
                .post('/api/post/create')
                .set({
                    'Content-Type': 'multipart/form-data'
                })
                .set({
                    'x-access-token': `${userInfo.accessToken}`,
                })
                .attach('postFile', fs.readFileSync('/usr/src/app/uploads/avatar/default_avatar.png'), 'default_avatar.png')
                .field("body", "lorem")
                .field("title", "ipsum")
                .field("location", "doore")
                .field("tags", "etsum")
                .end(function (err, res) {
                    userInfo.postId = res.body._id
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("PUT /api/post/like/:id", () => {
        it("User likes post", done => {
            chai.request("localhost:8080")
                .put(`/api/post/like/${userInfo.postId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });
    describe("PUT /api/post/dislike/:id", () => {
        it("User dislikes post", done => {
            chai.request("localhost:8080")
                .put(`/api/post/dislike/${userInfo.postId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("PUT /api/post/edit/:id", () => {
        it("User edits their post", done => {
            chai.request("localhost:8080")
                .put(`/api/post/edit/${userInfo.postId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                }).send({
                    "body": "updated",
                    "title": "up lore",
                    "location": "up ipsum",
                    "tags": "tags, are, kinda, dumb"
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("GET /api/post/:id", () => {
        it("Should get specific post", done => {
            chai.request("localhost:8080")
                .get(`/api/post/${userInfo.postId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("POST /api/post/:id/comment", () => {
        it("Should create a new comment under specific post", (done) => {
            chai.request("localhost:8080")
                .post(`/api/post/${userInfo.postId}/comment`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`,
                })
                .send({
                    "body": "test comment"
                })
                .end(function (err, res) {
                    userInfo.commentId = res.body._id
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("PUT /api/post/comment/like/:id", () => {
        it("User likes comment", done => {
            chai.request("localhost:8080")
                .put(`/api/post/comment/like/${userInfo.commentId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });
    describe("PUT /api/post/comment/dislike/:id", () => {
        it("User dislikes comment", done => {
            chai.request("localhost:8080")
                .put(`/api/post/comment/dislike/${userInfo.commentId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("POST /api/post/:postId/reply/:commentId", () => {
        it("Should create a new reply for specific comment", (done) => {
            chai.request("localhost:8080")
                .post(`/api/post/${userInfo.postId}/reply/${userInfo.commentId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`,
                })
                .send({
                    "body": "test reply"
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("GET /api/post/comment", () => {
        it("Should get all the comments", done => {
            chai.request("localhost:8080")
                .get('/api/post/comment')
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("GET /api/post/comment/:id", () => {
        it("Should get specific comment", done => {
            chai.request("localhost:8080")
                .get(`/api/post/comment/${userInfo.commentId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("DELETE /api/post/delete/:id", () => {
        it("User deletes post", done => {
            chai.request("localhost:8080")
                .delete(`/api/post/delete/${userInfo.postId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe("DELETE /api/post/comment/delete/:id", () => {
        it("Deletes comment", done => {
            chai.request("localhost:8080")
                .delete(`/api/post/comment/delete/${userInfo.commentId}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });
});