const User = require("../../model/user/User");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const generateToken = require("../../config/token/generatetoken");
const validateMOongodbId = require("../../utils/validatemongodbid");
const crypto = require("crypto");
const { info, error } = require("console");
const Post = require("../../model/post/Post");

//---------function to setup gmail account for sending emails-----------------
async function sendMail(info) {
  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// main().catch(console.error);
//

//--------Register User----------------
const register = asyncHandler(async (req, res) => {
  // register user
  //CHECK IF USER EXISTS
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("user already exists");
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
      username: "vivek@gmail.com",
    });
    res.json({ registered: user });
  } catch (error) {
    res.json({ error });
  }
});

//---------------Login User=-------------------
const login = asyncHandler(async (req, res) => {
  //CHECK IF USER EXISTS
  const user = await User.findOne({ email: req?.body?.email });
  // const comparepassword=await User.findOne({password:req?.body?.password});
  if (user && (await user.isPasswordMatched(req.body.password))) {
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_KEY, {
      expiresIn: "24d",
    });
    res.json({
      _id: user._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      profilePhoto: user?.profilePhoto,
      isAdmin: user?.isAdmin,
      isPresident: user?.isPresident,
      isVicepresident: user?.isVicepresident,
      istreasurer: user?.istreasurer,
      token: token,
      Presidentof: user?.Presidentof,
    });
  } else {
    res.status(401);
    throw new Error("INvalid User");
  }
});

//---------------------get all Users--------------
const fetchallUsers = asyncHandler(async (req, res) => {
  console.log(req.headers);
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    res.json(error);
  }
});

//-----------------DELETE USER---------------
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // check if user id is valid
  validateMOongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ message: deletedUser });
  } catch (error) {
    res.json(error);
  }
});

//-----------------Fetch single user  ../ for all users ----------------

const fetchUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMOongodbId(id);
  try {
    const user = await User.findById(id).populate("posts");
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});
//-------------------User details  .// exclusive to Logged in user-------------------
const userProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMOongodbId(id);

  try {
    const myprofile = await User.findById(id)
      .populate("posts")
      .populate("memberof");

    res.json(myprofile);
  } catch (error) {
    res.json(error);
  }
});
//---------------------Update User--------------------------
const UpdateUser = asyncHandler(async (req, res) => {
  // this is from auth middle ware
  const { _id } = req?.user;
  // const {id}=req.params;
  validateMOongodbId(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    { new: true, runValidators: true }
  ); // returned new updated user
  res.json(user);
});

//---------------------Update-password--------------------------
const upateUserPassword = asyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req?.user;

  var { password } = req.body;
  validateMOongodbId(_id);
  //find the user by id
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else res.json(user);
});

//--------------------  user following --------------------
const followingUser = asyncHandler(async (req, res) => {
  // 1.Finding the user we want to follow
  const { followId } = req.body;
  const loginUserId = req.user.id;
  const targetUser = await User.findById(followId);

  const alreadyfollowing = targetUser?.followers?.find(
    (user) => user.toString() === loginUserId.toString()
  );
  //
  if (alreadyfollowing) throw new Error("Alreadyfollowing this user");
  await User.findByIdAndUpdate(
    followId,
    { $push: { followers: loginUserId }, isFollowing: true },
    { new: true }
  );

  //2.update the login user following feild
  await User.findByIdAndUpdate(
    loginUserId,
    { $push: { following: followId } },
    { new: true }
  );

  res.json(`you are followwing the user ewith id ${followId}`);
});

//----------------------user unfollow --------------------
const unfollowUser = asyncHandler(async (req, res) => {
  const { unfollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unfollowId,
    { $pull: { followers: loginUserId }, isFollowing: false },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    { $pull: { following: unfollowId } },
    { new: true }
  );
  res.json("You have successfully unfollowed this user");
});

// --------------------Block a user----------------------
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMOongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  res.json(user);
});
// --------------------unBlock a user----------------------
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMOongodbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true }
  );
  res.json(user);
});
//------------generateverification token--------------------

const generateverificationToken = asyncHandler(async (req, res) => {
  const loginUser = req.user.id;
  const user = await User.findById(loginUser);
  const reciever = user.email;
  try {
    // generatea token

    const Verificationtoken = await user.createAccountVerificationtoken();
    // save the user
    await user.save();
    console.log(Verificationtoken);
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: true, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: "soggynet@outlook.com",
        pass: "vivekKUMAR1",
      },
    });
    const resetURL = `<a href="http://localhost:3000/verify-account/${Verificationtoken}"><h1>Click this link to verify yourself,You got  10 minutes 😅 🙏 <a ></a></h1></a>`;

    let info = await transporter.sendMail({
      from: "soggynet@outlook.com", // sender address
      to: `vk474083@gmail.com, vivekumar190@gmail.com,${reciever}`, // list of receivers
      subject: "Account verification email", // Subject line
      text: "Verification email", // plain text body
      html: `<b>Hello From soggy NET?${resetURL}</b>`, // html body
    });
    await sendMail(info).catch(console.error);
    res.send(resetURL);
  } catch (error) {
    res.send(error);
  }
});
//---------------------Account verification ----------------------
const accountVerification = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  // find this user by token

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpires: { $gt: new Date() },
  });

  if (!userFound) throw new Error("Token expired ,try again later");
  //update the user propert verified to  true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpires = undefined;
  await userFound.save();
  console.log(hashedToken);
  res.send(userFound);
});

//--------------------Forgot password token----------------------
const forgetPassword = asyncHandler(async (req, res) => {
  //find the user by email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const token = await user.passwordresetToken();
    console.log(token);
    await user.save();

    /// emailing password resetemailingn

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: true, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: "soggytest@outlook.com",
        pass: "vivekKUMAR1",
      },
    });
    const resetpasswordURL = `<a href="http://localhost:3000/reset-password/${token}"><h1>Click this link to reset your password,You got  10 minutes 😅 🙏 <a ></a></h1></a>`;

    let info = await transporter.sendMail({
      from: "soggytest@outlook.com", // sender address
      to: `vk474083@gmail.com, vivekumar190@gmail.com,${email}`, // list of receivers
      subject: "Account passwor reset", // Subject line
      text: "RESET LINK", // plain text body
      html: `<b>Hello From soggy NET ${resetpasswordURL}</b>`, // html body
    });

    // send email function
    await sendMail(info).catch(console.error);

    res.json(`EMAIL SENT WITH THE TOKEN ${resetpasswordURL}`);
  } catch (error) {
    res.json(error);
  }
});
// take the token ,find
//----------------------------Update the password------------------
const passwordUpdate = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  //find this user by token
  const user = await User.findOne({
    passwordresetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("invalid token or token expired");
  }
  //update /change the user password
  user.password = password;
  user.passwordresetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); //
  res.json(user);
});

// feed of the user
const userFeed = asyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const feeduser = await User.findById(_id);
  const followings = feeduser?.following;
  const membersofs = feeduser?.memberof;
  const realarray = followings?.map((following) => following._id.toString());
  const realsocietyarray = membersofs?.map((society) => society._id.toString());

  try {
    const fromfollwings = await Post.find({ user: realarray })
      .populate("user")
      .populate("comments")
      .populate("society")
      .sort("-createdAt");
    const fromsociety = await Post.find({ society: realsocietyarray })
      .populate("user")
      .populate("comments")
      .populate("society")
      .sort("-createdAt");
    const userfeed = fromfollwings.concat(fromsociety);
    console.log(fromfollwings.length);
    console.log(fromsociety.length);
    res.json(userfeed);
  } catch (error) {
    res.json(error);
  }
});

// Profile photo upload
//--------------------------Update profile photo---------------------

const profilePhotoUpload = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const localpath = `/public/images/profile/${req.file.filename}`;
  const foundUser = await User.findByIdAndUpdate(
    _id,
    { profilePhoto: localpath },
    { new: true }
  );
  console.log(localpath);

  res.json(foundUser);
});
module.exports = {
  register,
  login,
  fetchallUsers,
  deleteUser,
  fetchUser,
  userProfile,
  UpdateUser,
  upateUserPassword,
  followingUser,
  unfollowUser,
  blockUser,
  unblockUser,
  generateverificationToken,
  accountVerification,
  forgetPassword,
  passwordUpdate,
  profilePhotoUpload,
  userFeed,
};
