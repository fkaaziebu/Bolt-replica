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
const validDriver = {
  email: "user1@mail.com",
  contact: "0550815604",
  city: "Kumasi",
};
const postDriver = (driver = validDriver) => {
  return request(app).post("/api/1.0/drivers").send(driver);
};

describe("Driver Registration", () => {
  it("returns 200 OK when signup request is valid", async () => {
    const response = await postDriver();
    expect(response.status).toBe(200);
  });

  it("returns success message when signup request is valid", async () => {
    const response = await postDriver();
    expect(response.body.message).toBe("Driver created");
  });

  it("saves the driver to database", async () => {
    await postDriver();
    const driverList = await Driver.findAll();
    expect(driverList.length).toBe(1);
  });

  it("saves the email, contact and city to database", async () => {
    await postDriver();

    const driverList = await Driver.findAll();
    const savedDriver = driverList[0];

    expect(savedDriver.email).toBe("user1@mail.com");
    expect(savedDriver.contact).toBe("0550815604");
    expect(savedDriver.city).toBe("Kumasi");
  });

  it("returns 400 when username is null", async () => {
    const response = await postDriver({
      email: null,
      contact: "0550815604",
      city: "Kumasi",
    });

    expect(response.status).toBe(400);
  });

  it("returns validationErrors field in response body when validation error occurs", async () => {
    const response = await postDriver({
      email: null,
      contact: "0550815604",
      city: "Kumasi",
    });

    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });

  it("returns errors for both when email and contact is null", async () => {
    const response = await postDriver({
      email: null,
      contact: null,
      city: "Kumasi",
    });

    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual(["email", "contact"]);
  });

  it("returns errors for email, contact and city when null", async () => {
    const response = await postDriver({
      email: null,
      contact: null,
      city: null,
    });

    const body = response.body;
    expect(Object.keys(body.validationErrors)).toEqual([
      "email",
      "contact",
      "city",
    ]);
  });

  it.each`
    field        | expectedMessage
    ${"email"}   | ${"Email cannot be null"}
    ${"contact"} | ${"Contact cannot be null"}
    ${"city"}    | ${"City cannot be null"}
  `(
    "returns $expectedMessage when $field is null",
    async ({ field, expectedMessage }) => {
      const driver = {
        email: "user1@mail.com",
        contact: "0550815604",
        city: "Kumasi"
      };

      driver[field] = null;
      const response = await postDriver(driver);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage)
    }
  );
});
