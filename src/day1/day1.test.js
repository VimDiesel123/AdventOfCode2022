const { mostCalories, topThreeCalories}= require("./day1");


test('Most calories for test input should be 24000', () => {
  expect(mostCalories("./test_input.txt")).toBe(24000);
})

test('Sum of top three elves calories should be 45000', () =>{
  expect(topThreeCalories('./test_input.txt')).toBe(45000);
})
