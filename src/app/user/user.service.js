import userRepo from "./user.repository.js";

async function createUser(name, email, password, role) {
    const user = await userRepo.findUserByEmail(email);

    if (user) throw new Error("User already exists.");

    return await userRepo.createUser(name, email, password, role);
}

async function updateOrCreateUser(id, name, email, password, role) {
    const user = await userRepo.findUserById(id);

    if (user) {
        const updatedUser = await userRepo.updateUser(
            id,
            name,
            email,
            password,
            role,
        );
        return updatedUser;
    } else {
        const createdUser = await userRepo.createUser(
            name,
            email,
            password,
            role,
        );
        return createdUser;
    }
}

async function getUserByEmail(email) {
    const user = await userRepo.findUserByEmail(email);

    if (!user) throw new Error("No user found");

    return user;
}

async function getUserById(id) {
    const user = await userRepo.findUserById(id);

    if (!user) throw new Error("No user found");

    return user;
}

export default { createUser, updateOrCreateUser, getUserByEmail, getUserById };
