import app from "../src/app";

describe("authentication", () => {
  it("registered the authentication service", () => {
    expect(app.service("authentication")).toBeTruthy();
  });

  describe("local strategy", () => {
    const userInfo = {
      email: "someone@example.com",
      password: "supersecret"
    };

    beforeAll(async () => {
      try {
        await app.service("users").create(userInfo);
      } catch (error) {
        // Do nothing, it just means the userSchema already exists and can be tested
      }
    });

    it("authenticates userSchema and creates accessToken", async () => {
      const { user, accessToken } = await app.service("authentication").create({
        strategy: "local",
        ...userInfo
      }, {});

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });
});
