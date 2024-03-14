const model = require("../model/usermodel");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const cloudinary = require("../middlewares/cloudinary");
const streamifier = require("streamifier");
const key = "MY_KEY";
const upload = require("../middlewares/multer");
require('dotenv').config()

const getData = async (req, res) => {
  let users;
  try {
    users = await model.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(201).json({ message: "cannot find the users" });
  } else {
    return res.status(200).json(users);
  }
};

const findEmailExist = async (req, res, next) => {
  let exist;
  try {
    exist = await model.findOne({ email: req.body.email });
  } catch (err) {
    console.log(err);
  }
  if (exist) {
    return res.status(202).json({ message: "Email already exists" });
  } else {
    return res.status(200).json({ success: true, message: "Email is new" });
  }
};

const singleFile = upload.single("image");

const resizeImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({ message: "no file found" });
  }
  try {
    req.file.buffer = await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    next();
  } catch (err) {
    console.log(err);
  }
};

const cloudImage = async (req, res, next) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "task",
        resource_type: "auto",
        format: "jpg",
      },
      (error, result) => {
        if (error) {
          console.error("Error uploading file:", error);
          return res.status(500).json({ error: "Error uploading file" });
        } else {
          return res.status(200).json({ success: true, result: result });
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Error uploading file" });
  }
};

const addUser = async (req, res) => {
  const date = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`
  let newUser;
  try {
    newUser = new model({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: {
        mca: req.body.mca,
        bca: req.body.bca,
        bsc: req.body.bsc,
      },
      image: {
        url: req.body.url,
        pid: req.body.pid,
      },
      createdAt:date
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
  }
  if (!newUser) {
    return res.status(404).json({ message: "cannot add user" });
  } else {
    return res.status(200).json(newUser);
  }
};

const getEmployeeById = async (req, res) => {
  let employee;
  try {
    employee = await model.findById(req.params.id);
  } catch (err) {
    console.log(err);
  }
  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Cannot get the employee" });
  } else {
    return res.status(200).json({ success: true, data: employee });
  }
};

const unlinkImageFromCloud = async (req, res) => {
  let result;
  try {
    result = await cloudinary.uploader.destroy(`task/${req.params.pid}`);
  } catch (err) {
    console.log(err);
  }
  if (!result) {
    return res
      .status(404)
      .json({ success: false, message: "Failed to delete old image" });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "Image deleted successfully" });
  }
};

const editData = async (req, res) => {
  let updatedData;
  try {
    updatedData = await model.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        designation: req.body.designation,
        gender: req.body.gender,
        course: {
          mca: req.body.mca,
          bca: req.body.bca,
          bsc: req.body.bsc,
        },
        image: {
          url: req.body.url,
          pid: req.body.pid,
        },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
  if (!updatedData) {
    return res
      .status(404)
      .json({ success: false, message: "cannot update data" });
  } else {
    return res.status(200).json({ success: true, data: updatedData });
  }
};

const deleteEmployee = async (req, res) => {
  let deletedEmployee;
  try {
    deletedEmployee = await model.findOneAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
  if (!deletedEmployee) {
    return res.status(404).json({
      success: false,
      message: "Cannot delete the employee right now",
    });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  }
};

//Authenticating Admin

const user = {
  name: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
};

const generateToken = async (req, res) => {
  const verify =
    user.password == req.body.password && user.name == req.body.name;
  let token;

  if (!verify) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  } else {
    token = jwt.sign({ user }, process.env.JWT_KEY, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid password" });
      } else {
        return res.status(200).json({ success: true, token: result });
      }
    });
  }
};

const authenticateToken = async(req,res)=>{
  let header = req.header("Authorization")
  const token = header.split(" ")[1]
  if(!token){
    return res.status(404).json({message:"No token found"})
  }
  jwt.verify(token,process.env.JWT_KEY,(err,result)=>{
    if(err){
      return res.status(404).json({message:"Invalid Token"})
    }else{
      return res.status(200).json({success:true,message:"Login Successfull"})
    }
  })
}

module.exports = {
  getData,
  findEmailExist,
  addUser,
  singleFile,
  resizeImage,
  cloudImage,
  getEmployeeById,
  unlinkImageFromCloud,
  editData,
  deleteEmployee,
  generateToken,
  authenticateToken
};
