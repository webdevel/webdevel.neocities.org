/**
 * Title: Sudoku Log
 *
 * File: sudoku.js
 * The Sudoku Log is cross-browser tested and is known to work in the following
 * browsers: Firefox, Chrome, Opera, Safari and IExplore. For the specific
 * browser versions used during testing, see the 'Supported In Browsers' section.
 *
 * Version:
 * 0.1.2
 *
 * Supported In Browsers:
 * Firefox 3.6.13
 *
 * Chrome 8.0.552.224
 *
 * Opera 10.62 build 6438, 11.00 build 1156
 *
 * Safari 5.0.3 (7533.19.4)
 *
 * IExplore 9.0.7930.16406
 *
 * Date:
 * Mon May 2 16:37:48 PST 2011
 *
 * Author:
 * Steven Garcia
 *
 * http://webdevel.neocities.org/
 *
 * Copyright:
 * Copyright (c) 2011, Steven Garcia. All rights reserved.
 *
 * License:
 * This program is licensed by GPLv2.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* Global variables */
var w = window;
var d = document;
var gStartTime = 0;
var gbTiming = true;
var gPausedAt = 0;
var gTimePaused = 0;
var gTimerId;
var gActiveNumber = 1;
var gActiveCell;
var gSolution;

/* Constants */
var TAG_CANDIDATE = "A";
var TAG_CELL = "TD";
var TAG_IMAGE = "IMG";
var STYLE_NUMBER_INACTIVE = "#999";
var STYLE_NUMBER_ACTIVE = "#2b2";
var STYLE_TRANSPARENT = "transparent";
var STYLE_BLACK = "black";
var STYLE_SHADOW = "#ffa";
var STYLE_CURSOR_PEN = "url(img/pen.png),pointer";
var STYLE_CURSOR_PENCIL = "url(img/pencil.png),pointer";
var STYLE_NONE = "none";
var STYLE_INLINE = "inline";
var STYLE_TABLE = "table";
var STYLE_BACKGROUND_COLOR = "background-color";
var ATTRIB_CLASS = "class";
var ATTRIB_SRC = "src";
var ATTRIB_STYLE = "style";
var SRC_PENCIL = "img/pencil.png";
var SRC_PEN = "img/pen.png";
var EVENT_MOUSE_CLICK = "click";
var EVENT_MOUSE_DOWN = "mousedown";
var EVENT_MOUSE_OVER = "mouseover";
var EVENT_MOUSE_OUT = "mouseout";
var EVENT_FOCUS = "focus";
var EVENT_CHANGE = "change";
var ID_PALLET = "pallet";
var ID_BOARD = "board";
var ID_WRITE = "write";
var ID_HELP = "help";
var ID_OPTIONS = "options";
var ID_RESET = "reset";
var ID_SOLVE = "solve";
var ID_SOLVE_CELL = "solvecell";
var ID_AUTO_CANDIDATE = "autocandidate";
var ID_CHECK_MISTAKES = "checkmistakes";
var ID_SHOW_MISTAKES = "showmistakes";
var ID_TIMER = "timer";
var ID_MESSAGES = "messages";
var ID_FINISHED = "finished";
var ID_SAVE = "save";
var ID_DISCARD = "discard";
var ID_MSG = "msg";
var ID_OK = "ok";
var ID_LEVELS = "levels";
var DOM_FEATURE_HTML = "HTML";
var DOM_FEATURE_XML = "XML";
var DOM_FEATURE_CSS = "CSS2";
var DOM_VERSION = "2.0";
var PREFIX_EVENT = "on";
var CLASS_CLUE = " clue";
var CLASS_MISTAKE = " mistake";
var CLASS_ACTIVE = " active";

/* This function's code is mostly borrowed from
 * http://www.webmasters.am/blog/string-encryption-decryption/javascript/2010/03/
 * This has been tested and known to work with
 * the ASCII characters 0-126 */
function decodeString (string) {
  var K = +!!-~+!+!"", E = -~!+~~"", Y = -~-~+!!~+"";
  var result = "";
  for (var i = 0; i < string.length / 3; i++) {
    result += String.fromCharCode(~-(parseInt(string.substring(i*Y,i*Y+Y), 16)*E/K/E/Y));
  }
  return result;
}

/* Decompress a LZW-encoded string
 * Copyright (c) 2003-2006 Jan-Klaas Kollhof
 * License LGPL 2.1
 * Code borrowed from http://jsolait.net/
 * Not suitable for Non-ASCII
 * No error is reported if code > 65535 */
function lzwDecompress (s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

function invertString (string) {
  var inverted = "";
  for (var i = string.length - 1; i >= 0; i--) {
    inverted += string[i];
  }
  return inverted;
}

/** Get a number (1-9) from a string character 1-9, A-I and J-R
 * by subtracting from the numeric Unicode value
 * @param string Single character A-R
 * @returns number
 */
function getNumberFromChar (string) {
  var number;
  var code = parseInt(string.charCodeAt(0), 10);
  /* The following numeric character code values are what is expected.
   1=49, 2=50, 3=51, 4=52, 5=53, 6=54, 7=55, 8=56, 9=57
   A=65, B=66, C=67, D=68, E=69, F=70, G=71, H=72, I=73
   J=74, K=75, L=76, M=77, N=78, O=79, P=80, Q=81, R=82 */
  if (code < 58 && code > 48) {
    number = code - 48;
  }
  else if (code < 74 && code > 64) {
    number = code - 64;
  }
  else if (code < 83 && code > 73) {
    number = code - 73;
  }
  return number;
}

function getSolutionFromString (string) {
  var solution = "";
  for (var i = 0; i < string.length; i++) {
    solution += getNumberFromChar(string[i]);
  }
  return solution;
}

function setTimer (time) {
  var timer = d.getElementById(ID_TIMER);
  if (!timer.firstChild) {
    var text = d.createTextNode(time);
    timer.appendChild(text);
  }
  else if (0 == parseInt(timer.firstChild.length, 10)) {
    timer.firstChild.insertData(0, time);
  }
  else {
    timer.firstChild.replaceData(0, time.length, time);
  }
}

function prefixZero (unit) {
  return ((unit < 10) ? "0" : "") + unit;
}

function isPaused () {
  return (gbTiming ? false : true);
}

function startTimer (offset) {
  var date = new Date();
  gbTiming = true;
  gStartTime = date.getTime() / 1000 - offset;
  updateTimer();
}

function stopTimer () {
  clearTimeout(gTimerId);
  gbTiming = false;
}

function toggleTimerPause () {
  var date = new Date();
  if (isPaused()) {
    gTimePaused = gTimePaused + Math.round(date.getTime() / 1000 - gPausedAt);
    startTimer(gPausedAt);
  }
  else {
    gPausedAt = Math.round(date.getTime() / 1000 - gStartTime);
    stopTimer();
  }
}

function updateTimer () {
  if (gbTiming) {
    var date = new Date();
    var time = Math.round(date.getTime() / 1000 - gStartTime);
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    setTimer("" + prefixZero(hours) + ":" + prefixZero(minutes) + ":" + prefixZero(seconds));
    gTimerId = setTimeout("updateTimer()", 1000);
  }
}

function assignListener (element, type, func) {
  var capture = false;
  if (element.addEventListener) {
    element.addEventListener(type, func, capture);
    return true;
  }
  else if (element.attachEvent) { // IExplore
    var result = element.attachEvent(PREFIX_EVENT + type, func);
    return result;
  }
  else {
    element[PREFIX_EVENT + type] = func;
  }
}

function getEvent (e) {
  return (e ? e : w.event);
}

function makeMouseEvent (type) {
  var event = d.createEvent("MouseEvents");
  event.initMouseEvent(type, true, true, d.defaultView,
                     1, 0, 0, 0, 0, false, false, true, false, 0, null);
  return event;
}

function getTargetElement (e) {
  var element;
  var event = getEvent(e);
  if (event.target) {
    element = event.target;
  }
  else if (event.srcElement) {
    element = event.srcElement;
  }
  if (element.nodeType == 3) { // Safari
    element = element.parentNode;
  }
  return element;
}

function getPallet () {
  return d.getElementById(ID_PALLET);
}

function getWrite () {
  return d.getElementById(ID_WRITE);
}

function getBoard () {
  return d.getElementById(ID_BOARD);
}

function getTimer () {
  return d.getElementById(ID_TIMER);
}

function getOk () {
  return d.getElementById(ID_OK);
}

function getMsg () {
  return d.getElementById(ID_MSG);
}

function getMessages () {
  return d.getElementById(ID_MESSAGES);
}

function getFinished () {
  return d.getElementById(ID_FINISHED);
}

function getSave () {
  return d.getElementById(ID_SAVE);
}

function getDiscard () {
  return d.getElementById(ID_DISCARD);
}

function getBoardCells () {
  var board = getBoard();
  return board.getElementsByTagName(TAG_CELL);
}

function getPalletCells () {
  var pallet = getPallet();
  return pallet.getElementsByTagName(TAG_CELL);
}

function getCellCandidates (cell) {
  return cell.getElementsByTagName(TAG_CANDIDATE);
}

function getCandidates (board) {
  return board.getElementsByTagName(TAG_CANDIDATE);
}

function showMessage (message) {
  var messages = getMessages();
  var msg = getMsg();
  messages.style.display = STYLE_TABLE;

  if (!msg.firstChild) {
    var text = d.createTextNode(message);
    msg.appendChild(text);
  }
  else if (0 == parseInt(msg.firstChild.length, 10)) {
    msg.firstChild.insertData(0, message);
  }
  else {
    msg.firstChild.deleteData(0, msg.firstChild.length);
    msg.firstChild.appendData(message);
  }
}

function isPenMode () {
  var bPenMode = false;
  var write = getWrite();
  if (write.firstChild.getAttribute(ATTRIB_SRC) == SRC_PENCIL) {
    bPenMode = true;
  }
  return bPenMode;
}

function hideCellCandidates (cell) {
  var candidates = getCellCandidates(cell);
  for (var i = 0; i < candidates.length; i++) {
    candidates[i].style.display = STYLE_NONE;
  }
}

function deleteCellValue (cell) {
  if (cell.firstChild) {
    // if text node
    if (3 == cell.firstChild.nodeType && cell.firstChild.data.length > 0) {
      cell.firstChild.deleteData(0,1);
    }
  }
  var candidates = getCellCandidates(cell);
  for (var i = 0; i < candidates.length; i++) {
    candidates[i].style.display = STYLE_INLINE;
  }
}

function replaceCellValue (cell, value) {
  hideCellCandidates(cell);
  cell.firstChild.replaceData(0,1, value);
}

function insertCellValue (element, value) {
  var first = element.firstChild;
  var text = d.createTextNode(value);
  hideCellCandidates(element);
  if (!first) {
    element.appendChild(text);
  }
  else if (0 == parseInt(first.length, 10)) {
    first.insertData(0, value);
  } // if element node type
  else if (1 == first.nodeType){
    element.insertBefore(text,first);
  }
}

function setActiveCell (cell) {
  if (gActiveCell) {
    declassifyCell(gActiveCell, CLASS_ACTIVE);
  }
  gActiveCell = cell;
  classifyCell(gActiveCell, CLASS_ACTIVE);
}

function decrementActiveCell () {
  var index = getCellIndex(gActiveCell);
  var cells = getBoardCells();
  if (index > 0) {
    index--;
  }
  else {
    index = 80;
  }
  setActiveCell(cells[index]);
}

function incrementActiveCell () {
  var index = getCellIndex(gActiveCell);
  var cells = getBoardCells();
  if (index < 80) {
    index++;
  }
  else {
    index = 0;
  }
  setActiveCell(cells[index]);
}

function incrementActiveCellColumn () {
  var index = getCellIndex(gActiveCell);
  var cells = getBoardCells();

  if (index < 72) {
    index += 9;
  }
  else {
    index -= 72;
  }
  setActiveCell(cells[index]);
}

function decrementActiveCellColumn () {
  var index = getCellIndex(gActiveCell);
  var cells = getBoardCells();

  if (index > 8) {
    index -= 9;
  }
  else {
    index += 72;
  }
  setActiveCell(cells[index]);
}

function adjustCellValue (element, bCandidate) {

  if (bCandidate) {
    setActiveCell(element.parentNode);
    insertCellValue(element.parentNode, gActiveNumber);
  } // if the active number matches the existing cell value
  else if (gActiveNumber == parseInt(element.firstChild.data, 10)) {
    deleteCellValue(element);
  } // if text node
  else if (3 == element.firstChild.nodeType) {
    setActiveCell(element);
    replaceCellValue(element, gActiveNumber);
  }
}

function declassifyCell (cell, oldClass) {
  var cellClass = cell.getAttribute(ATTRIB_CLASS);
  var keyword = new RegExp(oldClass.trim(), "g");
  if (cellClass) {
    var newClass = cellClass.trim();
    cell.setAttribute(ATTRIB_CLASS, newClass.replace(keyword, ""));
  }
}

function classifyCell (cell, newClass) {
  var cellClass = cell.getAttribute(ATTRIB_CLASS);
  if (cellClass && !cellHasClass(cell, newClass)) {
    cell.setAttribute(ATTRIB_CLASS, cellClass + newClass);
  }
  else {
    cell.setAttribute(ATTRIB_CLASS, newClass);
  }
}

function cellHasClass (cell, sClass) {
  var cellClass = cell.getAttribute(ATTRIB_CLASS);
  var hasClass = new RegExp(sClass.trim());
  return hasClass.test(cellClass);
}

function isCellClue (cell) {
  var cellClass = cell.getAttribute(ATTRIB_CLASS);
  var clue = new RegExp(CLASS_CLUE);
  return clue.test(cellClass);
}

function getRowFromCell (cell) {
  return cell.parentNode.getElementsByTagName(TAG_CELL);
}

/* param limit If the number of occurances of value
 * is greater than limit, then return true */
function rowHasDuplicateCells (cell, value, limit) {
  var bDuplicate = false;
  var count = 0;
  var cells = getRowFromCell(cell);

  for (var i = 0; i < cells.length; i++) {
    if (value == parseInt(cells[i].firstChild.data, 10)) {
      count++;
    }
  }
  if (count > limit) {
    bDuplicate = true;
  }
  return bDuplicate;
}

function getCellIndex (cell) {
  var id = "" + cell.getAttribute("id");
  return parseInt(id.substr(1), 10);
}

function getCellBoxId (cell) {
  var id = "" + cell.getAttribute("id");
  return id.charAt(0);
}

function columnHasDuplicateCells (cell, value) {
  var bDuplicate = false;
  var index = getCellIndex(cell);
  var cells = getBoardCells();

  for (var i = 0; i < 8; i++) {
    if (index < 72) {
      index = index + 9;
    }
    else {
      index = index - 72;
    }
    if (value == parseInt(cells[index].firstChild.data, 10)) {
      bDuplicate = true;
      break;
    }
  }
  return bDuplicate;
}

function getColumnFromCell (cell) {
  var index = getCellIndex(cell);
  var cells = getBoardCells();
  var column = [];
  column.push(cell);
  for (var i = 0; i < 8; i++) {
    if (index < 72) {
      index = index + 9;
    }
    else {
      index = index - 72;
    }
    column.push(cells[index]);
  }
  return column;
}

function boxHasDuplicateCells (cell, value) {
  var bDuplicate = false;
  var index = getCellIndex(cell);
  var cells = getBoardCells();
  var id = getCellBoxId(cell);
  for (var i = 0; i < cells.length; i++) {
    if (index !== i && id == getCellBoxId(cells[i]) &&
        value == parseInt(cells[i].firstChild.data, 10)) {
      bDuplicate = true;
      break;
    }
  }
  return bDuplicate;
}

/* Setting the return value causes confirmation dialog */
function onWindowBeforeUnload (e) {
  var e = e || window.event;

  // For IE and Firefox prior to version 4
  if (e) {
    e.returnValue = "";
  }

  // For Safari
  return "";
}

function testRequisites () {
  var bDom2 = d.implementation.hasFeature(DOM_FEATURE_HTML, DOM_VERSION);
  var bCss2 = d.implementation.hasFeature(DOM_FEATURE_CSS, DOM_VERSION);
  var bJs16 = false;
  //showMessage("DOM:\t" + bDom2 + "\n" + "CSS:\t" + bCss2 + "\n" + "JS:\t\t" + bJs16);
}

function showAllMistakes () {
  var cells = getBoardCells();
  for (var i = 0; i < cells.length; i++) {
    var first = cells[i].firstChild;
    var value = parseInt(first.data, 10);
    if (value != parseInt(gSolution[i], 10) && first.data) {
      if (first.data.length > 0) {
        classifyCell(cells[i], CLASS_MISTAKE);
      }
    }
  }
}

function isCellCandidateValid (cell, value) {
  var bValid = true;
  var limit = 0;

  if (rowHasDuplicateCells(cell, value, limit)) {
    bValid = false;
  }

  if (columnHasDuplicateCells(cell, value)) {
    bValid = false;
  }

  if (boxHasDuplicateCells(cell, value)) {
    bValid = false;
  }
  return bValid;
}

function setCellCandidatesAutomatically (cell) {
  var candidates = getCellCandidates(cell);
  deleteCellCandidates(candidates);

  for (var i = 0; i < candidates.length; i++) {
    var first = candidates[i].firstChild;
    var value = i + 1;
    if (isCellCandidateValid(cell, value)) {
      toggleCandidate(candidates[i], value);
    }
  }
}

function setBoardCandidatesAutomatically () {
  var cells = getBoardCells();

  for (var i = 0; i < cells.length; i++) {
    var first = cells[i].firstChild;

    // if NOT a clue cell
    if (!cellHasClass(cells[i], CLASS_CLUE)) {
      setCellCandidatesAutomatically(cells[i]);
      /*// if element node type
      if (1 == first.nodeType){
        setCellCandidatesAutomatically(cells[i]);
      } // if cell value is empty
      else if (first.data) {
        if (first.data.length == 0) {
          setCellCandidatesAutomatically(cells[i]);
        }
      } // if NOT element node and NOT firstChild.data
      else {
        setCellCandidatesAutomatically(cells[i]);
      }*/
    }
  }
}

function onAutoCandidateMouseDown (e) {
  setBoardCandidatesAutomatically();
}

function onCheckMistakesMouseDown (e) {
  var cells = getBoardCells();
  var count = 0;
  for (var i = 0; i < cells.length; i++) {
    var first = cells[i].firstChild;
    var value = parseInt(first.data, 10);
    if (value != parseInt(gSolution[i], 10) && first.data) {
      if (first.data.length > 0) {
        count++;
      }
    }
  }
  // show message with the number of mistakes
  if (count == 1) {
    showMessage("There is " + count + " mistake on the board.");
  }
  else {
    showMessage("There are " + count + " mistakes on the board.");
  }
}

function puzzleIsFinished () {
  var bFinished = true;
  var cells = getBoardCells();
  var count = 0;
  for (var i = 0; i < cells.length; i++) {
    var value = parseInt(cells[i].firstChild.data, 10);
    // if NOT a value 1-9
    if (!value < 10 && !value > 0) {
      bFinished = false;
      declassifyCell(cells[i], CLASS_MISTAKE);
    }
    else {
      count++;
    }
    // if value NOT equal solution
    if (value != parseInt(gSolution[i], 10)) {
      bFinished = false;
    }
    else {
      declassifyCell(cells[i], CLASS_MISTAKE);
    }
  }
  // if every cell has a value and not finished
  if (count == 81 && !bFinished) {
    showAllMistakes();
  }
  return bFinished;
}

function showFinishDialog () {
  var finish = getFinished();
  finish.style.display = STYLE_TABLE;
}

function onSaveMouseDown () {
  var finish = getFinished();
  finish.style.display = STYLE_NONE;
}

function onDiscardMouseDown () {
  var finish = getFinished();
  finish.style.display = STYLE_NONE;
}

function isCandidate (element) {
  var bCandidate = false;
  if (element.tagName == TAG_CANDIDATE) {
    bCandidate = true;
  }
  return bCandidate;
}

function toggleCandidate (candidate, value) {
  if (!candidate.firstChild) {
    var text = d.createTextNode(value);
    candidate.appendChild(text);
  }
  else if (0 == parseInt(candidate.firstChild.length, 10)) {
    candidate.firstChild.insertData(0, value);
  }
  else {
    candidate.firstChild.deleteData(0,1);
  }
}

function insertClues (clues) {
  var cells = getBoardCells ();
  if (clues.length == cells.length) {
    for (var i = 0; i < cells.length; i++) {
      var value = parseInt(clues.charAt(i), 10);
      if (value < 10 && value > 0) {
        classifyCell(cells[i], CLASS_CLUE);
        insertCellValue(cells[i], value);
      }
    }
  }
}

function onPalletMouseOver (e) {
  var element = getTargetElement(e);
  element.style.backgroundColor = STYLE_SHADOW;
}

function onPalletMouseOut (e) {
  var element = getTargetElement(e);
  element.style.backgroundColor = STYLE_TRANSPARENT;
}

function onPalletMouseDown (e) {
  var element = getTargetElement(e);
  gActiveNumber = parseInt(element.firstChild.data, 10);
  var palletCells = getPalletCells();
  for (var i = 0; i < palletCells.length; i++) {
    palletCells[i].style.color = STYLE_NUMBER_INACTIVE;
  }
  element.style.color = STYLE_NUMBER_ACTIVE;
}

function onWindowKeyDown (e) {
  var event = getEvent(e);
  var code = parseInt(event.keyCode, 10);
  var evt = makeMouseEvent(EVENT_MOUSE_DOWN);
  //showMessage(code);
  //showMessage(event.DOM_VK_RETURN);
  // Test for numerical keys 1-9
  if (code < 58 && code > 48) {
    var index = code - 49;
    var palletCells = getPalletCells();
    palletCells[index].dispatchEvent(evt);
  } // Test for T-key
  else if (code == 84) {
    var write = getWrite();
    write.dispatchEvent(evt);
  } // Test for P-key
  else if (code == 80) {
    var timer = getTimer();
    timer.dispatchEvent(evt);
  } // Test for delete
  else if (code == 46) {
    if (isPenMode()) {
      // if NOT a clue cell
      if (!cellHasClass(gActiveCell, CLASS_CLUE)) {
        // remove active cell value
        deleteCellValue(gActiveCell);
      }
    }
  } // if left arrow key event.DOM_VK_LEFT
  else if (code == 37) {
    decrementActiveCell();
  }
  // if up arrow key event.DOM_VK_UP
  else if (code == 38) {
    decrementActiveCellColumn();
  }
  // if right arrow key event.DOM_VK_RIGHT
  else if (code == 39) {
    incrementActiveCell();
  }
  // if down arrow key event.DOM_VK_DOWN
  else if (code == 40) {
    incrementActiveCellColumn();
  }
  // if S-key event.DOM_VK_S
  else if (code == 83) {
    decrementActiveCell();
  }
  // if E-key event.DOM_VK_E
  else if (code == 69) {
    decrementActiveCellColumn();
  }
  // if F-key event.DOM_VK_F
  else if (code == 70) {
    incrementActiveCell();
  }
  // if D-key event.DOM_VK_D
  else if (code == 68) {
    incrementActiveCellColumn();
  }
}

function onBoardMouseDown (e) {
  var element = getTargetElement(e);
  var bDuplicate = false;
  var duplicateMsg = "A duplicate value is in the";

  // if NOT a clue cell
  if (!cellHasClass(element, CLASS_CLUE)) {
    var bCandidate = isCandidate(element);

    // if in pen mode
    if (isPenMode()) {
      var cell = element;
      var limit = 1;
      var value;
      adjustCellValue(element, bCandidate);

      if (bCandidate) {
        cell = element.parentNode;
      }

      value = parseInt(cell.firstChild.data, 10);

      if (rowHasDuplicateCells(cell, value, limit)) {
        duplicateMsg = duplicateMsg + " row";
        bDuplicate = true;
      }
      if (columnHasDuplicateCells(cell, value)) {
        duplicateMsg = duplicateMsg + (bDuplicate ? " and column" : " column")
        bDuplicate = true;
      }
      if (boxHasDuplicateCells(cell, value)) {
        duplicateMsg = duplicateMsg + (bDuplicate ? " and box" : " box")
        bDuplicate = true;
      }

      declassifyCell(cell, CLASS_MISTAKE);

      if (bDuplicate) {
        classifyCell(cell, CLASS_MISTAKE);
        showMessage(duplicateMsg + ".");
      }
      else if (puzzleIsFinished()) {
        stopTimer();
        showFinishDialog();
      }
    }
    else { // Pencil mode
      var candidates;
      element = getTargetElement(e);
      if (bCandidate) {
        candidates = getCellCandidates(element.parentNode);
      }
      else if (element.firstChild.length == 0) {
        candidates = getCellCandidates(element);
      }
      if (undefined != candidates) {
        toggleCandidate(candidates[gActiveNumber - 1], gActiveNumber);
      }
    }
  }
}

function setCursor (style) {
  var board = getBoard();
  var pallet = getPallet();
  board.style.cursor = style;
  pallet.style.cursor = style;
}

function setCellBackground (cell, color) {
  var view = d.defaultView;
  var style = view.getComputedStyle(cell, null);
  cell.style.backgroundColor = style.getPropertyValue(STYLE_BACKGROUND_COLOR);
  cell.setAttribute(ATTRIB_STYLE, STYLE_BACKGROUND_COLOR + ":" + color);
}

function setColumnBackground (cell, color) {
  var cells = getColumnFromCell(cell);
  for (var i = 0; i < cells.length; i++) {
    setCellBackground(cells[i], color);
  }
}

function unsetColumnBackground (cell) {
  var cells = getColumnFromCell(cell);
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeAttribute(ATTRIB_STYLE);
  }
}

function setRowBackground (cell, color) {
  var cells = getRowFromCell(cell);
  for (var i = 0; i < cells.length; i++) {
    setCellBackground(cells[i], color);
  }
}

function unsetRowBackground (cell) {
  var cells = getRowFromCell(cell);
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeAttribute(ATTRIB_STYLE);
  }
}

function onBoardMouseOver (e) {
  var element = getTargetElement(e);
  var cell;

  if (isCandidate(element)) {
    cell = element.parentNode;
  }
  else {
    cell = element;
  }
  setRowBackground(cell, STYLE_SHADOW);
  setColumnBackground(cell, STYLE_SHADOW);
}

function onBoardMouseOut (e) {
  var element = getTargetElement(e);
  var cell;

  if (isCandidate(element)) {
    cell = element.parentNode;
  }
  else {
    cell = element;
  }
  unsetRowBackground(cell);
  unsetColumnBackground(cell);
}

function onWriteMouseDown (e) {
  var element = getTargetElement(e);
  var img = (element.tagName == TAG_IMAGE ? element : element.firstChild)
  var src = img.getAttribute(ATTRIB_SRC);
  var board = getBoard();
  var pallet = getPallet();

  if (src == SRC_PEN) {
    src = SRC_PENCIL;
    setCursor(STYLE_CURSOR_PEN);
  }
  else {
    src = SRC_PEN;
    setCursor(STYLE_CURSOR_PENCIL);
  }
  img.setAttribute(ATTRIB_SRC, src);
}

function deleteCellCandidates (candidates) {
  for (var i = 0; i < candidates.length; i++) {
    var first = candidates[i].firstChild;
    if (first) {
      // if text node
      if (3 == first.nodeType && first.data.length > 0) {
        first.deleteData(0,1);
      }
    }
  }
}


function resetBoard (bRemoveClues) {

  // TODO get confirmation first!
  var board = getBoard();
  var cells = getBoardCells();

  for (var i = 0; i < cells.length; i++) {
    if (bRemoveClues) {
      deleteCellCandidates(getCellCandidates(cells[i]));
      deleteCellValue(cells[i]);
      declassifyCell(cells[i], CLASS_MISTAKE);
      declassifyCell(cells[i], CLASS_CLUE);
    }
    else {
      // if NOT a clue cell
      if (!cellHasClass(cells[i], CLASS_CLUE)) {
        deleteCellCandidates(getCellCandidates(cells[i]));
        deleteCellValue(cells[i]);
        declassifyCell(cells[i], CLASS_MISTAKE);
      }
    }
  }
  stopTimer();
  startTimer(0);
  // unhide board
  board.style.visibility = "visible";
}

function onResetMouseDown (e) {

  // TODO get confirmation first!
  resetBoard(false);
}

function onSolveCellMouseDown (e) {
  var index = getCellIndex(gActiveCell);
  // if NOT a clue cell
  if (!cellHasClass(gActiveCell, CLASS_CLUE)) {
    var first = gActiveCell.firstChild;
    var value = parseInt(first.data, 10);
    // if value NOT equal solution
    if (value != parseInt(gSolution[index], 10)) {
      // insert solution
      if (first) {
        // if text node
        if (3 == first.nodeType) {
          replaceCellValue(gActiveCell, gSolution[index]);
        }
        else {
          insertCellValue(gActiveCell, gSolution[index]);
        }
      }
      else {
        insertCellValue(gActiveCell, gSolution[index]);
      }
    }
  }
}

function onSolveMouseDown (e) {

  // TODO get confirmation first!
  var cells = getBoardCells();

  for (var i = 0; i < cells.length; i++) {
    // if NOT a clue cell
    if (!cellHasClass(cells[i], CLASS_CLUE)) {
      //deleteCellCandidates(getCellCandidates(cells[i]));
      showAllMistakes();
      var first = cells[i].firstChild;
      var value = parseInt(first.data, 10);
      // if value NOT equal solution
      if (value != parseInt(gSolution[i], 10)) {
        // insert solution and mark mistake
        //classifyCell(cells[i], CLASS_MISTAKE);
        if (first) {
          // if text node
          if (3 == first.nodeType) {
            replaceCellValue(cells[i], gSolution[i]);
          }
          else {
            insertCellValue(cells[i], gSolution[i]);
          }
        }
        else {
          insertCellValue(cells[i], gSolution[i]);
        }
      }
    }
  }
  stopTimer();
}

function onShowMistakesMouseDown (e) {
  showAllMistakes();
}

function setPuzzleIndex (index) {
  /*var puzzle = decodeString(lzwDecompress(invertString(SUDOKU_PUZZLES[index])));*/
  var puzzle = SUDOKU_PUZZLES[index];
  gSolution = getSolutionFromString(puzzle);
  insertClues(puzzle);
}

function onLevelsChange (e) {
  var element = getTargetElement(e);
  var index = element.selectedIndex;
  resetBoard(true);
  setPuzzleIndex(index);
}

function onOkMouseDown (e) {
  var element = getTargetElement(e);
  var messages = getMessages();
  messages.style.display = STYLE_NONE;
}

function onTimerMouseDown (e) {
  var board = getBoard();
  toggleTimerPause();
  board.style.visibility = (isPaused() ? "hidden" : "visible");
}

function onWindowLoad () {
  testRequisites();
  var pallet = getPallet();
  var board = getBoard();
  var write = getWrite();
  var ok = getOk();
  var save = getSave();
  var discard = getDiscard();
  var palletCells = getPalletCells();
  var boardCells = getBoardCells();
  var candidates = getCandidates(board);
  var timer = getTimer();
  var showMistakes = d.getElementById(ID_SHOW_MISTAKES);
  var reset = d.getElementById(ID_RESET);
  var solve = d.getElementById(ID_SOLVE);
  var solveCell = d.getElementById(ID_SOLVE_CELL);
  var checkMistakes = d.getElementById(ID_CHECK_MISTAKES);
  var autoCandidate = d.getElementById(ID_AUTO_CANDIDATE);
  var options = d.getElementById(ID_OPTIONS);
  var help = d.getElementById(ID_HELP);
  var levels = d.getElementById(ID_LEVELS);

  assignListener(w, "keydown", onWindowKeyDown);

  for (var i = 0; i < palletCells.length; i++) {
    assignListener(palletCells[i], EVENT_MOUSE_DOWN, onPalletMouseDown);
    assignListener(palletCells[i], EVENT_MOUSE_OVER, onPalletMouseOver);
    assignListener(palletCells[i], EVENT_MOUSE_OUT, onPalletMouseOut);
  }
  for (var i = 0; i < boardCells.length; i++) {
    assignListener(boardCells[i], EVENT_MOUSE_DOWN, onBoardMouseDown);
    assignListener(boardCells[i], EVENT_MOUSE_OVER, onBoardMouseOver);
    assignListener(boardCells[i], EVENT_MOUSE_OUT, onBoardMouseOut);
  }

  assignListener(write, EVENT_MOUSE_DOWN, onWriteMouseDown);
  assignListener(timer, EVENT_MOUSE_DOWN, onTimerMouseDown);
  assignListener(ok, EVENT_MOUSE_DOWN, onOkMouseDown);
  assignListener(save, EVENT_MOUSE_DOWN, onSaveMouseDown);
  assignListener(discard, EVENT_MOUSE_DOWN, onDiscardMouseDown);
  assignListener(showMistakes, EVENT_MOUSE_DOWN, onShowMistakesMouseDown);
  assignListener(reset, EVENT_MOUSE_DOWN, onResetMouseDown);
  assignListener(solve, EVENT_MOUSE_DOWN, onSolveMouseDown);
  assignListener(solveCell, EVENT_MOUSE_DOWN, onSolveCellMouseDown);
  assignListener(checkMistakes, EVENT_MOUSE_DOWN, onCheckMistakesMouseDown);
  assignListener(autoCandidate, EVENT_MOUSE_DOWN, onAutoCandidateMouseDown);
  assignListener(levels, EVENT_CHANGE, onLevelsChange);

  //assignListener(w, "beforeunload", onWindowBeforeUnload);
  setPuzzleIndex(0);
  setCursor(STYLE_CURSOR_PEN);
  palletCells[0].style.color = STYLE_NUMBER_ACTIVE;
  setActiveCell(boardCells[0]);

  startTimer(0);
}

/* The main entry point of this script */
assignListener(w, "load", onWindowLoad);

/* Export functions, constructors and prototype properties for the Google compiler */
//window["updateTimer"] = updateTimer;
