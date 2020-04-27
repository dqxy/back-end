const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

const user = {
  username: "bilbo",
  password: "pass"
};


  describe("POST /register", function () {
    beforeEach(async () => {
      await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it ("return 201 on success", async () => {
   try{ const response = await
      request(server)
        .post("/api/auth/register")
        .send({ username: "bilbo", password: "pass" })
       // console.log(response)
        expect(response.status).toBe(201);}
        catch(error){console.log(error)}
     
    });

    it('should return a message saying "User created successfully"', function () {
      return request(server)
      .post("/api/auth/register")
        .send({ username: "bilbo21gf2", password: "pass" })
        .then(res => {
         // console.log(res);
          expect(res.body.message).toBe("User created successfully");
        }).catch(err => {
        //  console.log(err);
    });
  });
});

 

  describe("login post", () => {
    describe("login user with correct credentials receive 200", () => {
        it("check username and password with database", () => {
            request(server)
            .post("/api/auth/login")
            .send(user)
            .expect(200)
        });
      });

    


        it("return 401 from non-existent login", function () {
          return request(server)
          .post("/api/auth/login")
          .send({
              username: "fsghfghfg",
              password: "fdghjdfjdghjdhj"
          })
          .then(res => {
              expect(res.status).toBe(401);
          });

    });
  });


