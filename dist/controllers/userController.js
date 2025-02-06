"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
const userRepository_1 = require("../repository/userRepository");
const utils_1 = require("../utils/utils");
const auth_1 = require("../utils/auth");
// Function to create a new user
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        // check user name exists
        const isUserNameExists = yield (0, userRepository_1.userNameExists)(username);
        // if user name exists return 400
        if (isUserNameExists) {
            res.status(400).send("User name already exists");
            return;
        }
        // check user email exists
        const isEmailExists = yield (0, userRepository_1.emailExists)(email);
        // if user email exists return 400
        if (isEmailExists) {
            res.status(400).send("Email already exists");
            return;
        }
        // hash password
        const hashedPassword = yield (0, utils_1.hashPassword)(password);
        // save user to database
        const savedUser = yield (0, userRepository_1.saveUser)(username, email, hashedPassword);
        res.status(201).send(savedUser);
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username: resUsername, password } = req.body;
        // get user from database
        const user = yield (0, userRepository_1.getUser)(resUsername);
        // if user not found return 400
        if (!user) {
            res.status(400).send("User not found");
            return;
        }
        // compare password
        const isPasswordCorrect = yield (0, utils_1.comparePasswords)(password, user.password);
        // if password is not correct return 400
        if (!isPasswordCorrect) {
            res.status(400).send("Password is incorrect");
            return;
        }
        // if password is correct return token
        const token = (0, auth_1.generateToken)(user);
        const { user_id, username, email } = user;
        // Set token in HTTP-only cookie for better security
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: false, // False for local development (HTTP)
            sameSite: 'lax', // 'lax' is safer and works over HTTP
            maxAge: 2 * 24 * 60 * 60 * 1000
        });
        res.status(200).send({ user: { user_id, username, email } });
        return;
    });
}
// Function to get user details
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, userRepository_1.getUsersInfo)();
        res.status(200).send(users.rows);
    });
}
