const axios = require("axios");
const Dev = require("../models/Dev");
const StringToArray = require("../util/string_to_array");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { login, avatar_url, bio } = response.data;
      let { name } = response.data;

      if (!name) {
        name = login;
      }

      const techsArray = StringToArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      return res.json(dev);
    }

    return res.json({
      errorMessage: "Já existe um Dev cadastrado com esse usuário do github",
      dev
    });
  },

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async show(req, res) {
    const github_username = req.params.github_username;

    const dev = await Dev.find({ github_username });

    return res.json(dev);
  },

  async update(req, res) {
    const github_username = req.params.github_username;

    let dev = await Dev.findOne({ github_username });

    if (!github_username || !dev) {
      return res.json({
        errorMessage: "Não foi encontrado nenhum Dev com esse github"
      });
    }

    if (req.body.github_username) {
      return res.json({
        errorMessage:
          "Não é possível mudar o usuário do github, se quiser usar o aplicativo em outra conta github, crie uma nova conta"
      });
    }

    if (req.body.techs) {
      req.body.techs = StringToArray(req.body.techs);
    }

    dev = await Dev.findOneAndUpdate({ github_username }, req.body, {
      new: true
    });

    return res.json(dev);
  },

  async destroy(req, res) {
    const github_username = req.params.github_username;

    let dev = await Dev.findOne({ github_username });

    if (!github_username || !dev) {
      return res.json({
        errorMessage: "Não foi possível achar o usuário com esse github"
      });
    }

    dev = await Dev.findOneAndRemove({ github_username });

    return res.json(dev);
  }
};
