const prisma = require("../prisma/prisma")

exports.folder_create_get = (req, res, next) => 
    res.render("create_folder", { user: req.user, title: "Sign Up Form"});

exports.folder_create_post = async (req, res, next) => {
    /*
    await prisma.folder.create({
        data: {
          
        },
      }); */
};