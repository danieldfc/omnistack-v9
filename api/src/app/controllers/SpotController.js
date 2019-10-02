import User from '../models/User';
import Spot from '../models/Spot';

class SpotController {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  }

  async store(req, res) {
    const { filename: thumbnail } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: { message: 'User not found.' } });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail,
      company,
      techs: techs.split(',').map(tech => tech.trim())
    })

    return res.json(spot);
  }
}

export default new SpotController();
