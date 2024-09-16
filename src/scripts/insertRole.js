import mongoose from 'mongoose';
import Role from './models/Role'; // Adjust the path to your Role model
import DB_NAME from '../constant'

// Connect to your MongoDB database
mongoose.connect(`mongodb+srv://admin:xruLM11ZKKcNImhE@cluster0.wd7iv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to insert roles
const insertRoles = async () => {
  try {
    // Create role entries if they don't already exist
    const roles = [
      { name: 'author', permissions: ['create_post', 'edit_own_post', 'delete_own_post'] },
      { name: 'admin', permissions: ['create_post', 'edit_any_post', 'delete_any_post', 'manage_users', 'assign_roles'] },
    ];

    for (const role of roles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        const newRole = new Role(role);
        await newRole.save();
        console.log(`${role.name} role inserted successfully`);
      } else {
        console.log(`${role.name} role already exists`);
      }
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting roles:', error);
    mongoose.disconnect();
  }
};

// Run the insert function
// insertRoles();
