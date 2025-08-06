import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function createAdminUser({ container }: ExecArgs) {
  const logger = container.resolve("logger");
  const userModuleService = container.resolve(Modules.USER);
  
  const adminEmail = process.env.MEDUSA_ADMIN_EMAIL || "mikailtorres99@gmail.com";
  const adminPassword = process.env.MEDUSA_ADMIN_PASSWORD || "Mvt12345";
  
  try {
    // First, try to find existing user
    const existingUsers = await userModuleService.listUsers({
      email: adminEmail
    });
    
    if (existingUsers.length > 0) {
      logger.info(`Deleting existing admin user: ${adminEmail}`);
      await userModuleService.deleteUsers([existingUsers[0].id]);
    }
    
    // Create new admin user with proper DTO structure
    logger.info(`Creating admin user: ${adminEmail}`);
    const adminUser = await userModuleService.createUsers({
      email: adminEmail,
      first_name: "Admin",
      last_name: "User"
    });
    
    // Set password separately using auth module
    const authModuleService = container.resolve(Modules.AUTH);
    await authModuleService.createAuthIdentities({
      provider_identities: [{
        provider: "emailpass",
        entity_id: adminUser.id,
        provider_metadata: {
          email: adminEmail,
          password: adminPassword
        }
      }]
    });
    
    logger.info(`✅ Admin user created successfully: ${adminEmail}`);
    
  } catch (error) {
    logger.error("❌ Failed to create admin user:", error);
    throw error;
  }
}