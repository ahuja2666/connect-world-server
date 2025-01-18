/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *           minLength: 2
 *           maxLength: 20
 *           required: true
 *         lastName:
 *           type: string
 *           example: Doe
 *           minLength: 2
 *           maxLength: 20
 *         email:
 *           type: string
 *           example: john@example.com
 *           maxLength: 30
 *           required: true
 *         password:
 *           type: string
 *           example: PassW2@88bbx#
 *           minLength: 8
 *           maxLength: 20
 *           required: true
 */

import { Schema, model } from "mongoose";

interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true,  minlength: 2, maxlength: 20},
    lastName: { type: String, minlength: 2, maxlength: 20},
    email: { type: String, required: true, maxlength: 30},
    password: {type: String, required: true, minlength: 8, maxlength: 20}
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
