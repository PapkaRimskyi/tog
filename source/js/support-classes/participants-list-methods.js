import AbstractClass from './abstract-class.js';

export default class ParticipantsListMethods extends AbstractClass {
  constructor() {
    super();
    this.MAX_CUBE_POINTS = 12;
  }

  throwCube(list, pointsType) {
    if (this.launchCount !== this.LAUNCH_COUNT_LESS_THAN) {
      this.launchCount++;
      for (let participant of list) {
        if (isNaN(participant[`${pointsType}`])) {
          participant[`${pointsType}`] = 0;
        }
        participant[`${pointsType}`] += Math.floor(Math.random() * this.MAX_CUBE_POINTS);
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
}
