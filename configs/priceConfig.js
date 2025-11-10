
const PRICE_CONFIG = {
    physical: {
        nonmember: 60000,
        "full-paying member": 50000,
        "half-paying member": 25000,
        "young-accountants": 35000,
    },
    virtual: {
        default: 30000,
    },
    special: {
        admin: 0,
        planning: 0,
    },
};

module.exports = PRICE_CONFIG;
