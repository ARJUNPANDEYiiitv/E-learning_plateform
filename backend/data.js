import bcrypt from 'bcryptjs';
export default {
    users:[
        {
      name: 'Arjun',
      email: 'admin@gmail.com',
      phNumber:'1234567891',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'Abhijeet Raj',
      email: 'user@gmail.com',
      phNumber:'1234567892',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },

    ],
    
}