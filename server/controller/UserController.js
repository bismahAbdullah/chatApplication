
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../utils/db.js');
const fs = require('fs');
const { userSignupSchema ,userLoginSchema} = require('../Schema/UserSchema.js');
const { profileSchema } = require('../Schema/ProfileSchema.js');


const writeProfilePictureToDB = async (userId, profileIconPath) => {
    try {
        // Read image file as binary
        const profileIcon = fs.readFileSync(profileIconPath);
        // Insert the profile picture into the database
        const query = 'UPDATE userProfile SET profile_picture = $1 WHERE userid = $2';
        await client.query(query, [profileIcon, userId]);
    } catch (error) {
        console.error('Error writing profile picture to DB:', error);
    }
};

const signUpUser = async (req, res) => {
    const parsed = userSignupSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
    }

    const { email, password, displayName, username } = parsed.data;

    try {
        // Check if email already exists
        const emailCheckQuery = 'SELECT 1 FROM users WHERE email = $1';
        const emailCheckResult = await client.query(emailCheckQuery, [email]);
        
        if (emailCheckResult.rowCount > 0) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Generate user ID and hash password
        const id = Math.floor(Math.random() * 1000) + 1;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const query = 'INSERT INTO users (id, email, password, "displayName", username) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [id, email, hashedPassword, displayName, username];
        const result = await client.query(query, values);

        // Create a default profile for the user
        const defaultProfileValues = {
            userid: result.rows[0].id,
            profile_description: null,
            online_status: false,
            mobile_number: null,
            profile_picture: null // Default profile picture is null initially
        };

        const parsedProfile = profileSchema.safeParse(defaultProfileValues);
        if (!parsedProfile.success) {
            return res.status(400).json({ error: parsedProfile.error.errors });
        }

        const profileQuery = 'INSERT INTO userprofile (userid, profile_description, online_status, mobile_number, profile_picture) VALUES ($1, $2, $3, $4, $5)';
        await client.query(profileQuery, [
            parsedProfile.data.userid,
            parsedProfile.data.profile_description,
            parsedProfile.data.online_status,
            parsedProfile.data.mobile_number,
            parsedProfile.data.profile_picture
        ]);

        // Save profile picture to database
        const profileIconPath = '/home/qlu/chatApplication/server/resources/userIcon.svg' // Path to the default profile picture
        await writeProfilePictureToDB(parsedProfile.data.userid, profileIconPath);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505' && err.constraint === 'users_username_key') {
            return res.status(409).json({ error: "Username already exists" });
        }
        res.status(500).json({ error: err.message });
    }
};


const loginUser = async (req, res) => {
   
    
        try {
            // Validate request body
            const parsed = userLoginSchema.safeParse(req.body);
    
            if (!parsed.success) {
                return res.status(400).json({ error: parsed.error.errors });
            }
    
            const { email, password } = parsed.data;
    
            // Check if user exists in the database
            const query = 'SELECT * FROM users WHERE email = $1';
            const result = await client.query(query, [email]);
            const user = result.rows[0];
    
            if (!user) {
                console.log('User not found');
                return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            // Verify password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                console.log('Password does not match');
                return res.status(401).json({ error: 'Invalid email or password' });
            }
    
            // Generate JWT token
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Token expires in 1 hour
            });
    
            // Update online_status to true
            await client.query('UPDATE userProfile SET online_status = true WHERE userid = $1', [user.id]);
    
            // Schedule a task to update online_status to false after token expiration
            setTimeout(async () => {
                await client.query('UPDATE userProfile SET online_status = false WHERE userid = $1', [user.id]);
            }, 3600000); // 1 hour in milliseconds
    
            res.status(201).json({ token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    
    
    
    
    // try {
    //     // Validate request body
    //     const parsed = userLoginSchema.safeParse(req.body);

    //     if (!parsed.success) {
    //         return res.status(400).json({ error: parsed.error.errors });
    //     }

    //     const { email, password } = parsed.data;

    //     // Check if user exists in the database
    //     const query = 'SELECT * FROM users WHERE email = $1';
    //     const result = await client.query(query, [email]);
    //     const user = result.rows[0];

    //     if (!user) {
    //         console.log('User not found');
    //         return res.status(401).json({ error: 'Invalid email or password' });
    //     }

    //     // Verify password
    //     const passwordMatch = await bcrypt.compare(password, user.password);
    //     if (!passwordMatch) {
    //         console.log('Password does not match');
    //         return res.status(401).json({ error: 'Invalid email or password' });
    //     }

    //     // Generate JWT token
    //     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    //         expiresIn: '1h', // Token expires in 1 hour
    //     });

    //     res.status(201).json({ token });
    // } catch (error) {
    //     console.error('Error logging in:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
   
};
const getUserIdFromToken = async (req, res) => {
    try {
      // Assuming req.user contains the decoded JWT payload with userId
      const userId = req.user.userId;
      console.log(req.user)
      
      // Query the database to get the username based on userId
      const usernameQuery = 'SELECT username FROM users WHERE id = $1';
      const { rows } = await client.query(usernameQuery, [userId]);
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const username = rows[0].username;
      
      // Return the username as JSON response
      res.status(200).json({ username });
        
    } catch (error) {
      console.error('Error decoding token:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const getUsernames= async(req,res)=>{
    
    
    try {
        // Extract user ID from the request object (set by the middleware)
        const userId = req.user.id;
        console.log(userId)
    
        // Query the database to get all usernames except the one of the logged-in user
        const usernamesQuery = 'SELECT username FROM users WHERE id != $1';
        const usernamesResult = await client.query(usernamesQuery, [userId]);
        const usernames = usernamesResult.rows.map((row) => row.username);
    
        // Return the list of usernames as a response
        res.status(200).json({ usernames });
      } catch (error) {
        console.error('Error fetching usernames:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
module.exports = {
    signUpUser,
    loginUser,
    getUsernames,
    getUserIdFromToken
};
