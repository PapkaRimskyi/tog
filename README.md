npm install - for install all project dependencies

Commands always starts with "npm run". Commands:
  1. editorconfig - launch editorconfig.
  2. stylelint - launch stylelint, which checks all scss files.
  3. eslint - running esling, which checks all js files.
  4. check - run all checks (points above).
  5. build - start building project under production mode.
  6. dev - start dev server under development mode;

Project structure:
  1. source - default directory for file.
  2. source/fonts|source/img|source/music - directory, where are stored images/music and fonts
  3. source/js - common directory for every js file.
     - components - directory, where are stored VIEW.
     - controllers - directory with controllers.
     - markup - folder with markup.
     - models - data, which represent model.
     - support-classes - folder, where are stored all files, who used by extends from classes and just helping in dev.
  4. source/sass - directory for scss
     - blocks - folder with blocks.

In controlls always be this structure: 
  first coming render methods,
  second - button handler,
  third - support methods.

In view (components) always be this structure:
  first is getTemplate method,
  second - render method,
  third - button interaction/event listener
  fourth - support methods.

Assembly folder - <b>build</b>.


TODO:
- [X] Disabling button "Вписать новых участников" until game not be ended.
- [ ] When winner appear - need to add button, which restart all game.
- [ ] Visualization (set animation i mean) when winner appear.
- [X] When participants in the end of throws have same points (or finalPoints, depends from stage), they do rethrows until they get a different points.
- [ ] To do something with "Гороскоп" item. Maybe to plug some interesting API.
---
Bugs:
- [ ] Bug with clock. Does not change date, when time changes from 23:59:59 to 00:00:00 next day.
