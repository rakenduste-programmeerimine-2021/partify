// Configure chai
var chai = require('chai')
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const userInfo = {};
describe("Auth", () => {
    describe("POST auth/", () => {
        it("should register a new user", (done) => {
            chai.request("localhost:8080")
                .post('/api/auth/signup')
                .send({
                    "firstName": "test",
                    "lastName": "test",
                    "userName": "tetstUn",
                    "email": "testt@test.com",
                    "phone": 5555555,
                    "gender": "Male",
                    "dateOfBirth": "2000-11-23",
                    "password": "aA1!123123",
                    "confirm_password": "aA1!123123"
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })

        });

        it("should login newly made user", (done) => {
            chai.request("localhost:8080")
                .post('/api/auth/signin')
                .send({
                    "email": "testt@test.com",
                    "password": "aA1!123123",
                })
                .end(function (req, res) {
                    res.should.have.status(200);
                    done();
                })
        });
    });
});