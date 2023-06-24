const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const Profile = require("../src/driver/Profile");
const Token = require("../src/auth/Token");
const sequelize = require("../src/config/database");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const FileService = require("../src/file/FileService");
const DriverService = require("../src/driver/DriverService");
const msg = require("../src/messages");

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync();
  }
});

beforeEach(async () => {
  await Driver.destroy({ truncate: { cascase: true } });
});

const activeDriver = {
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
  password: "P4ssword",
};

const readFileAsBase64 = (file = "test-png.png") => {
  const filePath = path.join(".", "__tests__", "resources", file);
  return fs.readFileSync(filePath, { encoding: "base64" });
};

const addDriver = async (driver = { ...activeDriver }) => {
  const hash = await bcrypt.hash(driver.password, 10);
  driver.password = hash;
  const image = await FileService.saveImage(readFileAsBase64());

  await Driver.create({
    email: driver.email,
    contact: driver.contact,
    city: driver.city,
    password: hash,
  });
  // await DriverService.save(driver);

  const driverInfo = await Driver.findOne({ where: { email: driver.email } });

  await Profile.create({
    driverId: driverInfo.id,
    firstName: driver.firstName,
    lastName: driver.lastName,
    language: driver.lastName,
    referralCode: driver.referralCode,
    carModel: driver.carModel,
    carYear: driver.carYear,
    licensePlate: driver.licensePlate,
    carColor: driver.carColor,
    nationalId: driver.nationalId,
    driverLicense: driver.driverLicense,
    profilePhoto: image,
    licenseFront: image,
    proofOfInsurance: image,
    roadworthinessSticker: image,
    ghanaCard: image,
  });

  let driverProfile;
  if (driverInfo) {
    driverProfile = await Profile.findOne({
      where: { driverId: driverInfo.id },
    });
  }

  const { id, email, contact, city } = driverInfo;

  const {
    firstName,
    lastName,
    language,
    referralCode,
    carModel,
    carYear,
    licensePlate,
    carColor,
    nationalId,
    driverLicense,
    profilePhoto,
    licenseFront,
    proofOfInsurance,
    roadworthinessSticker,
    ghanaCard,
    password,
  } = driverProfile;

  return {
    id,
    email,
    contact,
    city,
    firstName,
    lastName,
    language,
    referralCode,
    carModel,
    carYear,
    licensePlate,
    carColor,
    nationalId,
    driverLicense,
    profilePhoto,
    licenseFront,
    proofOfInsurance,
    roadworthinessSticker,
    ghanaCard,
    password,
    driverProfile,
  };
};

const postAuthentication = async (credentials) => {
  return await request(app).post("/api/1.0/auth").send(credentials);
};

const postLogout = (options = {}) => {
  const agent = request(app).post("/api/1.0/logout");
  if (options.token) {
    agent.set("Authorization", `Bearer ${options.token}`);
  }
  return agent.send();
};

/* AUTHENTICATION PHASE */
describe("Authentication", () => {
  it("returns 200 when credentials are correct", async () => {
    await addDriver();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.status).toBe(200);
  });

  it("returns only driver id, profile information and token when login success", async () => {
    const driver = await addDriver();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });

    const token = await Token.findOne({
      where: {
        driverId: driver.id,
      },
    });

    expect(response.body.id).toBe(driver.id);
    expect(response.body.profilePhoto).toBe(driver.profilePhoto);
    expect(response.body.token).toBe(token.token);
  });

  it("returns 401 when driver does not exist", async () => {
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.status).toBe(401);
  });

  it("returns proper error body when authentication fails", async () => {
    const nowInMillis = new Date().getTime();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    const error = response.body;
    expect(error.path).toBe("/api/1.0/auth");
    expect(error.timestamp).toBeGreaterThan(nowInMillis);
    expect(Object.keys(error)).toEqual(["path", "timestamp", "message"]);
  });

  it(`returns ${msg.authentication_failure} when authication fails`, async () => {
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.message).toBe(msg.authentication_failure);
  });

  it("returns 401 when password is wrong", async () => {
    await addDriver();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "password",
    });
    expect(response.status).toBe(401);
  });

  it("returns 401 when email is not valid", async () => {
    const response = await postAuthentication({
      password: "P4ssword",
    });
    expect(response.status).toBe(401);
  });

  it("returns 401 when password is not valid", async () => {
    await addDriver();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "",
    });
    expect(response.status).toBe(401);
  });

  it("returns token in response body when credentials are correct", async () => {
    await addDriver();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });
    expect(response.body.token).not.toBeUndefined();
  });
});

/* LOGOUT */
describe("Logout", () => {
  it("returns 200 ok when unauthorized reqest sent for logout", async () => {
    const response = await postLogout();
    expect(response.status).toBe(200);
  });
  it("removes the token from database", async () => {
    await addDriver();
    const response = await postAuthentication({
      email: "user1@mail.com",
      password: "P4ssword",
    });

    const token = response.body.token;
    await postLogout({ token: token });
    const storedToken = await Token.findOne({ where: { token: token } });
    expect(storedToken).toBeNull();
  });
});

/* TOKEN EXPIRATION */
