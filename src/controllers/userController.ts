import { Request, Response } from 'express';
import { userNameExists, emailExists, saveUser, getUser, getUsersInfo } from '../repository/userRepository';
import { hashPassword, comparePasswords } from '../utils/utils';
import { generateToken } from '../utils/auth';

// User interface
interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
}

// Function to create a new user
export async function createUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    // check user name exists
    const isUserNameExists = await userNameExists(username); 

    // if user name exists return 400
    if (isUserNameExists) {
        res.status(400).send("User name already exists");
        return;
    }
    // check user email exists
    const isEmailExists = await emailExists(email);

    // if user email exists return 400
    if (isEmailExists) {
        res.status(400).send("Email already exists");
        return;
    }

    // hash password
    const hashedPassword = await hashPassword(password)
    
    // save user to database
    const savedUser = await saveUser(username, email, hashedPassword);
    res.status(201).send(savedUser);
}

export async function loginUser(req: Request, res: Response) {
    const { username: resUsername, password } = req.body;

    // get user from database
    const user: User = await getUser(resUsername);

    // if user not found return 400
    if (!user) {
        res.status(400).send("User not found");
        return;
    }

    // compare password
    const isPasswordCorrect = await comparePasswords(password, user.password);

    // if password is not correct return 400
    if (!isPasswordCorrect) {
        res.status(400).send("Password is incorrect");
        return;
    }

    // if password is correct return token
    const token = generateToken(user);
    const { user_id, username, email } = user;
 
    res.status(200).send({ user: { user_id, username, email }, token: token });
}

// Function to get user details
export async function getUsers(req: Request, res: Response) {
    const users = await getUsersInfo();
    res.status(200).send(users.rows);
}