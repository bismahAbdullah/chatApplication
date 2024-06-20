const express = require('express');
const client = require('../utils/db'); // Assuming you have a database client configured
// Import Zod schemas for validation
const { profileSchema } = require('../Schema/ProfileSchema');
const { userLoginSchema } = require('../Schema/UserSchema');

const getProfileInfo= async(req,res)=>{
    try {
        // Validate request parameters
        const { username } = req.params;
        if (!username) {
          return res.status(400).json({ error: 'Username is required' });
        }
    
        // Query user table to get user data
        const userQuery = 'SELECT * FROM users WHERE username = $1';
        const userResult = await client.query(userQuery, [username]);
    
        // If user not found, return error
        if (userResult.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Extract userid from user data
        const { id } = userResult.rows[0];
      
    
        // Query profile table to get profile data
        const profileQuery = 'SELECT * FROM userprofile WHERE userid = $1';
        const profileResult = await client.query(profileQuery, [id]);
        console.log(id)
    
        // If profile not found, return error
        if (profileResult.rows.length === 0) {
          return res.status(404).json({ error: 'Profile not found' });
        }
    
        // Combine user and profile data
        const userData = userResult.rows[0];
        const profileData = profileResult.rows[0];
        const combinedData = { userData, profileData };
    
        // Validate combined data against profile schema
        // const validatedData = profileSchema.safeParse(combinedData);
        // if (!validatedData.success) {
        //   return res.status(500).json({ error: 'Invalid data' });
        // }
    
        // Send combined and validated data as response
        // res.json(userData);
         res.json(combinedData)
      } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

}

const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { profile_description, new_username, display_name } = req.body;

    // Validate request parameters
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Query to get user ID from users table
    const getUserIDQuery = 'SELECT id FROM users WHERE username = $1';
    const userIDResult = await client.query(getUserIDQuery, [username]);

    if (userIDResult.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userID = userIDResult.rows[0].id;

    // Begin a transaction
    await client.query('BEGIN');

    // Query to update users table
    const updateUserQuery = `
      UPDATE users
      SET 
        username = $1,
        "displayName" = $2
      WHERE id = $3
    `;
    await client.query(updateUserQuery, [new_username, display_name, userID]);

    // Query to update userProfile table
    const updateUserProfileQuery = `
      UPDATE userprofile
      SET 
        profile_description = $1
      WHERE userid = $2
    `;
    await client.query(updateUserProfileQuery, [profile_description, userID]);

    // Commit the transaction
    await client.query('COMMIT');

    // Return success message
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Internal server error' });
  }

};

const updateEmailAndPhone = async (req, res) => {
  
    try {
      const { username } = req.params;
      const { email, phone_number } = req.body;
  
      // Validate request parameters
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }
  
      // Query to get user ID from users table
      const getUserIDQuery = 'SELECT id FROM users WHERE username = $1';
      const userIDResult = await client.query(getUserIDQuery, [username]);
  
      if (userIDResult.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userID = userIDResult.rows[0].id;
  
      // Begin a transaction
      await client.query('BEGIN');
  
      // Query to update users table
      const updateUserQuery = `
        UPDATE users
        SET email = $1
        WHERE id = $2
      `;
      await client.query(updateUserQuery, [email, userID]);
  
      // Query to update userProfile table
      const updateUserProfileQuery = `
        UPDATE userprofile
        SET mobile_number = $1
        WHERE userid = $2
      `;
      await client.query(updateUserProfileQuery, [phone_number, userID]);
  
      // Commit the transaction
      await client.query('COMMIT');
  
      // Return success message
      res.status(200).json({ message: 'Email and phone number updated successfully' });
    } catch (error) {
      console.error('Error updating email and phone number:', error);
      // Rollback the transaction in case of error
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'Internal server error' });
    }
  
};

module.exports={
    getProfileInfo,
    updateProfile,
    updateEmailAndPhone
}