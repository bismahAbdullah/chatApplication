// validators/profileValidator.js

const { z } = require("zod");

const profileSchema = z.object({
  userid: z.number(),
  profile_description: z.string().nullable(),
  online_status: z.boolean().default(false),
  mobile_number: z.string().nullable(),
  profile_picture: z.string().nullable()
});

module.exports = { 
  profileSchema
};
