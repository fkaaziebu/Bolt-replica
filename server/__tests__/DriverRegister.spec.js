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
  const postValidDriver = () => {
    return request(app).post("/api/1.0/drivers").send({
      email: "user1@mail.com",
      contact: "0550815604",
      city: "Kumasi",
    });
  };

  it("returns 200 OK when signup request is valid", async () => {
    const response = await postValidDriver();
    expect(response.status).toBe(200);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await postValidDriver();
    expect(response.body.message).toBe("Driver created");
  });

  it("saves the driver to database", async () => {
    await postValidDriver();
    const driverList = await Driver.findAll();
    expect(driverList.length).toBe(1);
  });

  it("saves the email, contact and city to database", async () => {
    await postValidDriver();

    const driverList = await Driver.findAll();
    const savedDriver = driverList[0];

    expect(savedDriver.email).toBe("user1@mail.com");
    expect(savedDriver.contact).toBe("0550815604");
    expect(savedDriver.city).toBe("Kumasi");
  });
});
