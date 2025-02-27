const prisma = require("../db/prisma");
const { uploadToCloudinary } = require("../storage/cloudinary_config");
const fs = require('fs');
const path = require("node:path");

exports.file_create_get = async (req, res, next) => {
    const folders = await prisma.folder.findMany();
    if (folders.length === 0) {
        res.redirect("/")
    }
    else {
    res.render("create_file", { user: req.user, folders: folders});
    }
}

exports.file_create_post = async (req, res, next) => {
    try {
        const fileUrl = await uploadToCloudinary(req.file.path);
        const KB_convert = parseFloat(req.file.size / 1024).toFixed(2);
        const file = await prisma.file.create({
         data: {
           name: req.file.originalname,
           userId: req.user.id,
           folderId: parseInt(req.body.folder),
           url: fileUrl,
           size: KB_convert,
           mimetype: req.file.mimetype,
           path: req.file.path
         },
       });
        res.redirect(`/file/${file.id}`);
       } catch (error) {
          console.error(error);
          next(error);
         }
}

exports.file_read_get = async (req, res, next) => {
    const file = await prisma.file.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
    const fileAuthor = await prisma.user.findUnique({
        where: {
          id: file.userId,
        },
      });
    const folder = await prisma.folder.findUnique({
        where: {
          id: file.folderId,
        },
      });
    res.render("file_view", {file: file, author: fileAuthor, folder: folder});
}

exports.file_update_get = async (req, res, next) => {
    const folders = await prisma.folder.findMany();
    res.render("create_file", { user: req.user, folders: folders});
}

exports.file_update_post = async (req, res, next) => {
    try {
        const fileUrl = await uploadToCloudinary(req.file.path);
        const file = await prisma.file.update({
            where: {
              id: parseInt(req.params.id),
            },
            data: {
                name: req.file.originalname,
                userId: req.user.id,
                folderId: parseInt(req.body.folder),
                url: fileUrl,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path: req.file.path,
            },
          })
        res.redirect(`/file/${file.id}`);
       } catch (error) {
          console.error(error);
          next(error);
         }
}

exports.file_delete_post = async (req, res, next) => {
    await prisma.file.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.redirect("/");
}

exports.file_download_post = (req, res, next) => {}