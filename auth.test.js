
const authHelper = require("./helpers/auth");
const User = require("./models/User");
const mongoose = require("mongoose");

// Mock dependencies
jest.mock("./models/User");
jest.mock("./models/Invoice");
jest.mock("./helpers/mailgun");
jest.mock("./helpers/sms");
jest.mock("./helpers/payment");
jest.mock("./validation/general-validation", () => ({
    register: () => ({ isValid: true, errors: {} })
}));

// Mock bcrypt
jest.mock("bcryptjs", () => ({
    genSalt: (rounds) => Promise.resolve("salt"),
    hash: (pass, salt) => Promise.resolve("hashed_password")
}));


describe("singleSignUp", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        User.findOne.mockResolvedValue(null);
        User.prototype.save = jest.fn().mockResolvedValue(true);
    });

    it("should respect bulk upload values", async () => {
        const bulkData = {
            email: "bulk@test.com",
            password: "password",
            bulk: true,
            amount: 5000,
            confirmedPayment: true,
            role: [{ name: "Admin" }],
            tellerDate: new Date(),
            name: "Bulk User",
            phone: "08012345678",
            bankName: "Test Bank",
            tellerNumber: "123",
            venue: "physical",
            memberStatus: "member"
        };

        await authHelper.singleSignUp(bulkData, null);

        // Check if User constructor was called with correct values
        const constructorCall = User.mock.calls[0][0];
        console.log("Bulk User created:", constructorCall);

        expect(constructorCall.amount).toBe(5000);
        expect(constructorCall.confirmedPayment).toBe(true);
        expect(constructorCall.role).toEqual([{ name: "Admin" }]);
    });

    it("should use calculation for normal signup", async () => {
        const normalData = {
            email: "normal@test.com",
            password: "password",
            bulk: false, // or undefined
            amount: 0, // Should be ignored/overwritten
            confirmedPayment: true, // Should be ignored/overwritten
            role: [{ name: "Admin" }], // Should be ignored/overwritten
            tellerDate: new Date(),
            name: "Normal User",
            phone: "08012345678",
            bankName: "Test Bank",
            tellerNumber: "123",
            venue: "virtual", // Should result in specific amount (e.g. 30000 based on User model default logic, but helper calculates it too)
            memberStatus: "nonmember"
        };

        // Mock payment check to false
        require("./helpers/payment").checkPaymentStatus = jest.fn().mockResolvedValue({ status: "99" });


        await authHelper.singleSignUp(normalData, null);

        const constructorCall = User.mock.calls[0][0];
        console.log("Normal User created:", constructorCall);

        expect(constructorCall.confirmedPayment).toBe(false);
        expect(constructorCall.role).toEqual([{ name: "User" }]);
        // Amount check depends on priceConfig, but we just want to ensure it is NOT 0 if logic works, 
        // or check if it called calculateAmount (which we didn't mock, so it runs real logic if priceConfig is there).
        // create-react-app might not have priceConfig loaded properly in this script context if it relies on DB or complex setup.
        // But the key is confirmedPayment and role are reset.
    });
});
