import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database_my.ts";
import { Order } from "./Order.ts";

export class Delivery extends Model {
  declare id: string;
  declare order_id: string;
  declare status: string;
  declare notes: string;
  declare latitude: string;
  declare longitud: string;
  declare ocurred_at: Date;
}

Delivery.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: { type: DataTypes.UUID, allowNull: false },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "assigned",
        "picked_up",
        "in_transit",
        "delivered",
        "cancelled",
      ),
      allowNull: false,
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
    latitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
    longitude: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
    occurred_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "deliveries",
    timestamps: false,
  },
);

Delivery.belongsTo(Order, { foreignKey: "order_id" });
