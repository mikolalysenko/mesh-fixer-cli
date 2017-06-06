#!/usr/bin/env node

var repairMesh = require('mesh-fixer')

var str = []
process.stdin
  .setEncoding('utf-8')
  .on('readable', function () {
    var chunk = process.stdin.read()
    if (chunk) {
      str.push(chunk)
    }
  })
  .on('end', function () {
    var verts = []
    var faces = []

    str.join('').split('\n').forEach(function (line) {
      var toks = line.split(/\s+/)
      if (toks[0] === 'v') {
        verts.push(toks.slice(1).map((x) => +x))
      } else if (toks[0] === 'f') {
        faces.push(toks.slice(1).map((x) => (x - 1) | 0))
      }
    })

    var repaired = repairMesh(faces, verts)

    repaired.positions.forEach((p) => {
      console.log('v', p[0], p[1], p[2])
    })

    repaired.cells.forEach((c) => {
      console.log('f', c[0] + 1, c[1] + 1, c[2] + 1)
    })
  })
