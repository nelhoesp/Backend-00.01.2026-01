const { Router } = require("express");
const { Op } = require("sequelize");
const { User } = require("../models");
const { appError } = require("../middlewares/errorHandler");
const { getPagination, paginatedResponse } = require("../utils/pagination");

const router = Router();

router.get("/all", async (req, res, next) => {
  try {
    const { role, q, order: rawOrder } = req.query;
    const { page, pageSize, limit, offset } = getPagination(req.query);

    const where = {};

    if (role) {
      const validRoles = ["admin", "instructor", "student"];
      if (!validRoles.includes(role)) {
        return next(appError(400, "INVALID_ROLE", "role no permitido"));
      }
      where.role = role;
    }

    if (q && q.trim()) {
      const search = `%${q.trim()}%`;
      where[Op.or] = [
        { firstName: { [Op.iLike]: search } },
        { lastName: { [Op.iLike]: search } },
        { email: { [Op.iLike]: search } },
      ];
    }

    let orderClause = [["createdAt", "DESC"]];
    if (rawOrder) {
      const [field, dir] = rawOrder.split(":");
      const allowedField = ["firstName", "lastName", "email", "createdAt", "role"];
      if (allowedField.includes(field)) {
        orderClause = [[field, (dir || "ASC").toUpperCase()]];
      }
    }

    const result = await User.findAndCountAll({ where, order: orderClause, limit, offset });
    return res.json(paginatedResponse(result, page, pageSize));

  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return next(appError(404, "NOT_FOUND", "usuario no encontrado"));

    return res.json({ status: "ok", data: user });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash: password,
      role
    });
    return res.status(201).json({ status: "ok", data: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;