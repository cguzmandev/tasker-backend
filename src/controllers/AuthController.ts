import { Request, Response } from "express";
import {
   CreateUserRequestBody,
   LoginUserRequestBody,
   TokenData,
} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

// -----------------------------------------------------------------------------

export class AuthController {
   async register(
      req: Request<{}, {}, CreateUserRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      try {
         const newUser: User = {
            username,
            email,
            password_hash: bcrypt.hashSync(password, 10),
            roles: [UserRoles.USER],
         };
         await userRepository.save(newUser);

         res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error creating user" + error,
         });
      }
   }

   async login(
      req: Request<{}, {}, LoginUserRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { password, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      try {
         if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Email or password is required",
            });
         }

         const user = await userRepository.findOne({
            where: {
               email: email,
            },
            relations: {
               roles: true,
            },
            select: {
               roles: {
                  name: true,
               },
            },
         });

         // If user NOT exist
         if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Incorrect email or password",
            });
         }

         // Check password
         const isPasswordValid = bcrypt.compareSync(
            password,
            user.password_hash
         );

         if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Incorrect email or password",
            });
         }

         // Generate token
         const roles = user.roles.map((role) => role.name);

         const tokenPayload: TokenData = {
            userId: user.user_id?.toString() as string,
            userRoles: roles,
         };

         const token = jwt.sign(tokenPayload, "123", {
            expiresIn: "3h",
         });

         res.status(StatusCodes.OK).json({
            message: "Login successfully",
            token,
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Login failed",
            error,
         });
      }
   }
}
