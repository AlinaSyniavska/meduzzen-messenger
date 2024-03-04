const {passwordService, tokenService, emailService} = require("../../services");
const {OAuth, ActionToken, User} = require("../../dataBase");
const {emailActionEnum} = require("../../constants");


module.exports = {
  login: async (req, res, next) => {
    try {
      const { password: hashPassword, _id } = req.user;
      const { password } = req.body;

      await passwordService.comparePassword(hashPassword, password);

      const tokens = tokenService.generateAuthTokens();

      await OAuth.create({
        userId: _id,
        ...tokens,
      });

      res.json({
        user: req.user,
        ...tokens,
      });
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      // const { access_token } = req;
      // const { email, name } = user;
      const { access_token } = req;

      await OAuth.deleteOne({ access_token });

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },

};
