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

  findParticipants(participantsList, nameContainers) {
    const participants = [];
    if (participantsList.length > 2) {
      for (let i = 0; i < participantsList.length; i++) {
        for (let name of nameContainers) {
          if (participantsList[i].name === name.textContent) {
            participants.push(participantsList[i]);
          }
        }
      }
      return participants;
    } else {
      return participantsList;
    }
  }

  highlightingParticipant(containerList, maxPassedChecks) {
    let passedChecks = 0;
    for (let container of containerList) {
      if (passedChecks < maxPassedChecks) {
        container.parentElement.style.borderColor = `#36b847`;
        passedChecks++;
      } else {
        container.parentElement.style.borderColor = `#da3131a4`;
      }
    }
  }

  highlightingStageWinner(participantsList, nameContainers) {
    const participants = this.findParticipants(participantsList, nameContainers);
    for (let i = 0; i < 1; i++) {
      if (participants[i].points > participants[i + 1].points) {
        nameContainers[i].style.backgroundColor = `#36b847`;
        nameContainers[i + 1].style.backgroundColor = `#da3131a4`;
      } else {
        nameContainers[i].style.backgroundColor = `#da3131a4`;
        nameContainers[i + 1].style.backgroundColor = `#36b847`;
      }
    }
  }
}
