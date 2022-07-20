const userDto = (user) => {

  const { password, ...other } = user._doc;
  return other
}

module.exports = userDto;