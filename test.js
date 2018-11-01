const loc = require('./loc')[0]
const origin = require('./loc')
const fs = require('fs')
let data = []

function test(loc){
    for (let i in loc){
      var ll = {
        value: loc[i]['n'],
        label: loc[i]['n']
      }
      if(origin[loc[i]['i']]){
        ll.children = test2(origin[loc[i]['i']])
      }
      data.push(ll)
    }
}

function test2(loc){
  var data = [];
  for (let i in loc){
    data.push({
      value: loc[i]['n'],
      label: loc[i]['n']
    })
  }
  return data;
}
test(loc)
fs.writeFile('ll.json', JSON.stringify(data))
console.log(data)