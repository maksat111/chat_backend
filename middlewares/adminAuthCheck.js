const Admin = require('../models/admins');
const fetch = require('node-fetch-commonjs');

const adminAuth = async (req, res, next) => {
    try {
        fetchOptions = {
            method: "GET",
            headers: {
                "Authorization": req.headers['authorization'],
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch(`${process.env.API_URL}/admin/auth/me`, fetchOptions).then(async data => {
            const jsonData = await data.json();

            if (!data.ok) {
                return res.status(data.status).send(jsonData);
            }

            let foundAdmin = await Admin.findOne({
                id: jsonData.data.id
            });

            if (!foundAdmin) {
                const newAdmin = new Admin({
                    id: jsonData.data.id,
                    firstname: jsonData.data.firstname,
                    lastname: jsonData.data.lastname,
                    updated_at: Date.now(),
                    created_at: Date.now()
                });
                foundAdmin = await newAdmin.save();
            }

            if (foundAdmin.firstname !== jsonData.data.firstname || foundAdmin.lastname !== jsonData.data.lastname) {
                await Admin.updateOne({
                    id: jsonData.data.id
                }, {
                    $set: {
                        firstname: jsonData.data.firstname,
                        lastname: jsonData.data.lastname,
                        updated_at: Date.now()
                    }
                });
            }

            req.foundAdmin = foundAdmin;
            next()
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}

module.exports = adminAuth;