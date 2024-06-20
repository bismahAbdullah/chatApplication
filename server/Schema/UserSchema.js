// validators/userValidator.js

const { z } =require("zod") ;

const userSignupSchema = z.object({
   
    username: z.string(),
  email: z.string().email(),
  password: z.string().min(7),
  displayName: z.string()
});

const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(7),
});



module.exports = { 
     userSignupSchema, userLoginSchema };