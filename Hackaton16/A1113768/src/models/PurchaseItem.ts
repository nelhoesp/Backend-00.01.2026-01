import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database_my.ts";
import { Payment } from "./Payment.ts";
import { Product } from "./Product.ts";

export class PurchaseItem extends Model {
  declare id: string;
  declare payment_id: string;
  declare product_id: string;
  declare quantity: number;
  declare unit_price: number;
}

PurchaseItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    payment_id: { type: DataTypes.UUID, allowNull: false },
    product_id: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    tableName: "purchase_items",
    timestamps: false,
  },
);

PurchaseItem.belongsTo(Payment, { foreignKey: "payment_id" });
PurchaseItem.belongsTo(Product, { foreignKey: "product_id" });
