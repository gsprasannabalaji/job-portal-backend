const express = require("express");
const User = require("../model/user");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const validateEmail = require("../middlewares/validateEmail");
const validatePassword = require("../middlewares/validatePassword");
const fs = require("fs");
const validateFullName = require("../middlewares/validateFullName");

router.get("/getAll", async (req, res) => {
  /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Retrieve all users'
      #swagger.description = 'Gets a list of all users, including their full names, email addresses, and hashed passwords.'
      #swagger.responses[200] = {
            description: 'A list of users',
            schema: [
              {
                "password": "$2b$10$N9qo8uLOickgx2ZMRZoMye",
                "fullName": "Jane Doe",
                "email": "jane.doe@example.com"
              }
            ]
      }
      #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: {
              "message": "Internal Server Error"
            }
      } 
  */
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error"});
  }
});

router.post("/create", validateEmail, validatePassword, validateFullName, async (req, res) => {
  /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Create a new user'
      #swagger.description = 'Creates a new user with full name, email, and password. Includes validation for email and enforces strong password rules.'
      #swagger.parameters['body'] = {
            in: 'body', 
            required: true,
            "@schema": {
                "type": 'object',
                "properties": {
                    "fullName": { type: 'string', description: 'Full name of the user' },
                    "email": { type: 'string', format: 'email', description: 'Email address of the user' },
                    "password": { type: 'string', description: 'Password for the user' }
                },
              "required": ['fullName', 'email', 'password']
        }  
      }
      #swagger.responses[201] = {
            description: 'User created successfully',
            schema: {
              "message": "User created successfully"
            }
      }
      #swagger.responses[400] = {
            description: 'Bad Request - Validation error',
            schema: {
              "message": "Invalid email address"
            }
      } 
      #swagger.responses[409] = {
            description: 'User already exists',
            schema: {
              "message": "User created successfully"
            }
      } 
      #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: {
              "message": "Internal Server Error"
            }
      }
  */
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error"});
  }
});

router.put("/edit", validateEmail, validatePassword, validateFullName, async (req, res) => {
  /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Update user details'
      #swagger.description = 'Updates an existing user's full name and password based on the provided email. Email cannot be updated.'
      #swagger.parameters['body'] = {
            in: 'body', 
            "@schema": {
                "type": 'object',
                "properties": {
                    "fullName": { type: 'string', description: 'Full name of the user' },
                    "email": { type: 'string', format: 'email', description: 'Email address of the user' },
                    "password": { type: 'string', description: 'Password for the user' }
                },
              "required": ['email']
        }  
      }
      #swagger.responses[200] = {
            description: "User updated successfully",
            schema: {
              "message": "User updated successfully"
            }
      }
      #swagger.responses[400] = {
            description: 'Bad Request',
            schema: {
              "message": "email is required"
            }
      }
      #swagger.responses[404] = {
            description: 'Not found',
            schema: {
              "message": "User not found"
            }
      }
      #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: {
              "message": "Internal Server Error"
            }
      }
  */
  try {
    const reqObj = { email: req.body.email };
    const user = await User.findOne(reqObj);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findOneAndUpdate(reqObj, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error"});
  }
});

router.delete("/delete", async (req, res) => {
  /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Delete a user'
      #swagger.description = 'Deletes a user by email.'
      #swagger.parameters['email'] = {
            in: 'query',
            type: 'string',
            required: true,
      } 
      #swagger.responses[200] = {
            description: 'User deleted successfully',
            schema: {
              "message": "User deleted successfully"
            }
      }
      #swagger.responses[400] = {
            description: 'Bad Request',
            schema: {
              "message": "EmailId is required"
            }
      }
      #swagger.responses[404] = {
            description: 'Not found',
            schema: {
              "message": "User not found"
            }
      }
      #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: {
              "message": "Internal Server Error"
            }
      }
  */
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ message: "EmailId is required" });
    }
    const reqObj = { email };
    const user = await User.findOne(reqObj);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    await User.deleteOne(reqObj);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error"});
  }
});

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      cb(new Error("User not found!"));
      return;
    }
    const userFolderPath = `images/${req.body.email}/`;

    fs.mkdirSync(userFolderPath, { recursive: true });
    cb(null, userFolderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Image File type not supported! Only image/jpeg, image/gif and image/png is supported"
        )
      );
    }
  },
});

router.post("/uploadImage", async function (req, res) {
  /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Upload user image'
      #swagger.description = 'Uploads an image for a user and stores the image path in the database.'
      #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['email'] = {
            in: 'formData',
            type: 'string',
            required: 'true',
      }
      #swagger.parameters['image'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
      }
      #swagger.responses[200] = {
            description: 'Image uploaded successfully',
            schema: {
              "message": "Image uploaded successfully",
              "imagePath": "/images/uploads/user123abc.jpg"
            }
      }
      #swagger.responses[400] = {
            description: 'Bad Request',
            schema: {
              "message": "Image File type not supported! Only image/jpeg, image/gif and image/png is supported"
            }
      }
      #swagger.responses[404] = {
            description: 'Not found',
            schema: {
              "message": "User not found"
            }
      } 
      #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: {
              "message": "Internal Server Error"
            }
      } 
  */
  try {
    upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Image is required!" });
      }
      res.status(200).json({
        message: "Image uploaded successfully",
        imagePath: req.file.path,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error"});
  }
});

module.exports = router;
