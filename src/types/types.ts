import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    userName: string;
    bio?: string; // Optional field
    avtar?: string;
    role: 'reader' | 'admin' | 'editor';
    followers: mongoose.Types.ObjectId[]; // Array of ObjectIds referencing other User documents
    following:mongoose.Types.ObjectId[]; // Array of ObjectIds referencing other User documents
    interests: string[]; // Array of strings representing interests
};

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

