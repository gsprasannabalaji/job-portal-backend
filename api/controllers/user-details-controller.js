import * as userDetailsService from "../services/user-details-service.js";
import { setResponse, setError } from "../utilities/response-handler.js";

export const getUser = async (req, res) => {
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
    const result = await userDetailsService.search({}, { images: 0 });
    setResponse({ status: 200, result }, res);
  } catch (error) {
    setError(
      { status: 500, message: error.message || "Internal Server Error" },
      res
    );
  }
};

export const createUser = async (req, res) => {
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
    await userDetailsService.create(req, res);

    return setResponse(
      {
        status: 201,
        result: { message: "User created successfully" },
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
      const parsedError = JSON.parse(error.message);
      setError(
        { status: parsedError.status, message: parsedError.message },
        res
      );
    } else {
      setError(
        { status: 500, message: error.message || "Internal Server Error" },
        res
      );
    }
  }
};

export const updateUser = async (req, res) => {
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Update user details'
    #swagger.description = 'Updates an existing user\'s full name and password based on the provided email. Email cannot be updated.'
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
    await userDetailsService.update(req, res);
    return setResponse(
      {
        status: 200,
        result: { message: "User updated successfully" },
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
      const parsedError = JSON.parse(error.message);
      setError(
        { status: parsedError.status, message: parsedError.message },
        res
      );
    } else {
      setError(
        { status: 500, message: error.message || "Internal Server Error" },
        res
      );
    }
  }
};

export const deleteUser = async (req, res) => {
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
    await userDetailsService.remove(req, res);
    return setResponse(
      {
        status: 200,
        result: { message: "User deleted successfully" },
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
      const parsedError = JSON.parse(error.message);
      setError(
        { status: parsedError.status, message: parsedError.message },
        res
      );
    } else {
      setError(
        { status: 500, message: error.message || "Internal Server Error" },
        res
      );
    }
  }
};

export const uploadImage = async (req, res) => {
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
    const filePath = await userDetailsService.uploadImage(req, res);
    setResponse(
      {
        status: 200,
        result: {
          message: "Image uploaded successfully",
          imagePath: filePath,
        },
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
      const parsedError = JSON.parse(error.message);
      setError(
        { status: parsedError.status, message: parsedError.message },
        res
      );
    } else {
      setError(
        { status: 500, message: error.message || "Internal Server Error" },
        res
      );
    }
  }
};

export const getImage = async (req, res) => {
    /* 
    #swagger.tags = ['Users']
    #swagger.summary = 'Retrieve all users'
    #swagger.description = 'Gets a list of images for the respective user'
    #swagger.responses[200] = {
          description: 'A list of images',
          schema: [
            {
              "path": "api/images/{email}/fileName.jpg",
            }
          ]
    }
    #swagger.responses[401] = {
          description: 'Unauthorized',
          schema: {
            "message": "User is unauthorized"
          }
    }
    #swagger.responses[403] = {
          description: 'Forbidden',
          schema: {
            "message": "Session is Expired! Please login again."
          }
    }
    #swagger.responses[500] = {
          description: 'Internal Server Error',
          schema: {
            "message": "Internal Server Error"
          }
    }
    #swagger.security = [{
      "BearerAuth": []
    }]
  */
  try {
    const images = await userDetailsService.getImage(req, res);
    setResponse(
      {
        status: 200,
        result: images,
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
      const parsedError = JSON.parse(error.message);
      setError(
        { status: parsedError.status, message: parsedError.message },
        res
      );
    } else {
      setError(
        { status: 500, message: error.message || "Internal Server Error" },
        res
      );
    }
  }
};

export const login = async (req, res) => {
    /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'User Login'
      #swagger.description = 'Authenticate user credentials and generate JWT token if valid.'
      #swagger.parameters['body'] = {
          in: 'body', 
          required: true,
          "@schema": {
              "type": 'object',
              "properties": {
                  "email": { type: 'string', format: 'email', description: 'Email address of the user' },
                  "password": { type: 'string', description: 'Password for the user' }
              },
           "required": ['email', 'password']                    
          }  
      }
      #swagger.responses[200] = {
        description: 'Successful login. Returns user details along with JWT token.',
        schema: {
          isUserValid: true,
          fullName: "Jane Doe",
          userToken: "e32snfsoue2wrwlj32ou2432loi32n42jsouful23r3"
        } 
      }
      #swagger.responses[400] = {
        description: 'Bad request. User not found or invalid password.',
        schema: {
            "message": "User not found"
          }
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error.',
        schema: {
            "message": "Internal Server Error"
          }
      }
  */ 
  try {
    const data = await userDetailsService.login(req, res);
    setResponse(
      {
        status: 200,
        result: {
          isUserValid: data?.isUserValid,
          fullName: data?.fullName,
        },
      },
      res
    );
  } catch (error) {
    if (typeof {} == "object") {
      const parsedError = JSON.parse(error.message);
      setError(
        {
          status: parsedError.status,
          message: parsedError.message,
          isUserValid: parsedError.isUserValid,
        },
        res
      );
    } else {
      setError(
        { status: 500, message: error.message || "Internal Server Error" },
        res
      );
    }
  }
};

export const clearCookies = async (req, res) => {
  try {
    const result = await userDetailsService.clearCookies(req, res);
    setResponse({ status: 200, result }, res);
  } catch (error) {
    setError(
      { status: 500, message: error.message || "Internal Server Error" },
      res
    );
  }
}
