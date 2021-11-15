'use strict';

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@demo.com',
        username: "demo",
        password: '$2a$10$YrOF9FPEoRzg4METInhFgeKDIFd1bhq1MIHmaNINgblhbf94IbJta',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', {
      email: 'demo@demo.com'
    }, {});
  },
};
