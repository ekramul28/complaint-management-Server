import prisma from "../shared/prisma";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../helpars/jwtHelpers";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });
  console.log("user", userData);

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  console.log(isCorrectPassword);
  console.log(userData);

  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
    },
    config.jwt_secret as string,
    config.expire_in as string
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
      userId: userData.id,
    },
    config.REFRESH_TOKEN_SECRET as string,
    config.REFRESH_TOKEN_EXPIRES_IN as string
  );
  console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: true,
  };
};

const refreshToken = async (token: string) => {
  let decodeData;
  try {
    decodeData = jwtHelpers.verifyToken(
      token,
      config.REFRESH_TOKEN_SECRET as string
    );
  } catch (error) {
    throw new Error("You are Not authorize");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: decodeData.id,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
      userId: userData.id,
    },
    config.jwt_secret as string,
    config.expire_in as string
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: true,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
