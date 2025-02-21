const prisma = require("../prisma/prisma")
const bcrypt = require("bcryptjs");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = (req, res, next) => 
    res.render("index", { user: req.user, title: "Sign Up Form"});
    

exports.user_create_get = (req, res) => res.render("sign-up-form")
    
exports.user_create_post =
async (req, res, next) => {
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   await prisma.user.create({
    data: {
      username: req.body.username,
      password: hashedPassword,
    },
  });
   res.redirect("/");
  } catch (error) {
     console.error(error);
     next(error);
    }
 }
/* [

    body("username")
    .trim()
    .isAlphanumeric("en-US")
    .escape(),
    body("password")
    .trim()
    .isStrongPassword()
    .escape(), 
    body("confirm_password")
    .custom((value, {req}) => {
        return value === req.body.password;
    }), 

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("sign_up", {
                title: "Sign Up",
                errors: errors.array(),
            });
        }

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await prisma.user.create({
                data: {
                  username: req.body.username,
                  password: hashedPassword,
                },
              });
            res.redirect("/");
        }
        catch(error) {
            next(error);
        }
    }
]; */

exports.user_login_get = asyncHandler(async (req, res, next) =>
{
    res.render("log_in", {
        title: "Log In"
    })
});

exports.user_login_post =  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  });


exports.user_logout_get = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }