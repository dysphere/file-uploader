const prisma = require("../prisma/prisma")

exports.file_create_get = (req, res, next) => 
    res.render("create_file", { user: req.user});

exports.file_create_post = async (req, res, next) => {};