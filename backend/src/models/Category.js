module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'categories',
    timestamps: true,
    underscored: false
  });

  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products'
    });
    
    Category.belongsTo(models.Category, {
      foreignKey: 'parentId',
      as: 'parent'
    });
    
    Category.hasMany(models.Category, {
      foreignKey: 'parentId',
      as: 'children'
    });
  };

  return Category;
};