const { medusaContainer } = require("@medusajs/medusa")
const { UserService } = require("@medusajs/medusa")

async function createAdmin() {
  const userService = medusaContainer.resolve("userService")
  
  try {
    await userService.create({
      email: "mikailtorres99@gmail.com",
      password: "Mvt12345",
      role: "admin"
    })
    console.log("Admin user created successfully!")
  } catch (error) {
    console.log("Error creating admin:", error.message)
  }
}

createAdmin()