
import mongoose, { Document, Schema } from "mongoose";
import { IPost } from "../types/types";

interface IPostDocument extends IPost, Document{}

const PostSchema: Schema<IPostDocument>= new mongoose.Schema<IPostDocument>({
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        textContent: {
            type: String,
            required: true
        },
        video: {
            type: String
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reacts: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            reaction: {
                type: String,
                enum: ['like', 'clap', 'sad', 'cool'],

            }
        }],
        comments: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        category: [{
            type: String,
            required: true
        }]

}, {timestamps: true})

const Post= mongoose.model<IPostDocument>('Post', PostSchema);
export default Post;