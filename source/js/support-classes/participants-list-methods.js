import AbstractClass from './abstract-class.js';

export default class ParticipantsListMethods extends AbstractClass {
  constructor() {
    super();
    this.MAX_CUBE_POINTS = 12;
  }

  throwCube(list) {
    if (this.launchCount !== this.MAX_LAUNCH_COUNT) {
      this.launchCount++;
      for (let participant of list) {
        participant.points += Math.floor(Math.random() * this.MAX_CUBE_POINTS);
      }
    }
    this.sortParticipantsList(list);
  }

  sortParticipantsList(list) {
    list.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      } else if (a.points < b.points) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getCellCollection(cellType) {
    switch (cellType) {
      case `cellNames`:
        return this.cellNames;
      case `cellPoints`:
        return this.cellPoints;
    }
  }
}
