const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthService {
  async hashedPassword(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async validatePassword(password, hash) {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  }
}

module.exports = new AuthService();