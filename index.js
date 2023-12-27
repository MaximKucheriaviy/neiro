const { Neiron, weightToFile, getWeights } = require("./neiron.js");

const NeiroNet = [];
NeiroNet.push([]);
NeiroNet.push([]);
NeiroNet.push([]);

async function main() {
  const weight = await getWeights();
  //console.log(weight);

  for (let i = 0; i < 2; i++) {
    NeiroNet[0].push(new Neiron());
  }

  for (let i = 0; i < 10; i++) {
    NeiroNet[1].push(new Neiron());
    for (let j = 0; j < NeiroNet[0].length; j++) {
      NeiroNet[1][i].createConnection(NeiroNet[0][j], weight[1][i][j]);
    }
  }

  for (let i = 0; i < 1; i++) {
    NeiroNet[2].push(new Neiron());
    for (let j = 0; j < NeiroNet[1].length; j++) {
      NeiroNet[2][i].createConnection(NeiroNet[1][j], weight[2][i][j]);
    }
  }

  NeiroNet[0][0].value = 5;
  NeiroNet[0][1].value = 2;

  for (let i = 0; i < NeiroNet.length; i++) {
    for (let j = 0; j < NeiroNet[i].length; j++) {
      NeiroNet[i][j].resolve();
    }
  }

  console.log(NeiroNet[1][0]);

  weightToFile(NeiroNet);
}

main();
