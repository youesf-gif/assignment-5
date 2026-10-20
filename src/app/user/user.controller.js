import userService from "./user.service.js";

async function createUser(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        await userService.createUser(name, email, password, role);

        res.json({ message: "User added successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

async function updateOrCreateUser(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        await userService.updateOrCreateUser(
            req.params.id,
            name,
            email,
            password,
            role,
        );

        res.json({ message: "User created or updated successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

async function getUserByEmail(req, res, next) {
    try {
        const { email } = req.query;
        const data = await userService.getUserByEmail(email);

        res.json({ message: "User retrieved successfully", data });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        const data = await userService.getUserById(id);

        res.json({ message: "User retrieved successfully", data });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { createUser, updateOrCreateUser, getUserByEmail, getUserById };
