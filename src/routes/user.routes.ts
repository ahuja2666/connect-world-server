import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../validation/user.validation";

const router = Router();

// GET /api/users
/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns a list of users.
 */
router.get("/", asyncHandler(getAllUsers));

// POST /api/users
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/", validate(createUserSchema), asyncHandler(createUser));

export default router;
