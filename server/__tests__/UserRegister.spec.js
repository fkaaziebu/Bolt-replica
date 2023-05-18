const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return Driver.destroy({ truncate: true });
});

describe("Driver Registration", () => {
  it("returns 200 OK when signup request is valid", (done) => {
    request(app)
      .post("/api/1.0/drivers")
      .send({
        email: "user1@mail.com",
        contact: "0550815604",
        city: "Kumasi",
      })
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });

  it("returns success message when signup request is valid", (done) => {
    request(app)
      .post("/api/1.0/drivers")
      .send({
        email: "user1@mail.com",
        contact: "0550815604",
        city: "Kumasi",
      })
      .then((response) => {
        expect(response.body.message).toBe("Driver created");
        done();
      });
  });

  it("saves the driver to database", (done) => {
    request(app)
      .post("/api/1.0/drivers")
      .send({
        email: "user1@mail.com",
        contact: "0550815604",
        city: "Kumasi",
      })
      .then((response) => {
        // query driver table
        Driver.findAll().then((driverList) => {
          expect(driverList.length).toBe(1);
          done();
        });
      });
  });

  it("saves the email, contact and city to database", (done) => {
    request(app)
      .post("/api/1.0/drivers")
      .send({
        email: "user1@mail.com",
        contact: "0550815604",
        city: "Kumasi",
      })
      .then((response) => {
        // query driver table
        Driver.findAll().then((driverList) => {
          const savedDriver = driverList[0];
          expect(savedDriver.email).toBe("user1@mail.com");
          expect(savedDriver.contact).toBe("0550815604");
          expect(savedDriver.city).toBe("Kumasi");
          done();
        });
      });
  });
});
