import AbstractClass from './abstract-class.js';

export default class ParticipantsListMethods extends AbstractClass {
  constructor() {
    super();
    this.MAX_CUBE_POINTS = 12;
  }

  throwCube(list, pointsType, sortFunction = true) {
    if (this.LAUNCH_COUNT !== this.LAUNCH_COUNT_LESS_THAN) {
      this.LAUNCH_COUNT++;
      for (let participant of list) {
        if (isNaN(participant[`${pointsType}`])) {
          participant[`${pointsType}`] = 0;
        }
        participant[`${pointsType}`] += Math.floor(Math.random() * this.MAX_CUBE_POINTS);
      }
    }
    if (sortFunction) {
      this.sortParticipantsList(list, pointsType);
    }
  }

  sortParticipantsList(list, pointsType = 'points') {
    list.sort((a, b) => {
      if (a[`${pointsType}`] > b[`${pointsType}`]) {
        return -1;
      } else if (a[`${pointsType}`] < b[`${pointsType}`]) {
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

  highlightingGroupStageWinners(containerList, maxPassedParticipants) {
    let passedParticipants = 0;
    for (let container of containerList) {
      if (passedParticipants < maxPassedParticipants) {
        container.parentElement.style.borderColor = `#36b847`;
        passedParticipants++;
      } else {
        container.parentElement.style.borderColor = `#da3131a4`;
      }
    }
  }

  setBackgroundColor(winner, nameContainers, winnerColor, looserColor) {
    for (let nameContainer of nameContainers) {
      if (nameContainer.textContent === winner) {
        nameContainer.style.backgroundColor = winnerColor;
      } else {
        nameContainer.style.backgroundColor = looserColor;
      }
    }
  }

  highlightingStageWinner(participantsList, nameContainers, pointsType) {
    const participants = this.findParticipants(participantsList, nameContainers);
    for (let i = 0; i < 1; i++) {
      if (participants[i][`${pointsType}`] > participants[i + 1][`${pointsType}`]) {
        this.setBackgroundColor(participants[i].name, nameContainers, `#36b847`, `#da3131a4`);
      } else {
        this.setBackgroundColor(participants[i + 1].name, nameContainers, `#36b847`, `#da3131a4`);
      }
    }
  }
}
