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

var qualifyingInput = document.querySelectorAll('.tournament-stages__group--qualifying-stage .tournament-stages__input');

var winnerQuarterFinalInput = document.querySelectorAll('.tournament-stages__group--quarter-finals-stage .tournament-stages__input');
var winnerSemiFinalInput = document.querySelectorAll('.tournament-stages__group--semifinal-stage .tournament-stages__input');
var winnerFinalInput = document.querySelectorAll('.tournament-stages__group--final-stage .tournament-stages__input');

var loserLastChanceInput = document.querySelectorAll('.tournament-stages__group--last-chance-stage .tournament-stages__input');
var loserQuarterFinalInput = document.querySelectorAll('.tournament-stages__group--loser-bracket-quarter-finals-stage .tournament-stages__input');
var loserSemiFinalInput = document.querySelectorAll('.tournament-stages__group--loser-bracket-semifinal-stage .tournament-stages__input');
var loserFinalInput = document.querySelectorAll('.tournament-stages__group--loser-bracket-final-stage .tournament-stages__input');

var qualifyingButton = document.querySelector('.tournament-stages__button--qualifying-stage');

var winnerQuarterFinalButton = document.querySelector('.tournament-stages__button--quarter-finals-stage');
var winnerSemiFinalButton = document.querySelector('.tournament-stages__button--semifinal-stage');
var winnerFinalButton = document.querySelector('.tournament-stages__button--final-stage');

var loserLastChanceButton = document.querySelector('.tournament-stages__button--last-chance-stage');
var loserQuarterFinalButton  = document.querySelector('.tournament-stages__button--loser-bracket-quarter-finals-stage');
var loserSemiFinalButton = document.querySelector('.tournament-stages__button--loser-bracket-semifinal-stage');
var loserFinalButton = document.querySelector('.tournament-stages__button--loser-bracket-final-stage');

var groupQualifyingResults = document.querySelectorAll('.tournament-stages__group--qualifying-stage .tournament-stages__points');

var winnerQuarterFinalResults = document.querySelectorAll('.tournament-stages__group--quarter-finals-stage .tournament-stages__points');
var winnerSemiFinalResults = document.querySelectorAll('.tournament-stages__group--semifinal-stage .tournament-stages__points');
var winnerFinalResults = document.querySelectorAll('.tournament-stages__group--final-stage .tournament-stages__points');

var loserLastChanceResult = document.querySelectorAll('.tournament-stages__group--last-chance-stage .tournament-stages__points');
var loserQuarterFinalResult = document.querySelectorAll('.tournament-stages__group--loser-bracket-quarter-finals-stage .tournament-stages__points');
var loserSemiFinalResult = document.querySelectorAll('.tournament-stages__group--loser-bracket-semifinal-stage .tournament-stages__points');
var loserFinalResult = document.querySelectorAll('.tournament-stages__group--loser-bracket-final-stage .tournament-stages__points');

var winnerInput = document.querySelector('.tournament-stages__stage-container--winner .tournament-stages__winner-input');
var winnerContainer = document.querySelector('.tournament-stages__stage-container--winner');
var crownOfWinner = document.querySelector('.tournament-stages__crown');
