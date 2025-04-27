import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Sample users
const users = [
  {
    name: "user1",
    email: "user1@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

// Sample tasks
const createTasks = (userId) => [
  {
    title: "Complete project proposal",
    description: "Write a detailed proposal for the new client project",
    priority: "high",
    user: userId,
  },
  {
    title: "Schedule team meeting",
    description: "Set up a meeting to discuss project timeline",
    priority: "medium",
    user: userId,
  },
  {
    title: "Research new technologies",
    description: "Look into new frameworks for upcoming projects",
    priority: "low",
    user: userId,
    completed: true,
  },
];

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Task.deleteMany({});
    await User.deleteMany({});

    console.log("Data cleared");

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded");

    // Create tasks for each user
    let allTasks = [];

    for (const user of createdUsers) {
      const userTasks = createTasks(user._id);
      allTasks = [...allTasks, ...userTasks];
    }

    await Task.insertMany(allTasks);
    console.log("Tasks seeded");

    console.log("Data seeding completed!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
