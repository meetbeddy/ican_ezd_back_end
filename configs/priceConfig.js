
const PRICE_CONFIG = {
    physical: {
        nonmember: 70000,
        "full-paying member": 60000,
        "half-paying member": 45000,
        "young-accountants": 40000,
        "student-member": 30000,
    },
    virtual: {
        default: 25000,
    },
    special: {
        admin: 0,
        planning: 0,
    },
};

module.exports = PRICE_CONFIG;
