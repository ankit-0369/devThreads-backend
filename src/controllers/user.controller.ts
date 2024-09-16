import { Request, Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/apiError";
import User from "../models/user.model";
import { ApiResponse } from "../utils/apiResponse";
import Follower from "../models/follow.model";
import bcrypt from 'bcrypt'



const generateAccessAndRefreshToken= async(userId: any)=>{

    const user= await User.findById(userId)
    if(!user){
        throw new ApiError(500, 'user not found while creating tokens');
    }

    const accessToken=  user.generateAccessToken()
    const refreshToken=  user.generateRefreshToken()
    user.refreshToken= refreshToken
    await user.save({validateBeforeSave: false})

    return {
        accessToken,
        refreshToken
    }
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const { email, password, username: userName } = req?.body;
    if ([email, password, userName]
        .some(field => field === undefined || field?.trim() === "")
    ) {
        throw new ApiError(404, 'All field required');
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { userName }]
    });

    if (existedUser) {
        throw new ApiError(409, 'email or username already exist');
    }

    const user = await User.create({
        email,
        password,
        userName,
        role: 'author'
    })

    const newFollowerData = new Follower({
        user: user._id,
        followers: [],
        following: [],
      });

      await newFollowerData.save(); //new entry in follow Schema


    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, 'something went wrong while user creation');
    }

    res.status(201).json(
        new ApiResponse(200, { createdUser }, 'user created successfully!')
    );

})

const loginUser= asyncHandler(async (req: Request, res: Response) =>{
    
        const { password, userName}= req.body;
        if( !userName || !password){
            throw new ApiError(404, 'email or password field missing');
        }

        const existedUser= await User.findOne({
            $or: [{userName}]
        })

        if(!existedUser){
            throw new ApiError(404, 'username not found');
        }

        const isPasswordValid= await existedUser.isPasswordCorrect(password)
        if(!isPasswordValid){
            throw new ApiError(400, 'password is incorrect');
        }

        const {accessToken, refreshToken}= await generateAccessAndRefreshToken(existedUser._id)
        
        const loggedInUser= await User.findById(existedUser._id).select("-password -refreshToken");

        const options= {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken}, 'loggedIn successfully !')
            );
        
        
})



export {
    registerUser,
    loginUser
}


/*
    Register user:- 
        1. take details from req.body;
        2. check for user exist using email, username
        3. upload on local folder.
        4. upload on cloudinary;
        5. create new user.
        6. check if user created.
        7. send the createdUser after removing the password and refreshToken.
*/