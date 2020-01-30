const tipCollection = new Map([
  [`stage-1`, `3 броска. 2 последних участника вылетают из турнира.`],
  [`stage-2`, `Мультимножитель умножает очки участника с предыдущей фазы на случайный множитель.`],
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
        return this.tip;
      case `stage-2`:
        this.tip = tipCollection.get(`stage-2`);
        return this.tip;
    }
  }
}
