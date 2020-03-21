export default class ParticipantsListMethods {
  constructor() {
    this.MAX_CUBE_POINTS = 12;
    this.GREEN_COLOR = `#36b847`;
    this.RED_COLOR = `#fd0303`;
  }

  //Random number generation operations

  throwCube(list, pointsType, sortFunction = true) {
    list.forEach((participant) => {
      if (isNaN(participant[`${pointsType}`])) {
        participant[`${pointsType}`] = 0;
      }
      participant[`${pointsType}`] += this.randomCubePoints();
    });
    if (sortFunction) {
      this.sortParticipantsList(list, pointsType);
    }
  }

  randomCubePoints() {
    return Math.floor(Math.random() * this.MAX_CUBE_POINTS);
  }

  randomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  getRandomSign(minValue, maxValue) {
    if (this.randomNumber(minValue, maxValue) % 2 === 0) {
      return `+`;
    }
    return `-`;
  }

  // Manipulation with participantsList or with background-color value

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

  highlightingGroupStageWinners(containerList, maxPassedParticipants) {
    let passedParticipants = 0;
    containerList.forEach((container) => {
      if (passedParticipants < maxPassedParticipants) {
        container.parentElement.style.borderColor = this.GREEN_COLOR;
        passedParticipants++;
      } else {
        container.parentElement.style.borderColor =  this.RED_COLOR;
      }
    });
  }

  highlightingStageWinner(participantsList, nameContainers, pointsType) {
    const participants = this.findParticipants(participantsList, nameContainers);
    for (let i = 0; i < 1; i++) {
      if (participants[i][`${pointsType}`] > participants[i + 1][`${pointsType}`]) {
        this.setBackgroundColor(participants[i].name, nameContainers);
      } else {
        this.setBackgroundColor(participants[i + 1].name, nameContainers);
      }
    }
  }

  setBackgroundColor(winner, nameContainers, winnerColor = this.GREEN_COLOR, looserColor = this.RED_COLOR) {
    nameContainers.forEach((nameContainer) => nameContainer.textContent === winner ? nameContainer.style.backgroundColor = winnerColor : nameContainer.style.backgroundColor = looserColor);
  }

  findParticipants(participantsList, nameContainers) {
    const participants = [];
    if (participantsList.length > 2) {
      for (let i = 0; i < participantsList.length; i++) {
        nameContainers.forEach((name) => {
          if (participantsList[i].name === name.textContent) {
            participants.push(participantsList[i]);
          }
        });
      }
      return participants;
    } else {
      return participantsList;
    }
  }

  rgbToHex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? `#` +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }
}
