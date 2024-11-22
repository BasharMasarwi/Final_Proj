import { roles } from "../../middleware/auth.js";

export const endPoints = {
    create: [roles.SuperAdmin,roles.Admin],
    getAll:  [roles.SuperAdmin,roles.Admin],
    getDetails: [roles.SuperAdmin,roles.Admin],
} 