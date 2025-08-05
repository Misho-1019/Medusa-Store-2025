const { execSync } = require('child_process')

async function createAdmin() {
  try {
    console.log("Creating admin user via Medusa CLI...")

    // Use Medusa CLI to create user directly
    execSync(`railway run npx medusa user -e mikailtorres99@gmail.com -p Mvt12345`, {
      stdio: 'inherit',
      cwd: process.cwd()
    })

    console.log("Admin user created successfully!")
  } catch (error) {
    console.log("Admin user might already exist or error occurred:", error.message)
  }
}

createAdmin()