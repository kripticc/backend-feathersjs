"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      user_name: { type: Sequelize.STRING, allowNull: false, unique: true },
      display_name: { type: Sequelize.STRING, unique: true },
      avatarUrl: { type: Sequelize.STRING, unique: true },
      secret: { type: Sequelize.STRING, allowNull: false, unique: true },
      bio: { type: Sequelize.STRING },
      status: {
        type: Sequelize.ENUM("active", "inactive", "banned", "deleted"),
        defaultValue: "inactive",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  },
};
