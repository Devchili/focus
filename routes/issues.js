const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const issuesController = require("../controllers/issues");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//router.get("/:id", ensureAuth, issuesController.getIssue);
//router.post("/createIssue/:id", upload.single("file"), issuesController.createIssue);
//router.put("/updateIssue/:id", issueControllerfa-spin.updateIssue);
//createIssue
//deleteIssue

module.exports = router;
