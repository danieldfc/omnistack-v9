import User from '../models/User';
import Spot from '../models/Spot';
import Booking from '../models/Booking';

class BookingController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: { message: 'User not found' } })
    }

    const spot = await Spot.findById(spot_id);

    if (!spot) {
      return res.status(400).json({ error: { message: 'User not found' } })
    }

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking.populate('spot')
      .populate('user')
      .execPopulate();

    return res.json(booking);
  }
}

export default new BookingController();
