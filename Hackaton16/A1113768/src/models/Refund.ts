import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database_my.ts";
import { Payment } from "./Payment.ts";

export class Refund extends Model {
  declare id: string;
  declare payment_id: string;
  declare amount: number;
  declare reason: string;
  declare stripe_refund_id: string | null;
  declare status: string;
}

Refund.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    payment_id: { type: DataTypes.UUID, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    reason: { type: DataTypes.STRING(255), allowNull: true },
    stripe_refund_id: { type: DataTypes.STRING(255), allowNull: true },
    status: {
      type: DataTypes.ENUM("pending", "processed", "failed"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "refunds",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

Refund.belongsTo(Payment, { foreignKey: "payment_id" });
