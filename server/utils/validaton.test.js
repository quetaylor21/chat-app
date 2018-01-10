const expect = require('expect');
const {isRealString} = require('./validation')

describe('is real string', ()=> {
  it('Should reject non-string values', () => {
    const params = {
      name: 1,
      room:2
    }
    const {name, room} = params

    expect(isRealString(name)).toNotExist()
    expect(isRealString(room)).toNotExist()
  })
  it('Should reject string with only spaces', () => {
    const params = {
      name: "    ",
      room: "    "
    }
    const {name, room} = params

    expect(isRealString(name)).toNotExist()
    expect(isRealString(room)).toNotExist()
  })

  it('Should allow string with non-space characters', () => {
    const params = {
      name: "Quin   ",
      room: "  Boys"
    }
    const {name, room} = params

    expect(isRealString(name)).toExist()
    expect(isRealString(room)).toExist()
  })
})
