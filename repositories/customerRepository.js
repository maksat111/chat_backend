const Customer = require('../models/customers');

const findCustomer = async (customer_id) => {
    const foundCustomer = await Customer.findOne({ id: customer_id });
    return foundCustomer;
}

exports.findCustomer = findCustomer;