const express = require("express");
module.exports = function bodyParser(req, res, next) {
    express.json()(req, res, () => {
        express.urlencoded({ extended: true })(req, res, next);
    });
};
