import mockjs, { Random } from "mockjs";

export default class DataFactory {
  static generate() {
    return mockjs.mock({
      "data|30-50": [
        {
          "name|1": "@first @last",
          "score|1": () => `${Random.natural(60, 100)}/100`
        }
      ]
    });
  }
}
