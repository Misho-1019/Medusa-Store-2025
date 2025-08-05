const { MedusaContainer } = require("@medusajs/framework")

async function createAdmin() {
  try {
    // Get the container instance
    const container = MedusaContainer.getInstance()
    
    // Resolve the services
    const userModuleService = container.resolve("userModuleService")
    const authModuleService = container.resolve("authModuleService")
    
    const adminEmail = "mikailtorres99@gmail.com"
    const adminPassword = "Mvt12345"
    
    // Check if admin already exists
    const [existingUsers] = await userModuleService.listAndCountUsers({
      email: adminEmail
    })
    
    if (existingUsers.length > 0) {
      console.log("Admin user already exists, skipping creation")
      return
    }
    
    // Create admin user
    const user = await userModuleService.createUsers({
      email: adminEmail,
      first_name: "Admin",
      last_name: "User"
    })
    
    // Create auth identity for the user with password
    await authModuleService.createAuthIdentities({
      provider_id: "emailpass",
      entity_id: adminEmail,
      provider_metadata: {
        email: adminEmail,
        password: adminPassword
      }
    })
    
    console.log("Admin user created successfully with email:", adminEmail)
    
  } catch (error) {
    console.log("Error creating admin:", error.message)
  }
  
  process.exit(0)
}

createAdmin()