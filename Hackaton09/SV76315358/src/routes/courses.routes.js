const { Router } = require("express");
const { Course, User } = require("../models");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, published, ownerId } = req.body;

    const user = await User.findByPk(ownerId);
    if (!user) return res.status(404).json({ error: "Owner not found" });

    const course = await Course.create({
      title,
      description,
      published,
      ownerId
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;