const tipCollection = new Map([
  [`stage-1`, `3 броска. 2 последних участника вылетают из турнира.`],
  [`stage-2`, `Мультимножитель умножает очки участника с предыдущей фазы на случайный множитель.`],
  [`stage-3`, `Рандомится знак вычитания или сложения. Рандомится число. Очки участника считаются.`],
  [`stage-4`, `Очки обнуляются. 5 бросков, очки считаются.`],
]);

const stageLvlList = [`stage-1`, `stage-2`, `stage-3`, `stage-4`];

export default class TipInfo {
  constructor() {
    this.tip = null;
    this.tipCollection = tipCollection;
    this.stageLvlList = stageLvlList;
  }

  getTipCollection() {
    return this.tipCollection;
  }

  getStageLvlList() {
    return this.stageLvlList;
  }

  getTipForStage(stageLvlList) {
    switch(stageLvlList) {
      case `stage-1`:
        this.tip = tipCollection.get(`stage-1`);
        break;
      case `stage-2`:
        this.tip = tipCollection.get(`stage-2`);
        break;
      case `stage-3`:
        this.tip = tipCollection.get(`stage-3`);
        break;
      case `stage-4`:
        this.tip = tipCollection.get(`stage-4`);
        break;
    }
    return this.tip;
  }
}
