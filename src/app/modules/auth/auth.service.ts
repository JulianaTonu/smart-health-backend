import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { jwtHelper } from "../../helper/jwtHelper";

const login = async (payload: { email: string; password: string }) => {
  console.log("Login payload:", payload);

  const user = await prisma.user.findFirst({
    where: {
      email: payload.email.toLowerCase().trim(),
      status: UserStatus.ACTIVE

    }
  });
  console.log("User from DB:", user);

  if (!user) {
    throw new Error("User not found or inactive");
  }

  const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role }, "abcd", "1h"
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role }, "abcdefg", "90d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
    user: {
      email: user.email,
      role: user.role
    }
  };
};

export const AuthService = {
  login
};
