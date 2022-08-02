'use strict'

module.exports = {
  up: async (queryInterface) => {
    return await queryInterface.bulkInsert('Users', [{
      id: '1d36ad64-1f9b-442e-ac79-03e1acbcf084',
      firstName: 'Mica',
      lastName: 'Mecava',
      email: 'mica@getnada.com',
      company: 'Microsoft',
      password: '$2a$10$S7UWYkuwdHLD24Onc51g/O8cBEllw.0mIBd98lRFJu8RtZqnzGKNO',
      type: 'staff',
      createdAt: '2022-08-02T05:54:06.683Z'
    },
    {
      id: 'aef33417-da85-4742-bc1e-fc70d168ef75',
      firstName: 'Admin',
      lastName: 'Mecava',
      email: 'admin@getnada.com',
      company: 'Microsoft',
      password: '$2a$10$IYwNi8JP1WVMI8t5j41no.636wzWgWt1MYMo.VV0IugDKTB5CPw.6',
      type: 'admin',
      createdAt: '2022-08-02T13:06:33.832Z',
      updatedAt: '2022-08-02T13:06:33.832Z'
    }
    ], {})
  },

  down: async (queryInterface) => {
    return await queryInterface.bulkDelete('Users', null, {})
  }
}
