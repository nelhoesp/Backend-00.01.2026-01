import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database_my.ts";

export class Product extends Model {
  declare id: string;
  declare nombre: string;
  declare descripcion: string;
  declare precio: number;
  declare stock: number;
  declare imagen: string | null;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    imagen: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
