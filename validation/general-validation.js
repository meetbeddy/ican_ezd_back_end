const _ = require("lodash");
const Validator = require("validator");

module.exports = {
  login: function (data) {
    const errors = {};
    data.password = data.password === undefined ? "" : data.password;
    data.email = data.email === undefined ? "" : data.email;

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  },
  register: function (data) {
    let errors = {};
    data.email = data.email === undefined ? "" : data.email;
    data.password = data.password === undefined ? "" : data.password;
    data.confirm_password =
      data.confirm_password === undefined ? "" : data.confirm_password;
    data.bankName = data.bankName === undefined ? "" : data.bankName;
    data.tellerNumber =
      data.tellerNumber === undefined ? "" : data.tellerNumber;
    data.name = data.name === undefined ? "" : data.name;
    data.phone = data.phone === undefined ? "" : data.phone;
    data.gender = data.gender === undefined ? "" : data.gender;
    data.tshirtSize = data.tshirtSize === undefined ? "" : data.tshirtSize;
    data.memberStatus =
      data.memberStatus === undefined ? "" : data.memberStatus;
    data.icanCode = data.icanCode === undefined ? "" : data.icanCode;
    data.memberCategory =
      data.memberCategory === undefined ? "" : data.memberCategory;
    data.memberAcronym =
      data.memberAcronym === undefined ? "" : data.memberAcronym;
    data.nameOfSociety =
      data.nameOfSociety === undefined ? "" : data.nameOfSociety;
    data.venue = data.venue === undefined ? "" : data.venue;

    if (Validator.isEmpty(data.bankName)) {
      errors.bankName = "bankName field is required";
    }
    if (Validator.isEmpty(data.venue)) {
      errors.venue = "venue field is required";
    }
    if (Validator.isEmpty(data.tellerNumber)) {
      errors.tellerNumber = "tellerNumber field is required";
    }
    if (Validator.isEmpty(data.name)) {
      errors.name = "name field is required";
    }
    if (Validator.isEmpty(data.phone)) {
      errors.phone = "phone field is required";
    }
    if (Validator.isEmpty(data.gender)) {
      errors.gender = "gender field is required";
    }
    if (Validator.isEmpty(data.tshirtSize)) {
      errors.tshirtSize = "T-Shirt Size field is required";
    }
    if (Validator.isEmpty(data.memberStatus)) {
      errors.memberStatus = "memberStatus field is required";
    }

    if (
      !Validator.isEmpty(data.memberStatus) &&
      data.memberStatus.toLowerCase() === "member"
    ) {
      if (Validator.isEmpty(data.icanCode)) {
        errors.icanCode = "ICAN Code field is required";
      }
      if (Validator.isEmpty(data.memberCategory)) {
        errors.memberCategory = "Member Category field is required";
      }
      if (Validator.isEmpty(data.memberAcronym)) {
        errors.memberAcronym = "Member Acronym field is required";
      }
      if (Validator.isEmpty(data.nameOfSociety)) {
        errors.nameOfSociety = "nameOfSociety field is required";
      }
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.confirm_password)) {
      errors.confirm_password = "Confirm Password field is required";
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
      errors.confirm_password = "Passwords must match";
    }
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  },
  getUser: (data) => {
    let errors = {};

    data.id = data.id === undefined ? "" : data.id;
    if (Validator.isEmpty(data.id)) {
      errors.id = "ID field is required";
    }
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  },
};
