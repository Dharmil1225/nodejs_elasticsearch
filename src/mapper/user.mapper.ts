import { User } from "../database/entities/user.entity";

export const createUserMapper = (data: Partial<User>) => {
  return {
    name: data.name,
    email: data.email,
    address: data.address,
    pinCode: data.pinCode,
  };
};

export const updateUserMapper = (data: Partial<User>) => {
  return {
    name: data.name,
    email: data.email,
    address: data.address,
    pinCode: data.pinCode,
  };
};
