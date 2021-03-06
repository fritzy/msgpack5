
var test    = require('tape').test
  , msgpack = require('../')

test('encoding/decoding 64-bits big-endian unsigned integers', function(t) {
  var encoder = msgpack()
    , allNum  = []
    , base    = 0xffffffff

  allNum.push(0xffffffff)

  allNum.push(0xffffffffeeeee)


  allNum.forEach(function(num) {
    t.test('encoding ' + num, function(t) {
      var buf = encoder.encode(num)
      t.equal(buf.length, 9, 'must have 9 bytes')
      t.equal(buf[0], 0xcf, 'must have the proper header')
      t.equal(buf.readUInt32BE(5) * base + buf.readUInt32BE(1), num, 'must decode correctly');
      t.end()
    })

    t.test('mirror test ' + num, function(t) {
      t.equal(encoder.decode(encoder.encode(num)), num, 'must stay the same');
      t.end()
    })
  })

  t.end()
})
