const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const saltRounds = 10; // عدد جولات التجزئة
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function run() {
  const password = "123456";
  const hashed = await hashPassword(password);
  console.log("كلمة السر المشفرة:", hashed);
}

run();
