const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const Profile = require("../src/driver/Profile");
const sequelize = require("../src/config/database");
const msg = require("../src/messages");

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
  firstName: "Frederick",
  lastName: "Aziebu",
  language: "English",
  referralCode: "",
  carModel: "Toyota-G4",
  carYear: "2023",
  licensePlate: "picture-path",
  carColor: "red",
  nationalId: "picture-path",
  driverLicense: "picture-path",
  profilePhoto: "picture-path",
  licenseFront: "picture-path",
  proofOfInsurance: "picture-path",
  roadworthinessSticker: "picture-path",
  ghanaCard: "picture-path",
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

  it("saves the drivers profile to database", async () => {
    const driver = await postDriver();
    const driverProfile = await Profile.findAll();

    expect(driverProfile[0].driverId).toBe(4);
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
    field        | value              | expectedMessage
    ${"email"}   | ${null}            | ${msg.email_null}
    ${"email"}   | ${"mail.com"}      | ${msg.email_invalid}
    ${"email"}   | ${"user.mail.com"} | ${msg.email_invalid}
    ${"email"}   | ${"user@mail"}     | ${msg.email_invalid}
    ${"contact"} | ${null}            | ${msg.contact_null}
    ${"city"}    | ${null}            | ${msg.city_null}
  `(
    "returns $expectedMessage when $field is null",
    async ({ field, value, expectedMessage }) => {
      const driver = {
        email: "user1@mail.com",
        contact: "0550815604",
        city: "Kumasi",
      };

      driver[field] = value;
      const response = await postDriver(driver);
      const body = response.body;
      expect(body.validationErrors[field]).toBe(expectedMessage);
    }
  );
  it(`returns ${msg.email_inuse} when same email in use`, async () => {
    await Driver.create({ ...validDriver });
    const response = await postDriver();

    expect(response.body.validationErrors.email).toBe(msg.email_inuse);
  });
  it("returns errors for both email in use and contact is null", async () => {
    await Driver.create({ ...validDriver });
    const response = await postDriver({
      email: validDriver.email,
      contact: null,
      city: validDriver.city,
    });

    expect(Object.keys(response.body.validationErrors)).toEqual([
      "email",
      "contact",
    ]);
  });
});

/* ERROR MODEL */
describe("Error Model", () => {
  it("returns path, timestamp, message and validationErrors in response when validation failure", async () => {
    const response = await postDriver({ ...validDriver, contact: "" });
    expect(Object.keys(response.body)).toEqual([
      "path",
      "timestamp",
      "message",
      "validationErrors",
    ]);
  });
  it("returns path in error body", async () => {
    const response = await postDriver({ ...validDriver, contact: "" });
    expect(response.body.path).toBe("/api/1.0/drivers");
  });
  it("returns timestamp in milliseconds within 5 seconds value in error body", async () => {
    const nowInMillis = new Date().getTime();
    const fiveSecondsLater = nowInMillis + 5 * 1000;
    const response = await postDriver({ ...validDriver, contact: "" });

    expect(response.body.timestamp).toBeGreaterThan(nowInMillis);
    expect(response.body.timestamp).toBeLessThan(fiveSecondsLater);
  });
});
