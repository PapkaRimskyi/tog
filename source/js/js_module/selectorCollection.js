'use strict';

var dateSpan = document.querySelector('.time-and-data__info--date');
var timeSpan = document.querySelector('.time-and-data__info--time');
var headerNav = document.querySelector('.header-nav');
var rulesPopupOpen = document.querySelector('.rules-js');
var rulesPopup = document.querySelector('.rules-popup');
var rulesPopupClose = document.querySelector('.rules-close');
var audioPlayer = document.querySelector('.audio-player');
var music = document.querySelector('.music');
var musicAudio = document.querySelector('.music__audio');
var participantsPopup = document.querySelector('.enter-participants-popup');
var participantsOpenPopup = document.querySelector('.participants-js');
var participantsPopupClose = document.querySelector('.participants-close');
var inputParticipantsList = document.querySelector('.enter-participants-popup__participants-list');
var sendParticipantsButton = document.querySelector('.enter-participants-popup__send-participants-list');
var form = document.querySelector('.enter-participants-popup__form');

var qualifyingStageInput = document.querySelectorAll('.tournament-stages__group--qualifying-stage .tournament-stages__input');
var quarterFinalsStageInput = document.querySelectorAll('.tournament-stages__group--quarter-finals-stage .tournament-stages__input');
var semiFinalStageInput = document.querySelectorAll('.tournament-stages__group--semifinal-stage .tournament-stages__input');
var finalStageInput = document.querySelectorAll('.tournament-stages__group--final-stage .tournament-stages__input');

var buttonGroupQualifying = document.querySelector('.tournament-stages__button--qualifying-stage');
var buttonGroupQuarterFinal = document.querySelector('.tournament-stages__button--quarter-finals-stage');
var buttonGroupSemiFinal = document.querySelector('.tournament-stages__button--semifinal-stage');

var throwResultsQualifyingStage = document.querySelectorAll('.tournament-stages__group--qualifying-stage .tournament-stages__points');
var throwResultsQuarterFinalsStage = document.querySelectorAll('.tournament-stages__group--quarter-finals-stage .tournament-stages__points');
var throwResultsSemiFinalStage = document.querySelectorAll('.tournament-stages__group--semifinal-stage .tournament-stages__points');
var throwResultsFinalStage = document.querySelectorAll('.tournament-stages__group--final-stage .tournament-stages__points');

var winnerInput = document.querySelector('.tournament-stages__stage-container--winner .tournament-stages__winner-input');
var winnerContainer = document.querySelector('.tournament-stages__stage-container--winner');
var crownOfWinner = document.querySelector('.tournament-stages__crown');
