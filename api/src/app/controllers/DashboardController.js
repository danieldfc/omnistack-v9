import User from "../models/User";
import Spot from "../models/Spot";

class DashboardController {
  async index(req, res) {
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: { message: "User not found" } });
    }

    const spots = await Spot.find({ user: user_id });

    return res.json(spots);
  }
}

export default new DashboardController();
