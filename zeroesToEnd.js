/// <summary>Move all the zeroes to the end an array.</summary>
/// <remarks>It is solution for https://edabit.com/challenge/XR4suWJok9wdaNJ5j.</remarks>
/// <example>zeroesToEnd([1, 2, 0, 0, 4, 0, 5]) --> [1, 2, 4, 5, 0, 0, 0]</example>
function zeroesToEnd(arr) {
  // Delete all zero elements of the array and determining their number in the LCount value.
  var LCount = 0;
  for (var i = arr.length - 1; i != -1; i--) {
    if (arr[i] == 0) {
      arr.splice(i, 1);
      LCount++;
    }
  }

  // Add to the end of the array LCount zeroes elements.
  var LArrLen = arr.length - 1;
  for (var i = 1; i != LCount + 1; i++) {
    arr[LArrLen + i] = 0;
  }

  return arr;
}  // zeroesToEnd

function test(arr, valid) {
  var LNewArr = zeroesToEnd(arr);
  return ('zeroesToEnd(' + arr.toString() + '):' + '\t' + LNewArr.toString() + (LNewArr = valid ? '=' : '<>') + valid.toString());
}  // test

var str = test([1, 2, 0, 0, 4, 0, 5], [1, 2, 4, 5, 0, 0, 0]) + '\n' +
          test([0, 0, 2, 0, 5], [2, 5, 0, 0, 0]) + '\n' +
          test([4, 4, 5], [4, 4, 5]) + '\n' +
          test([0, 0], [0, 0]) + '\n' +
          test([0, 0, 0, 0, -1, 2, 0, 0, 3, 4, 5, 0, 0, 0], [-1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0]) + '\n' +
          '\n';
console.log(str);
