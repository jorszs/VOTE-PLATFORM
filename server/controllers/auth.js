const jwt = require('../services/jwt');
const moment = require('moment');
const User = require('../models/user');

function willExpiredToken(token) {
    const { exp } = jwt.decodedToken(token);
    const currentDate = moment().unix();

    if (currentDate > exp) {
        return true;
    }
    return false;
}

function refreshAccesToken(req, res) {
    //console.log("estamos refrescando el access token");
    const { refreshToken } = req.body;

    const isTokenExpired = willExpiredToken(refreshToken)
    //console.log(isTokenExpired);
    if (isTokenExpired) {
        res.status(404).send({
            message: "El refreshToken ha caducado."
        });
    } else {
        const { id } = jwt.decodedToken(refreshToken);

        User.findOne({ _id: id }, (err, userStored) => {
            if (err) {
                res.status(500).send({
                    message: "error del servidor."
                })
            } else {
                if (!userStored) {
                    res.status(404).send({ message: "usuario no encontrado" })
                } else {
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStored),
                        refreshToken: refreshToken
                    })
                }
            }
        })
    }
}

module.exports = {
    refreshAccesToken
}