import mongoose, {Document, Schema} from "mongoose";

import { IUser } from "../types/types";

interface IUserDocument extends IUser, Document{}

const UserSchema: Schema<IUserDocument>= new mongoose.Schema<IUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {type: String},
    avtar: {type: String},
    role: {
        type: String,
        enum: ['reader', 'editor', 'admin'],
        default: 'reader',
        required: true

    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    interests:[{
        type: String
    }]
}, {timestamps: true})


const User= mongoose.model<IUserDocument>('User', UserSchema)

export default User;