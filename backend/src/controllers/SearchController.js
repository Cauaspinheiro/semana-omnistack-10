const Dev = require("../models/Dev");

const StringToArray = require("../util/string_to_array");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs, distance = 10000 } = req.query;

    if (!techs) {
      return res.json({ errorMessage: "Não foram selecionadas tecnologias" });
    }

    if (techs == "all") {
      const devs = await Dev.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            $maxDistance: distance
          }
        }
      });

      return res.json(devs);
    }

    const techsArray = StringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: distance
        }
      }
    });

    return res.json(devs);
  }
};
