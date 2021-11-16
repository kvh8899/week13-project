'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Posts', [
        {
          userId: 1,
          heading:'How to create mods using java in minecraft',
          headerImage: 'https://miro.medium.com/max/2000/1*UkfcpiTE0HEKp5B7S3_zuA.jpeg',
          subText: 'Intro to making mods in minecraft',
          mainText: 'asdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          heading:'Why bonsole is the greatest package in the universe',
          headerImage: 'https://miro.medium.com/max/1400/0*OR_rD_SPiLtWj5cU',
          subText: 'Bonsole is the best',
          mainText: 'asdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          heading:'What is the best machine learning algorithm',
          headerImage: 'https://miro.medium.com/max/1400/0*i_Qk7yIdHyi7DQr4.png',
          subText: 'Does a best machine learning algorithm exist?',
          mainText: 'asdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 4,
          heading:'Three Python Projects that Will Help Automate Your Life',
          headerImage: 'https://miro.medium.com/max/1400/1*88U0EI-rnnQIuIkTFIC1cQ.png',
          subText: 'Beginner and Advanced Projects in Python',
          mainText: 'asdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 5,
          heading:'PHP is Killing Python',
          subText: 'Why PHP Is More Popular and More Hated Than Ever',
          headerImage: 'https://miro.medium.com/max/1400/1*zNMEF9DmEukht_ItYqp5Fg.jpeg',
          mainText: 'asdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 6,
          heading:'How to Clone Any Website',
          headerImage: 'https://miro.medium.com/max/1400/1*X34s7n3V9nCNzq6v21cDjw.jpeg',
          subText: 'Full Stack Engineering Tips',
          mainText: 'asdf',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Posts', null, {});
    
  }
};
