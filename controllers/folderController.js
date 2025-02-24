const prisma = require("../db/prisma");

exports.folder_create_get = async (req, res, next) => {
    res.render("create_folder", { user: req.user, title: "Sign Up Form"});
}


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

exports.folder_update_get = async (req, res, next) => {
  const folder = await prisma.folder.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
  res.render("update_folder", {user: req.user, folder: folder});
}

exports.folder_update_post = async (req, res, next) => {
  try {
    await prisma.folder.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    })
    res.redirect(`/folder/${folder.id}`);
   } catch (error) {
      console.error(error);
      next(error);
     }
}


exports.folder_delete_post = async (req, res, next) => {
  await prisma.folder.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.redirect("/");
}

exports.folders_delete = async (req, res, next) => {
  await prisma.folder.deleteMany({});
  await prisma.$executeRaw`ALTER SEQUENCE "folder_id_seq" RESTART WITH 1;`; // PostgreSQL
  res.redirect("/");
}