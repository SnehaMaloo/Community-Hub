const Event = require('../models/eventsModel');

// Controller function to add a new event to the database
module.exports.addEvent = async (req, res,next) => {
    try {
        const { name,date,time,description,location } = req.body;
        const data = await Event.create({
          title: name,
          location:location,
          description:description,
          time:time,
          date:date
        });
        console.log("working")
        if (data) return res.json({ msg: "Event added successfully." });
        else return res.json({ msg: "Failed to add event to the database" });
      } catch (ex) {
        next(ex);
      }
};

// Controller function to retrieve all events from the database
module.exports.getEvents = (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json({ events });
    }
  });
};

