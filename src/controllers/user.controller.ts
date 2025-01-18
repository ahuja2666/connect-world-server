import { Request, Response } from "express";
import User from "../models/user.model";
import { successResponse } from "../utils/response";
import { CreateUserBody } from "../validation/user.validation";

// GET /users
export const getAllUsers = async (req: Request, res: Response) => {
  // No try/catch needed if you're using asyncHandler
  const users = await User.find();
  // Return standardized success
  return successResponse(res, users, "Users fetched successfully");
};

// POST /users
export const createUser = async (
  // Note: third generic param is the "Request Body" type
  req: Request<unknown, unknown, CreateUserBody>,
  res: Response
) => {
  // Now TypeScript knows req.body must have "name" and "email" (correct domain, etc.)
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({ firstName, lastName, email, password });
  await newUser.save();

  return successResponse(res, newUser, "User created successfully", 201);
};
