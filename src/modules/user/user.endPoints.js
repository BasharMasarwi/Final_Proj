import { roles } from "../../middleware/auth.js";

export const endPoints = {

    create: [roles.User],
    delete: [roles.User],
    clear: [roles.User],
    get: [roles.User],
    update: [roles.User],
    deleteAdmin: [roles.SuperAdmin],
    createAdmin: [roles.SuperAdmin],
    clearAdmin: [roles.SuperAdmin],
    getAdmin: [roles.SuperAdmin],
    updateAdmin: [roles.SuperAdmin],
}