const cloudinary = require("../middleware/cloudinary");
const Issue = require("../models/issue");

module.exports = {
    getDashboard: async (req, res) => {
      try {
        const issues = await Issue.find({ user: req.user.id });

        res.render("dashboard.ejs", { issues: issues, user: req.user });

      } catch (err) {
        console.log(err);
      }
    },
    getIssue: async (req, res) => {
      try {
        const issues = await Issue.findById(req.params.id);
        res.render("issues.ejs", { issue: issue, user: req.user });

      } catch (err) {
        console.log(err);
      }
    },
    createIssue: async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        await Issue.create({
          title: req.body.title,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          caption: req.body.caption,
          user: req.user.id,
        });

        console.log("Issue has been submitted");
        res.redirect("/dashboard");

      } catch (err) {
        console.log(err);
      }
    },
    updateIssue: async (req, res) => {
        try {
          await Issue.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { statusbar: null },
            }
          );
          console.log("Status updated");
          res.redirect(`/issue/${req.params.id}`);
        } catch (err) {
          console.log(err);
        }
    },
    deleteIssue: async (req, res) => {
      try {
        let issue = await Issue.findById({ _id: req.params.id });

        await cloudinary.uploader.destroy(issue.cloudinaryId);
        await Issue.remove({ _id: req.params.id });

        console.log("Deleted Issue");
        res.redirect("/dashboard");

      } catch (err) {
        res.redirect("/dashboard");
      }
    },
  };
