const fileStream = require("fs");
const fileName = process.argv[2];
const newStringArr = [];

fileStream.readFile(fileName, "utf8", function (err, data) {
  if (err) throw err;
  const korReg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  console.log("Input: " + fileName);
  const splitString = data.split("\n");
  const splitStringLength = splitString.length;

  for (let i = 0; i < splitStringLength; i++) {
    const element = splitString[i];
    if (!korReg.test(element)) {
      if (element !== "") newStringArr.push(element);
    }
  }
  // console.log(newStringArr);

  const date = new Date();
  fileStream.writeFile(`${fileName}_${date}`, newStringArr.join("\n"), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The result file is saved!");
  });
});
