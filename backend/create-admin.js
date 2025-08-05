const { initialize } = require("@medusajs/medusa")

async function createAdmin() {
  try {
    // Initialize Medusa
    const { container } = await initialize()
    const userService = container.resolve("userService")
    
    // Check if admin already exists
    const existingUsers = await userService.list()
    if (existingUsers.length > 0) {
      console.log("Admin users already exist, skipping creation")
      return
    }
    
    // Create admin user
    await userService.create({
      email: "mikailtorres99@gmail.com",
      password: "Mvt12345",
      role: "admin"
    })
    
    console.log("Admin user created successfully!")
  } catch (error) {
    console.log("Error creating admin:", error.message)
    // Don't fail the deployment if admin creation fails
  }
  
  process.exit(0)
}

createAdmin()