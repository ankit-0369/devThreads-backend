import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/types";
import { NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUserDocument extends IUser, Document {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const UserSchema: Schema<IUserDocument> = new mongoose.Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: { type: String, default: "Change your Bio Now..." },
    avatar: { type: String, default: "" },
    role: {
      type: String,
      enum: ['author', 'admin'],
      required: true,
      default: 'author'
    },
    
    refreshToken: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);


UserSchema.pre<IUserDocument>('save', async function (next) {
    const user = this as IUserDocument;
  
    // If the password hasn't been modified, continue to the next middleware
    if (!user.isModified('password')) {
      return next();
    }
  
    // Hash the password
    user.password = await bcrypt.hash(user.password, 10);
    next();
  });


  UserSchema.methods.isPasswordCorrect = async function(password: string){
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
           
        },
        process.env.ACCESS_TOKEN_SECRET as string, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model<IUserDocument>("User", UserSchema);
export default User;
