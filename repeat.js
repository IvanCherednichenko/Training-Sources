//
// repeat.js
// (C) 2022 Ivan Cherednichenko. All Rights Reserved.
//

/// <summary>Repeats the string nb-times</summary>
/// <remarks>This function may be a solution for https://edabit.com/challenge/HQXJLmsGK9KiKmeDf but I dont check execution time.</remarks>
/// <example>repeat('A', 10) --> 'AAAAAAAAAA'</example>
function repeat(str, nb) {
  if ((nb > 0) && (nb <= 268435440)) {
    return str.repeat(nb);
  }
  return '';
}  // repeat

/// <summary>Test function to repeat().</summary>
function test(str, nb, valid) {
  return ('repeat(\"' + str + '\", ' + nb.toString() + ') is \"' + repeat(str, nb) + '\"' + (repeat(str, nb) == valid ? '=' : '<>') + '\"' + valid + '\"');
}  // test

console.log(test('a', 3, 'aaa'));
console.log(test('-', 5, '-----'));
console.log(test('A', 0, ''));
console.log(test('B', -1, ''));
console.log(test('C', 10000, 'C'.repeat(10000)));
