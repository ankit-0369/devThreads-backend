import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    userName: string;
    bio?: string; // Optional field
    avatar?: string; // Optional field for avatar image URL
    role: string; // Reference to Role document
    refreshToken: string;
  }


  export interface IFollower {
    user: mongoose.Types.ObjectId; // Reference to the User who is being followed
    followers: mongoose.Types.ObjectId[]; // Array of ObjectIds referencing other User documents
    following: mongoose.Types.ObjectId[]; // Array of ObjectIds referencing other User documents
  }

  export interface IInterest {
    user: mongoose.Types.ObjectId; // Reference to the User who has these interests
    interests: string[]; // Array of strings representing interests
  }

export interface IPost{

    title: string;
    image: string;
    textContent: string;
    video?:string;
    author:mongoose.Types.ObjectId;
    reacts: {
       userId:mongoose.Types.ObjectId,
       reaction: 'like' | 'clap'|'sad'|'cool';
    }[],
    comments:mongoose.Types.ObjectId[];
    category: string[];

}

export interface IComment{
    postId: mongoose.Types.ObjectId;
    commentedBy: mongoose.Types.ObjectId;
    text: string;
    upvotes: mongoose.Types.ObjectId[];
    downvotes: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
    replies: mongoose.Types.ObjectId[];
}

