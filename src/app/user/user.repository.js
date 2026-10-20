import { User } from "../../db/models/user.model.js";

async function findUserByEmail(email) {
    const user = await User.findOne({
        where: { email: email },
        attributes: { exclude: ["password"] },
    }); // {} | null;
    return user;
}

async function findUserById(id) {
    const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "role"] },
    });
    return user;
}

async function createUser(name, email, password, role) {
    const user = User.build({ name, email, password, role });

    return await user.save();
}

async function updateUser(id, name, email, password, role) {
    const updatedUser = await User.update(
        { name, email, password, role },
        { where: { id: id } },
    );

    return updatedUser;
}

export default {
    findUserByEmail,
    createUser,
    findUserById,
    updateUser,
};
