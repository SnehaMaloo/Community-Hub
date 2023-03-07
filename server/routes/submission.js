const { addSubmission, getSubmissions ,updateSubmission} = require("../controllers/submissionController");
const router = require("express").Router();
router.post("/", addSubmission);
router.get("/", getSubmissions);
router.put("/:id", updateSubmission);
module.exports = router;
