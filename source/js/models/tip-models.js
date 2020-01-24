const tipCollection = new Map([
  [`stage-1`, `3 броска. 2 последних участника вылетают из турнира.`],
  [`stage-2`, `Мультимножитель умножает очки участника с предыдущей фазы на случайный множителью`],
]);

export default class TipInfo {
  constructor() {
    this.tip = null;
    this.tipCollection = tipCollection;
  }

  getTipForStage(stageLvl) {
    switch(stageLvl) {
      case `stage-1`:
        this.tip = tipCollection.get(`stage-1`);
        return this.tip;
      case `stage-2`:
        this.tip = tipCollection.get(`stage-2`);
        return this.tip;
    }
  }
}
