const prisma = require("../db/prisma");
const asyncHandler = require("express-async-handler");

exports.folder_create_get = async (req, res, next) => 
    res.render("create_folder", { user: req.user, title: "Sign Up Form"});


exports.folder_create_post = async (req, res, next) => {
    try {
     await prisma.folder.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });
    const folder = await prisma.folder.findUnique({
        where: {
          name: req.body.name,
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
          id: parseInt(req.params.id),
        },
      });
    res.render("folder_view", {folder: folder});
}

exports.folder_read_post = (req, res, next) => {}

exports.folder_update_get = (req, res, next) => {}

exports.folder_update_post = (req, res, next) => {}

exports.folder_delete_get = (req, res, next) => {}

exports.folder_delete_post = (req, res, next) => {}