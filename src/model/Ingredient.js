const unitsNames = ["מ''ל", 'גרם', 'כפות', 'כפיות', 'כוסות'];

class Ingredient {
  constructor(name, type, count) {
    this.name = name ?? '';
    this.type = type ?? '';
    this.count = count ?? '';
  }

  toString() {
    let stringUnitName = '';
    let unitsName = '';
    switch (this.type) {
      case 0:
      case 1:
        stringUnitName = `${this.count} ${unitsNames[this.type]}`;
        break;
      case 2:
        unitsName = this.count === 1 ? 'כף' : unitsNames[2];
        stringUnitName = `${this.count} ${unitsName}`;
        break;

      case 3:
        unitsName = this.count === 1 ? 'כפית' : unitsNames[3];
        stringUnitName = `${this.count} ${unitsName}`;
        break;

      case 4:
        unitsName = this.count === 1 ? 'כוס' : unitsNames[4];
        stringUnitName = `${this.count} ${unitsName}`;
        break;
    }
    return `${stringUnitName} ${this.name}`;
  }
}

export default Ingredient;
