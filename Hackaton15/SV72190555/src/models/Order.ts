import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database_my.ts";

export class Order extends Model {
  declare id: string;
  declare client_id: string;
  declare courier_id: string | null;
  declare tracking_code: string;
  declare origin_address: string;
  declare dest_address: string;
  declare description: string;
  declare weight_kg: number;
  declare status: string;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: { type: DataTypes.UUID, allowNull: false },
    courier_id: { type: DataTypes.UUID, allowNull: true },
    tracking_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    origin_address: { type: DataTypes.TEXT, allowNull: false },
    dest_address: { type: DataTypes.TEXT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    weight_kg: { type: DataTypes.DECIMAL(6, 2), defaultValue: 0 },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "assigned",
        "picked_up",
        "in_transit",
        "delivered",
        "cancelled",
      ),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
    { unique: true, fields: ['tracking_code'], name: 'orders_tracking_code' }
  ],
  },
);

// Order.belongsTo(Client,  { foreignKey: 'client_id',  as: 'client'  });
// Order.belongsTo(Courier, { foreignKey: 'courier_id', as: 'courier' });
