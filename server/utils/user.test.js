const expect = require('expect');
const { Users } = require('./users')

describe('Users class', () => {
  let users;
  beforeEach(()=> {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Quin',
      room: 'test'
    },{
      id: '2',
      name: 'Mike',
      room: 'React'
    },{
      id: '3',
      name: 'John',
      room: 'test'
    }]
  })
  it('Should add user to users array', () => {
    const users = new Users();
    const user = {
      id: '1',
      name: "Quin",
      room: 'Boys'
    }

    var resUser = users.addUser(user)
    expect(users.users).toEqual([user])
  })
  it('Should remove a user', () => {
    var userId = '1'
    var user = users.removeUser(userId);
    expect(user.id).toEqual(userId)
    expect(users.users.length).toEqual(2)
  })

  it('Should not remove a user', () => {
    var userId = '4'
    var user = users.removeUser(userId);
    expect(user).toNotExist()
    expect(users.users.length).toEqual(3)
  })

  it('Should find user', () => {
    var user = users.getUser('1');
    expect(user).toEqual({id: '1', name: 'Quin', room: 'test'})
  })

  it('Should not find user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist()
  })

  it('Should return names in test room', () => {
  var usersList = users.getUserList('test')
    expect(usersList).toEqual(['Quin', 'John'])
  })

  it('Should return names in React room', () => {
  var usersList = users.getUserList('React')
    expect(usersList).toEqual(['Mike'])
  })
})
