const User = require("../model/user");
const _ =  require('lodash')
const fs = require('fs').promises;
const path = require('path');
module.exports.signup = async(req,res)=>{
    try {
        let img = "";
        if (req.file) {
            img = req.file.filename;
        }
        const input = _.pick(req.body, ["name", "email", "image", "password"]);
        input['image'] = img
        const user = await User.create(input);
        res.json({ message: "User created successfully"});
    } catch (error) {
        console.log("err =",error); 
    }
}
module.exports.index = async(req,res)=>{
    try {
        let user = await User.findById(req.params.id)
        return res.json({message:"user data",user})
    } catch (error) {
        console.log("err =",error); 
    }
}
module.exports.updateProfile = async (req, res) => {
    try {

      const input = _.pick(req.body, ["name", "email", "image"]); 
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found", status: false });
      }
  
      if (req.file) {
        const imageFolder = path.resolve(__dirname, "..", `${process.env.USER_IMAGE_URL}`);
        const oldImgPath = path.join(imageFolder, user.image);
  
        if (user.image) {
            const oldImgPath = path.join(imageFolder, user.image);
            
            try {
              await fs.access(oldImgPath);
              
              await fs.unlink(oldImgPath);
            } catch (unlinkError) {
              if (unlinkError.code === 'ENOENT') {
                console.warn("File not found for deletion:", oldImgPath);
              } else {
                console.error("Error deleting old image:", unlinkError);
              }
              return res.status(500).json({ message: "Error deleting old image", status: false });
            }
          }
        
        input["image"] = req.file.filename;
      }
  
      const userUpdated = await User.findByIdAndUpdate(req.params.id, input, { new: true });
  
      if (!userUpdated) {
        return res.status(400).json({ message: 'Failed to update profile', status: false });
      }
  
      const pipeline = [
        { $match: { _id: req.params.id } },
        {
          $project: {
            name: 1,
            email: 1,
            image: {
              $cond: {
                if: { $eq: ["$image", null] },
                then: null,
                else: { $concat: ["$imageFolder", "$image"] }
              }
            }
          }
        }
      ];
      
      const userAggregated = await User.aggregate(pipeline);
      
      return res.status(200).json({ message: 'Profile updated successfully', status: true, user: userAggregated[0] });
      
    } catch (error) {
      console.error("Error updating user profile:", error);
      return res.status(500).json({ message: "Error updating profile", status: false });
    }
  };
  module.exports.deleteProfile = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("error =",error);        
    }
  }