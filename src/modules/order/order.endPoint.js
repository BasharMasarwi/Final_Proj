import { roles } from "../../middleware/auth.js";

export const endpoints = {
    all: [roles.Admin],
    changeStatus: [roles.Admin],
    create: [roles.User],
    delete: [roles.User],
    clear: [roles.User],
    get: [roles.User],
    update: [roles.User]
}