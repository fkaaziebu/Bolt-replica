const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const Profile = require("../src/driver/Profile");
const sequelize = require("../src/config/database");
const msg = require("../src/messages");
const path = require("path");
const fs = require("fs");
const config = require("config");
const SMTPServer = require("smtp-server").SMTPServer;

const { uploadDir, profileDir } = config;
const profileDirectory = path.join(".", uploadDir, profileDir);

let lastMail, server;
let simulateSmtpFailure = false;

beforeAll(async () => {
  server = new SMTPServer({
    authOptional: true,
    onData(stream, session, callback) {
      let mailBody;
      stream.on("data", (data) => {
        mailBody += data.toString();
      });
      stream.on("end", () => {
        if (simulateSmtpFailure) {
          const err = new Error("Invalid mailbox");
          err.responseCode = 553;
          return callback(err);
        }
        lastMail = mailBody;
        callback();
      });
    },
  });
  await server.listen(8587, "localhost");

  if (process.env.NODE_ENV === "test") {
    await sequelize.sync();
  }
  
  jest.setTimeout(20000);
});

beforeEach(async () => {
  simulateSmtpFailure = false;
  await Driver.destroy({ truncate: { cascade: true } });
});

afterAll(async () => {
  await server.close();
  jest.setTimeout(5000);
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
  licensePlate: "717 TTP",
  carColor: "red",
  nationalId: "304567876543",
  driverLicense: "AB2467876",
  profilePhoto: null,
  licenseFront: null,
  proofOfInsurance: null,
  roadworthinessSticker: null,
  ghanaCard: null,
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
    expect(response.body.message).toBe(msg.driver_create_success);
  });

  it("saves the driver to database", async () => {
    await postDriver();
    const driverList = await Driver.findAll();
    expect(driverList.length).toBe(1);
  });

  it("saves the drivers profile to database", async () => {
    await postDriver();
    const driver = await Driver.findAll();
    const driverProfile = await Profile.findAll();

    expect(driverProfile[0].driverId).toBe(driver[0].id);
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

const readFileAsBase64 = (file = "test-png.png") => {
  const filePath = path.join(".", "__tests__", "resources", file);
  return fs.readFileSync(filePath, { encoding: "base64" });
};

/* IMAGE UPLOADS */
describe("Image uploads", () => {
  // Success Cases
  it.each`
    field                      | image
    ${"profilePhoto"}          | ${readFileAsBase64()}
    ${"licenseFront"}          | ${readFileAsBase64()}
    ${"proofOfInsurance"}      | ${readFileAsBase64()}
    ${"roadworthinessSticker"} | ${readFileAsBase64()}
    ${"ghanaCard"}             | ${readFileAsBase64()}
  `("saves $field image to database", async ({ field, image }) => {
    const driver = { ...validDriver };
    driver[field] = image;
    const response = await postDriver({
      ...driver,
    });
    const driverProfile = await Profile.findAll();
    expect(driverProfile[0][field]).toBeTruthy();
  });

  it.each`
    field                      | image
    ${"profilePhoto"}          | ${readFileAsBase64()}
    ${"licenseFront"}          | ${readFileAsBase64()}
    ${"proofOfInsurance"}      | ${readFileAsBase64()}
    ${"roadworthinessSticker"} | ${readFileAsBase64()}
    ${"ghanaCard"}             | ${readFileAsBase64()}
  `(
    "saves $field image to upload folder and stores filename in Profile $field field",
    async ({ field, image }) => {
      const driver = { ...validDriver };
      driver[field] = image;
      const response = await postDriver({
        ...driver,
      });
      const driverProfile = await Profile.findAll();
      const profileImagePath = path.join(
        profileDirectory,
        driverProfile[0][field]
      );
      expect(fs.existsSync(profileImagePath)).toBe(true);
    }
  );

  it.each`
    file              | status
    ${"test-gif.gif"} | ${400}
    ${"test-pdf.pdf"} | ${400}
    ${"test-txt.txt"} | ${400}
    ${"test-png.png"} | ${200}
    ${"test-jpg.jpg"} | ${200}
  `(
    "returns $status when uploading $file as image",
    async ({ file, status }) => {
      const driver = { ...validDriver };
      const filename = readFileAsBase64(file);
      driver["profilePhoto"] = filename;
      const response = await postDriver({
        ...driver,
      });
      expect(response.status).toBe(status);
    }
  );

  it.each`
    file              | message
    ${"test-gif.gif"} | ${msg.unsupported_image_file}
    ${"test-pdf.pdf"} | ${msg.unsupported_image_file}
    ${"test-txt.txt"} | ${msg.unsupported_image_file}
  `(
    "returns $status when uploading $file as image",
    async ({ file, message }) => {
      const driver = { ...validDriver };
      const filename = readFileAsBase64(file);
      driver["profilePhoto"] = filename;
      const response = await postDriver({
        ...driver,
      });
      expect(response.body.validationErrors.profilePhoto).toBe(message);
    }
  );
});

/* PASSWORDS GENERATION */
describe("Generate Passwords", () => {
  it("generates password when user, registers", async () => {
    await postDriver();
    const driver = await Driver.findAll();
    expect(driver[0].password).not.toBe(null);
  });

  it("sends an email containing password created when driver created", async () => {
    await postDriver();
    expect(lastMail).toContain("user1@mail.com");
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
