# devThreads-backend
# Project Features Summary

## Date: 2024-08-24

### **1. User Schema and Features:**

- **User Schema Fields:**
  - `name`: The full name of the user.
  - `email`: The user's email address (unique and required).
  - `password`: Hashed password for user authentication.
  - `userName`: Unique username for the user.
  - `bio`: A brief biography of the user.
  - `avatar`: URL or path to the user's profile picture.
  - `followers`: An array of `ObjectId`s referencing other users who follow this user.
  - `following`: An array of `ObjectId`s referencing other users this user follows.
  - `interests`: An array of strings representing the user's selected interests or keywords.
  - `role`: The role of the user (`reader`, `editor`, `admin`).

- **User Features:**
  - **Role-Based Access:** 
    - Users are assigned roles (`reader`, `editor`, `admin`) that determine their permissions within the application.
  - **Interest-Based Feed:**
    - Users can select their interests during registration, and posts matching these interests are shown in their feed by default.
  - **Following System:**
    - Users can follow or unfollow other users, and their feed is influenced by the content posted by those they follow.

### **2. Post Schema and Features:**

- **Post Schema Fields:**
  - `title`: The title of the post (required).
  - `image`: URL or path to an image associated with the post (required).
  - `textContent`: The main content of the post (required).
  - `video`: Optional URL or path to a video included in the post.
  - `createdBy`: Reference to the `User` who created the post (required).
  - `reacts`: An array of reactions, each containing:
    - `userId`: Reference to the user who reacted.
    - `reaction`: Type of reaction (`like`, `clap`, `sad`, `cool`).
  - `comments`: An array of `ObjectId`s referencing comments associated with the post.
  - `category`: An array of strings representing the categories or keywords related to the post.

- **Post Features:**
  - **Reactions Tracking:**
    - Users can react to posts with predefined reaction types (`like`, `clap`, `sad`, `cool`). Reactions are tracked by user, allowing for interaction analytics.
  - **Commenting:**
    - Users can comment on posts, and these comments are linked to the respective post.
  - **Category-Based Display:**
    - Posts are tagged with categories or keywords, which influence how they are shown in users' feeds based on their selected interests.

### **3. Comment Schema and Features:**

- **Comment Schema Fields:**
  - `postId`: Reference to the post that the comment belongs to (required).
  - `commentedBy`: Reference to the user who created the comment (required).
  - `text`: The content of the comment (required).
  - `upvotes`: An array of `ObjectId`s referencing users who upvoted the comment.
  - `downvotes`: An array of `ObjectId`s referencing users who downvoted the comment.
  - `likes`: An array of `ObjectId`s referencing users who liked the comment.
  - `replies`: An array of `ObjectId`s referencing other comments that are replies to this comment.

- **Comment Features:**
  - **Nested Commenting:**
    - Users can reply to comments, creating a nested or threaded comment structure.
  - **Upvoting/Downvoting:**
    - Users can upvote or downvote comments, influencing the visibility or ranking of comments.
  - **Liking Comments:**
    - Users can like comments, and these likes are tracked similarly to reactions on posts.

### **General Features Across Schemas:**

- **Timestamps:**
  - All schemas (`User`, `Post`, `Comment`) include automatic timestamps (`createdAt` and `updatedAt`) for tracking creation and modification times.

- **Reference Integrity:**
  - All relationships (e.g., `User` to `Post`, `Post` to `Comment`) are maintained using `ObjectId` references, ensuring strong data integrity.

### **Planned Next Steps:**
- **Middleware Implementation:** 
  - Implement middleware for role-based access control (RBAC) and other features to enforce permissions.
- **Backend Controllers:**
  - Develop backend controllers to handle user actions, post creation, commenting, and more, integrating the schemas and features discussed above.
