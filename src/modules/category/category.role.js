import { roles } from "../../middleware/auth.js";

export const endPoints = {
    create: [roles.Admin],
    getAll: [roles.Admin],
    getDetails: [roles.Admin],
}