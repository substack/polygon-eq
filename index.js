module.exports = function cmpPolygon(A, B, epsilon) {
  if (epsilon === undefined) epsilon = 1e-8
  var dA = getDepth(A), dB = getDepth(B)
  if (dA === 2 && dB === 2) {
    return cmpRing(A,B,epsilon)
  } else if (dA === 3 && dB === 3) {
    return cmpRings(A,B,epsilon)
  } else if (dA === 4 && dB === 4) {
    return cmpMRings(A,B,epsilon)
  } else if (dA === 2 && dB === 3) {
    if (B.length !== 1) return false
    return cmpRing(A,B[0],epsilon)
  } else if (dA === 2 && dB === 4) {
    if (B.length !== 1 || B[0].length !== 1) return false
    return cmpRing(A,B[0][0],epsilon)
  } else if (dA === 3 && dB === 4) {
    if (B.length !== 1) return false
    return cmpRings(A,B[0],epsilon)
  } else if (dA === 3 && dB === 2) {
    if (A.length !== 1) return false
    return cmpRing(A[0],B,epsilon)
  } else if (dA === 4 && dB === 2) {
    if (A.length !== 1 || A[0].length !== 1) return false
    return cmpRing(A[0][0],B,epsilon)
  } else if (dA === 4 && dB === 3) {
    if (A.length !== 1) return false
    return cmpRings(A[0],B,epsilon)
  } else {
    return false
  }
}

function cmpMRings(A, B, epsilon) {
  if (A.length !== B.length) return false
  if (A.length <= 32) { // bitfield version
    var bf = 0
    for (var i = 0; i < A.length; i++) {
      for (var j = 0; j < B.length; j++) {
        if (((bf>>j)&1) === 1) continue
        if (cmpRings(A[i],B[j],epsilon)) {
          bf |= (1<<j)
          break
        }
      }
      if (j === B.length) return false
    }
    for (var j = 0; j < B.length; j++) {
      if (((bf>>j)&1) !== 1) return false
    }
    return true
  } else { // object version
    var bmatch = {}
    for (var i = 0; i < A.length; i++) {
      for (var j = 0; j < B.length; j++) {
        if (bmatch[j]) continue
        if (cmpRings(A[i],B[j],epsilon)) {
          bmatch[j] = true
          break
        }
      }
      if (j === B.length) return false
    }
    for (var j = 0; j < B.length; j++) {
      if (!bmatch[j]) return false
    }
    return true
  }
}

function cmpRings(A, B, epsilon) {
  if (A.length !== B.length) return false
  if (!cmpRing(A[0],B[0],epsilon)) return false
  if (A.length-1 <= 32) { // bitfield version
    var bf = 0
    for (var i = 1; i < A.length; i++) {
      for (var j = 1; j < B.length; j++) {
        if (((bf>>j)&1) === 1) continue
        if (cmpRing(A[i],B[j],epsilon)) {
          bf |= (1<<j)
          break
        }
      }
      if (j === B.length) return false
    }
    for (var j = 1; j < B.length; j++) {
      if (((bf>>j)&1) !== 1) return false
    }
    return true
  } else { // object version
    var bmatch = {}
    for (var i = 1; i < A.length; i++) {
      for (var j = 1; j < B.length; j++) {
        if (bmatch[j]) continue
        if (cmpRing(A[i],B[j],epsilon)) {
          bmatch[j] = true
          break
        }
      }
      if (j === B.length) return false
    }
    for (var j = 1; j < B.length; j++) {
      if (!bmatch[j]) return false
    }
    return true
  }
}

function cmpRing(A, B, e) {
  var ainit = A.length > 1 && cmp(A[0],A[A.length-1],e) ? 1 : 0
  var binit = B.length > 1 && cmp(B[0],B[B.length-1],e) ? 1 : 0
  if (A.length-ainit !== B.length-binit) return false
  for (var bstart = binit; bstart < B.length; bstart++) {
    if (!cmp(A[ainit], B[bstart], e)) continue
    var ib = bstart
    for (var i = 1+ainit; i < A.length; i++) {
      ib = (ib+1)%B.length
      if (ib < binit) ib++
      if (!cmp(A[i], B[ib], e)) break
    }
    if (i === A.length) return true
    ib = bstart
    for (var i = 1+ainit; i < A.length; i++) {
      ib = (ib+B.length-1)%B.length
      if (ib < binit) ib = B.length-1
      if (!cmp(A[i], B[ib], e)) break
    }
    if (i === A.length) return true
  }
  return false
}

function cmp(a,b,e) {
  return Math.abs(a[0]-b[0]) <= e && Math.abs(a[1]-b[1]) <= e
}

function getDepth(x) {
  for (var d = 0; Array.isArray(x); d++) x = x[0]
  return d
}
