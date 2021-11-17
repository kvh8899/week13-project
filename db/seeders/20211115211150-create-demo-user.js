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
      },
      {
        email: 'one@gmail.com',
        username: "Isaac Pak",
        password: '$2a$10$YrOF9FPEoRzg4METInhFgeKDIFd1bhq1MIHmaNINgblhbf94IbJta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'two@gmail.com',
        username: "Mark Zuckerberg",
        password: '$2a$10$YrOF9FPEoRzg4METInhFgeKDIFd1bhq1MIHmaNINgblhbf94IbJta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'three@gmail.com',
        username: "ConnorDawgVa",
        password: '$2a$10$YrOF9FPEoRzg4METInhFgeKDIFd1bhq1MIHmaNINgblhbf94IbJta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'four@gmail.com',
        username: "Ryan JOHNSON",
        password: '$2a$10$YrOF9FPEoRzg4METInhFgeKDIFd1bhq1MIHmaNINgblhbf94IbJta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'five@gmail.com',
        username: "Cameron",
        password: '$2a$10$YrOF9FPEoRzg4METInhFgeKDIFd1bhq1MIHmaNINgblhbf94IbJta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
