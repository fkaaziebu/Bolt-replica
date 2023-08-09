const request = require("supertest");
const app = require("../src/app");
const Driver = require("../src/driver/Driver");
const sequelize = require("../src/config/database");
const bcrypt = require("bcrypt");
const msg = require("../src/messages");
const path = require("path");
const fs = require("fs");

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync();
  }
});

beforeEach(async () => {
  await Driver.destroy({ truncate: { cascase: true } });
});

const validDriver = {
  email: "user1@mail.com",
  driverLicense: "GHB4355ioiFDFCV",
  activationToken: null,
  isActivated: true,
};

const addDriverToDatabase = async (driver = { ...validDriver }) => {
  return await Driver.create({
    ...driver,
  });
};

const loginCredentials = {
  email: validDriver.email,
  password: "P4ssword",
};

const postAuthentication = async (credentials = { ...loginCredentials }) => {
  return await request(app).post("/api/1.0/auth/login").send(credentials);
};

const readFileAsBase64 = (file = "test-png.png") => {
  const filePath = path.join(".", "__tests__", "resources", file);
  return fs.readFileSync(filePath, { encoding: "base64" });
};

const profile = {
  email: "user1@mail.com",
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
  profilePhoto: readFileAsBase64(),
  licenseFront: readFileAsBase64(),
  proofOfInsurance: readFileAsBase64(),
  roadworthinessSticker: readFileAsBase64(),
  ghanaCard: readFileAsBase64(),
};

const updateProfile = async (options = {}, profile = { ...profile }, id) => {
  const agent = request(app).post("/api/1.0/drivers/profile/" + options.id);
  if (options.token) {
    agent.set("Authorization", `Bearer ${options.token}`);
  }
  return agent.send(profile);
};

describe("Profile Completion", () => {
  // Error cases
  it("returns isProfileComplete false when profile is not complete", async () => {
    const hash = await bcrypt.hash("P4ssword", 10);
    const driver = await addDriverToDatabase({
      ...validDriver,
      password: hash,
    });

    const response = await postAuthentication();

    expect(response.body.isProfileComplete).toBe(false);
  });

  it("returns isProfileComplete to be false when the profile informations provided are not complete", async () => {
    const hash = await bcrypt.hash("P4ssword", 10);
    const driver = await addDriverToDatabase({
      ...validDriver,
      password: hash,
    });

    const authResponse = await postAuthentication();
    profile["profilePhoto"] = null;
    const response = await updateProfile({ ...authResponse.body }, profile);
    console.log("The body:", response.body);
    expect(response.body.isProfileComplete).toBe(false);
  });

  // Success cases
  it("returns isProfile Complete to be true when the profile informations provided are complete", async () => {
    const hash = await bcrypt.hash("P4ssword", 10);
    const driver = await addDriverToDatabase({
      ...validDriver,
      password: hash,
    });

    const authResponse = await postAuthentication();
    const response = await updateProfile({ ...authResponse.body }, profile);
    console.log("The body:", response.body);
    expect(response.body.isProfileComplete).toBe(false);
  });
});
