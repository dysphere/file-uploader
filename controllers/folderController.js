const prisma = require("../prisma/prisma")
const asyncHandler = require("express-async-handler");

exports.folder_create_get = (req, res, next) => 
    res.render("create_folder", { user: req.user, title: "Sign Up Form"});


exports.folder_create_post = async (req, res, next) => {
    try {
     await prisma.folder.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });
    const folder = await prisma.folder.findFirst({
        where: {
          email: 'elsa@prisma.io',
        },
      })
     res.redirect(`/folder/${folder.id}`);
    } catch (error) {
       console.error(error);
       next(error);
      }
   }

exports.folder_read_get = async (req, res, next) => {
    const folder = await prisma.folder.findUnique({
        where: {
          id: req.params.id,
        },
      });
    res.render("folder_view", {folder: folder});
}

exports.folder_read_post = (req, res, next) => {}

exports.folder_update_get = (req, res, next) => {}

exports.folder_update_post = (req, res, next) => {}

exports.folder_delete_get = (req, res, next) => {}

exports.folder_delete_post = (req, res, next) => {}