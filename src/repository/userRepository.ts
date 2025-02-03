import { query } from "../database"

export const userNameExists = async (username: string) => {
    const { rows } = await query ("SELECT email FROM public.users u where u.username = $1", [username]);
    return rows.length > 0;
}

export const emailExists = async (email: string) => {
    const { rows } = await query ("SELECT email FROM public.users u where u.email = $1", [email]);
    return rows.length > 0;
}

export const saveUser = async (username: string, email: string, password: string) => {
    const { rows } = await query ("INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email", [username, email, password]);
    return rows[0];
}

export const getUser = async (username: string) => {
    const { rows } = await query ("SELECT * FROM public.users u where u.username = $1", [username]);
    return rows[0];
}

export const getUsersInfo = async () => {
    const users = await query ("SELECT * FROM public.users");
    return users;
};