//
// packLettersInString.js
// (C) 2022 Ivan Cherednichenko. All Rights Reserved.
//

/// <summary>Test function.</summary>
function testString(s, valid) {
  return (s + (s == valid ? '=' : '!=') + valid);
}  // testString

/// <summary>Pack string.</summary>
/// <example>packLetterInString('AAABBCCDDDEEF') --> 'A3B2C2D3E2F'</example>
function packLettersInString(s) {
  var r = '';
  if (s.length == 0) {
    return r;
  }  // if

  // Cycle converts string like 'AAABBCD' to ',AAA,BB,C,D'.
  var LChar = '\b';
  for (var i = 0; i < s.length; i++) {
    if (s[i] != LChar) {
      r += ',';
    }  // if

    r += s[i];
    LChar = s[i];
  }  // for
  r = r.substring(1, r.length);

  var LArr = r.split(',');

  r = '';
  for (var i = 0; i < LArr.length; i++) {
    r += LArr[i][0] + (LArr[i].length > 1 ? LArr[i].length : '');
  }  // for

  return r;
}  // packLettersInString

/// <summary>Unpack string which packed by packLettersInString() function.</summary>
/// <example>unpackLettersInString('A3B2C2D3E2FF') --> 'AAABBCCDDDEE'</example>
function unpackLettersInString(s) {

  function isNumber(v) {
    return ("0123456789".includes(v));
  }  // isNumber

  function dupeString(v, count) {
    var r = '';
    for (var i = 0; i != count; i++) {
      r += v;
    }  // for
    return r;
  }  // dupeString

  var r = '';
  if (s.length == 0) {
    return r;
  }  // if

  // Cycle converts string like 'A10B2C13DE2' to 'A,10,B,2,C,13,D,1,E,2,'.
  for (var i = 0; i < s.length; i++) {
    if (isNumber(s[i])) {
      r += s[i] + ((i != s.length - 1) && (isNumber(s[i +1])) ? '' : ',');
      continue;
    }  // if

    r += s[i] + ',' + ((i != s.length - 1) && (!isNumber(s[i + 1])) ? '1,' : '');
  }  // for
  r = r.substring(0, r.length - 1);

  if (!isNumber(r[r.length - 1])) {
    r += ',1';
  }  // if

  var LArr = r.split(',');

  var LCount = 0;
  var LChar = '\b';
  r = '';
  for (var i = 0; i < LArr.length; i++) {
    if (!isNumber(LArr[i][0])) {
      LChar = LArr[i][0];
    }  // if
    else {
      LCount = parseInt(LArr[i]);
    }  // if..else

    if ((i == LArr.length - 1) && (LCount == 0)) {
      LCount = 1;
    }  // if

    if ((LChar != '\b') && (LCount != 0)) {
      r += dupeString(LChar, LCount);
      LCount = 0;
    }  // if
  }  // for
  return r;
}  // unpackLettersInString