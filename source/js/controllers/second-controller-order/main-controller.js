import Stage1Controller from '../stage-controllers/stage1-controller.js';

export default class MainController {
  constructor() {
    this.stage1ControllerInstance = null;
  }

  //Render

  render(participantsList) {
    this.stage1ControllerInstance = new Stage1Controller(participantsList);
    this.stage1ControllerInstance.renderStage();
  }
}
