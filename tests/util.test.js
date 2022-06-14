const { validation } = require("../util/util")

test('should return true if user details are correct', () => {
    expect(validation("user1", "user2","0501234567", "s1")).toBeTruthy()
    expect(validation("user1", "user2","0401234567", "s1")).toBeFalsy()
    expect(validation("user1", "user2","8501234567", "s1")).toBeFalsy()
    expect(validation("user1", "user2","0501234567", "בחר בית כנסת")).toBeFalsy()
    expect(validation("", "user2","0501234567", "s1")).toBeFalsy()
    expect(validation("user1", "","0501234567", "s1")).toBeFalsy()
})