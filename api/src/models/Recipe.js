const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //el valor se genera automaticamente
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cookingTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "https://st2.depositphotos.com/1310390/5294/v/950/depositphotos_52942549-stock-illustration-set-of-black-silhouette-food.jpg",
      },
      steps: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamps: false, ignoreDuplicates: true }
  );
};
