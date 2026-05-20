import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database_my.ts";

export class Payment extends Model {
  declare id: string;
  declare user_id: string;
  declare amount: number;
  declare currency: string;
  declare status: string;
  declare stripe_payment_intent_id: string | null;
  declare metadata: string | null;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: { type: DataTypes.STRING(100), allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING(10), defaultValue: "usd" },
    status: {
      type: DataTypes.ENUM("pending", "paid", "refunded", "failed"),
      defaultValue: "pending",
    },
    stripe_payment_intent_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    metadata: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
