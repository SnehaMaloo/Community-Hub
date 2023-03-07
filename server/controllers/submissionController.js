const Submission = require('../models/submission');
// Controller function to add a new submission to the database
module.exports.addSubmission = async (req, res, next) => {
  try {
      const { data,title, description, likes, username, date } = req.body;
      const newSubmission = Submission.create({
        data: data,
        title: title,
        description: description,
        likes: likes,
        username: username,
        date: date,
      });
      if (newSubmission) {
        return res.json({ msg: "Submission uploaded successfully." });
      } else {
        return res.json({
          msg: "Failed to add submission to the database.",
        });
      }
    }catch (ex) {
    next(ex);
  }
};


// Controller function to retrieve all submissions from the database
module.exports.getSubmissions = (req, res) => {
  Submission.find({}, (err, submissions) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      res.status(200).json({ submissions });
    }
  });
};

// Controller function to update the likes of a submission in the database
module.exports.updateSubmission = async (req, res, next) => {
  try {
    const { _id, likes } = req.body;
    const submission = await Submission.findByIdAndUpdate(_id, { likes }, { new: true });
    if (submission) {
      return res.json({ msg: "Submission updated successfully." });
    } else {
      return res.json({ msg: "Failed to update submission." });
    }
  } catch (ex) {
    next(ex);
  }
};

