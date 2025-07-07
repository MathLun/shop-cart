import AccountMemoryRepo from "./auth/account-memory-repo";
import AccountRepo from "./auth/account-repo";
import ClientMemoryRepo from "./clients/client-memory-repo";
import ClientRepo from "./clients/client-repo";
import AdminRepo from "./admin/admin-repo";
import AdminMemoryRepo from "./admin/admin-memory-repo";
import Admin from "./admin/admin";

export const clientRepo: ClientRepo = new ClientMemoryRepo()
export const accountRepo: AccountRepo = new AccountMemoryRepo()
export const adminRepo: AdminRepo<Admin> = new AdminMemoryRepo()