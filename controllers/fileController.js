const prisma = require("../prisma/prisma")

exports.file_create_get = async (req, res, next) => {
    const folders = await prisma.folder.findMany();
    if (folders.length === 0) {
        res.redirect("/")
    }
    else {
    res.render("create_file", { user: req.user, folders: folders});
    }
}

exports.file_create_post = async (req, res, next) => {};