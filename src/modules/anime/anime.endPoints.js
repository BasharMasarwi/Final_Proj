import { roles } from "../../middleware/auth.js";

export const endPoints = {
  create: [roles.SuperAdmin, roles.Admin],
  delete: [roles.SuperAdmin, roles.Admin],
  clear: [roles.SuperAdmin, roles.Admin],
  get: [roles.SuperAdmin, roles.Admin, roles.User],
  update: [roles.SuperAdmin, roles.Admin],
  deleteAdmin: [roles.SuperAdmin],
  createAdmin: [roles.SuperAdmin],
  clearAdmin: [roles.SuperAdmin],
  getAdmin: [roles.SuperAdmin],
  updateAdmin: [roles.SuperAdmin],
};
