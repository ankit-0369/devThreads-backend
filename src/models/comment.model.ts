
import mongoose, { Document, Schema } from "mongoose";
import { IComment } from "../types/types";

interface ICommentDocument extends IComment, Document { }

const CommentSchema: Schema<ICommentDocument> = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

}, {
    timestamps: true
})

const Comment= mongoose.model<ICommentDocument>('Comment', CommentSchema);
export default Comment;