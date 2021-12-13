// Configure chai
var chai = require('chai')
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

var userInfo = {};


describe("User", () => {
    beforeEach(done => {
        chai.request("localhost:8080")
            .post('/api/auth/signin')
            .send({
                "email": "testt@test.com",
                "password": "aA1!123123",
            })
            .end(function (req, res) {
                res.should.have.status(200);
                userInfo.id = res.body.id
                userInfo.accessToken = res.body.accessToken
                done();
            })
    })

    describe("Get user/:id", () => {
        it("Should get user with given id", done => {
            chai.request("localhost:8080")
                .get(`/api/user/${userInfo.id}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });
    describe("Get /api/users/admin", () => {
        it("User is not admin, cant access admin route", done => {
            chai.request("localhost:8080")
                .get(`/api/users/admin`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(403);
                    done();
                })
        });
    });

    describe("PUT user/:id/update", () => {
        it("Should update user first name, last name, phone, username and gender", done => {
            chai.request("localhost:8080")
                .put(`/api/user/${userInfo.id}/update`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .send({
                    "firstName": "test",
                    "lastName": "test",
                    "userName": "loremIpsum",
                    "phone": 54541010,
                    "gender": "Other",
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });

    });
    describe("PUT user/:id/update/avatar", () => {
        it("Should fail, no image provided", done => {
            chai.request("localhost:8080")
                .put(`/api/user/${userInfo.id}/update/avatar`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(400);
                    done();
                })
        });
    });

    describe("PUT /api/user/like/:id", () => {
        it("User likes itself", done => {
            chai.request("localhost:8080")
                .put(`/api/user/like/${userInfo.id}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });
    describe("PUT /api/user/dislike/:id", () => {
        it("user dislikes itself", done => {
            chai.request("localhost:8080")
                .put(`/api/user/dislike/${userInfo.id}`)
                .set({
                    'x-access-token': `${userInfo.accessToken}`
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });

    });
    describe("DELETE user/:id/delete", () => {
        it("Deletes user", done => {
            chai.request("localhost:8080")
                .delete(`/api/user/${userInfo.id}/delete`)
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