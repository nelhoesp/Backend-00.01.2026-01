const sequelize = require("../db");
const User = require("./User");
const Course = require("./Course");

User.hasMany(Course, { foreignKey: "ownerId", as: "ownedCourses" });
Course.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

module.exports = {
  sequelize,
  User,
  Course
};