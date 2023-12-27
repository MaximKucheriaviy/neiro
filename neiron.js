const fs = require("fs/promises");

class Neiron {
  constructor(expo = 1.1) {
    this.expo = expo;
    this.connections = [];
    this.value = 0;
    this.signal;
  }
  sigmoid(x) {
    return 1 / (1 + Math.pow(this.expo, x * -1));
  }
  createConnection(neiron, weight = 0.5) {
    this.connections.push({ neiron, weight });
  }
  resolve() {
    if (this.connections.length > 0) {
      for (let i = 0; i < this.connections.length; i++) {
        this.value +=
          this.connections[i].neiron.signal * this.connections[i].weight;
      }
    }
    this.signal = this.sigmoid(this.value);
  }
}

async function weightToFile(NeiroNet = []) {
  const weights = [];
  for (let i = 0; i < NeiroNet.length; i++) {
    weights.push([]);
    for (let j = 0; j < NeiroNet[i].length; j++) {
      weights[i].push([]);
      NeiroNet[i][j].connections.forEach((item) => {
        weights[i][j].push(item.weight);
      });
    }
  }
  await fs.writeFile("./weights.json", JSON.stringify(weights));
}

async function getWeights() {
  const result = await fs.readFile("./weights.json", "utf-8");
  return JSON.parse(result);
}

module.exports = {
  Neiron,
  weightToFile,
  getWeights,
};
