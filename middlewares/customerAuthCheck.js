const Customer = require('../models/customers');
const fetch = require('node-fetch-commonjs');

const customerAuth = async (req, res, next) => {
    try {
        fetchOptions = {
            method: "GET",
            headers: {
                "Authorization": req.headers['authorization'],
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(`${process.env.API_URL}/auth/me`, fetchOptions).then(async data => {
            const jsonData = await data.json();

            if (!data.ok) {
                return res.status(data.status).json(jsonData);
            }

            let foundCustomer = await Customer.findOne({
                id: jsonData.data.user.id
            });

            if (!foundCustomer) {
                const newCustomer = new Customer({
                    id: jsonData.data.user.id,
                    firstname: jsonData.data.user.firstname,
                    lastname: jsonData.data.user.lastname,
                    updated_at: Date.now(),
                    created_at: Date.now()
                });
                foundCustomer = await newCustomer.save();
            }

            const differenceInHours = (Date.now() - new Date(foundCustomer.updated_at)) / 1000 / 60 / 60;

            if (differenceInHours > 1) {
                await Customer.updateOne({
                    id: jsonData.data.user.id
                }, {
                    $set: {
                        firstname: jsonData.data.user.firstname,
                        lastname: jsonData.data.user.lastname,
                        updated_at: Date.now()
                    }
                });
            }

            req.foundCustomer = foundCustomer;
            next()
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

module.exports = customerAuth;