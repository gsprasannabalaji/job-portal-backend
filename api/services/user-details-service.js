import User from "../models/user-details.js";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";

export const search = async (params, options) => {
  const userDetails = await User.find(params, options).exec();
  return userDetails;
};

export const create = async (req, res) => {
  const { fullName, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Error(
        JSON.stringify({ status: 400, message: "User with this email already exists" })
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    fullName: fullName,
    email: email,
    password: hashedPassword,
  });
  await user.save();
};

export const update = async (req, res) => {
  const reqObj = { email: req.body.email };
  const user = await User.findOne(reqObj);
  if (!user) {
    throw new Error(
        JSON.stringify({ status: 400, message: "User not found" })
      );
  }
  const hashedPassword = await bcrypt.hash(req?.body?.password, 10);
  await User.findOneAndUpdate(
    reqObj,
    {
      email: req.body.email,
      fullName: req.body.fullName,
      password: hashedPassword,
    },
    {
      new: true,
    }
  );
};

export const remove = async (req, res) => {
  const email = req.query.email;
  if (!email) {
    throw new Error(
        JSON.stringify({ status: 400, message: "EmailId is required" })
      );
  }
  const reqObj = { email };
  const user = await User.findOne(reqObj);
  if (!user) {
    throw new Error(
        JSON.stringify({ status: 400, message: "User not found" })
      );
  }
  await User.deleteOne(reqObj);
};

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      cb(new Error("User not found!"));
      return;
    }
    const userFolderPath = `api/images/${req.body.email}/`;

    fs?.mkdirSync(userFolderPath, { recursive: true });
    cb(null, userFolderPath);
  },
  filename: async function (req, file, cb) {
    try {
      // Check if the file already exists in the database
      const isFileNameExist = await User.findOne(
        {
          email: req.body.email,
          images: {
            $elemMatch: {
              path: `api/images/${req.body.email}/${file.originalname}`,
            },
          },
        },
        "email images"
      );
      if (isFileNameExist) {
        // File already exists, return an error
        cb(
          new Error(
            "Image with this filename is already exist. Please try with new filename"
          )
        );
      } else {
        cb(null, file.originalname);
      }
    } catch (err) {
      cb(err, null);
    }
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

export const uploadImage = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
        throw new Error(
            JSON.stringify({ status: 400, message: err.message })
          );
    } else if (err) {
        throw new Error(
            JSON.stringify({ status: 400, message: err.message })
          );
    }
    if (!req.file) {
        throw new Error(
            JSON.stringify({ status: 400, message: "Image is required!" })
          );
    }
    const queryObj = { email: req.body.email };
    const user = await User.find(queryObj);
    if (user) {
      await User.updateOne(queryObj, {
        $push: {
          images: {
            path: req.file.path,
          },
        },
      });
    }
    return req.file.path;
  });
};

export const getImage = async (req, res) => {
    const result = await User.findOne({email : req.params.email});
    if(result) {
        return result?.images || [];
    } else {
        throw new Error(
            JSON.stringify({ status: 400, message: "User not found" })
          );
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error(
        JSON.stringify({ status: 400, message: "User not found" })
      );
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(
        JSON.stringify({ status: 400, message: "Invalid password", isUserValid: false })
      );
  }
  return {
    isUserValid: isMatch,
    fullName: user?.fullName
  };
}
