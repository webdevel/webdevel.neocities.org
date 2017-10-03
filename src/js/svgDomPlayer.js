/**
 * Title: SVG DOM Player
 *
 * File: svgDomPlayer.js
 * The SVG DOM Player is cross-browser tested and is known to work in the following
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
 * Sat Dec 25 15:47:48 PST 2010
 *
 * Author:
 * Steven Garcia
 *
 * http://webdevel.neocities.org/
 *
 * Copyright:
 * Copyright (c) 2010, Steven Garcia. All rights reserved.
 *
 * License:
 * This program is licensed by GPLv2.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
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

/**
 * A closure to encapsulate the classes
 */
(function () {
  /**
   * Class: Panel
   * A SVG DOM Player control panel
   */
  var Panel = function (doc, id, doAction, Options) {
    var namespace = 'http://www.w3.org/2000/svg';
    var svg = doc.documentElement;
    var panel = doc.createElementNS(namespace, 'g');
    var play = doc.createElementNS(namespace, 'path');
    var stop = doc.createElementNS(namespace, 'path');
    var pause = doc.createElementNS(namespace, 'path');
    var loop = doc.createElementNS(namespace, 'path');
    var about = doc.createElementNS(namespace, 'path');
    var state = 0; // Bit flags used to change the panel state
    var LOOP = 1; // A Bit mask used to toggle the panel loop state

    panel.setAttribute('id', id);
    panel.setAttribute('transform', 'translate(3,3)');
    panel.setAttribute('stroke', 'white');
    if (!Options.show) {
      panel.setAttribute('display', 'none');
    }

    play.setAttribute('id', 'play');
    play.setAttribute('d', 'M 0,0 13,7 0,13 z');

    stop.setAttribute('id', 'stop');
    stop.setAttribute('d', 'M 26,0 39,0 39,13 26,13 26,0 z');

    pause.setAttribute('id', 'pause');
    pause.setAttribute('d', 'M 0,0 4,0 4,13 6,13 6,0 10,0 10,13 0,13 0,0 z');
    pause.setAttribute('display', 'none');

    loop.setAttribute('id', 'loop');
    loop.setAttribute('d', 'M 58.5,0 C 67,0 67,13 58.5,13 50,13 50,0 58.5,0 z');

    about.setAttribute('id', 'about');
    about.setAttribute('d', 'm 82,4.2 -1.4,0 -4,0.5 0,1.4 0.5,0 c 1,0 1.2,0.4 ' +
                       '1.2,1.4 l 0,2.5 c 0,1 -0.1,1.2 -1,1.3 l -0.7,0.1 0,1.4 ' +
                       '7,0 0,-1.4 -0.7,-0.1 C 82,11.1 81.9,11 81.9,10 l 0,-5.7 ' +
                       'M 80,0.3 c -1.2,0 -2.2,0.8 -2.2,1.7 0,0.9 0.9,1.6 2.1,1.6 ' +
                       '1.2,0 2.2,-0.8 2.2,-1.7 C 82.1,1 81.2,0.3 80,0.3');

    var svgmouseover = function (evt) {
      panel.setAttribute('display', 'inline');
    };
    var svgmouseout = function (evt) {
      panel.setAttribute('display', 'none');
    };
    if (svg.addEventListener) {
      svg.addEventListener('mouseover',
        function (evt) {
          svgmouseover(evt);
        }, false);
      svg.addEventListener('mouseout',
        function (evt) {
          svgmouseout(evt);
        }, false);
    }

    var mouseover = function (evt) {
      evt.target.setAttribute('fill', 'orange');
    };
    var mouseout = function (evt) {
      evt.target.setAttribute('fill', 'black');
      evt.target.setAttribute('transform', 'translate(0,0)');
      if ('loop' === evt.target.getAttribute('id')) {
        if (state) {
          loop.setAttribute('fill', 'green');
          loop.setAttribute('transform', 'translate(0,2)');
        }
      }
    };
    var mousedown = function (evt) {
      evt.target.setAttribute('fill', 'blue');
      evt.target.setAttribute('transform', 'translate(0,2)');
    };
    var mouseup = function (evt) {
      evt.target.setAttribute('fill', 'orange');
      evt.target.setAttribute('transform', 'translate(0,0)');
    };
    var click = function (evt) {
      // Reference to the Player doAction function
      doAction(evt.target.id, panel.id, evt);
      if ('play' === evt.target.getAttribute('id')) {
        pause.setAttribute('display', 'inline');
        play.setAttribute('display', 'none');
      }
      else if ('pause' === evt.target.getAttribute('id')) {
        play.setAttribute('display', 'inline');
        pause.setAttribute('display', 'none');
      }
      else if ('stop' === evt.target.getAttribute('id')) {
        play.setAttribute('display', 'inline');
        pause.setAttribute('display', 'none');
      }
      else if ('loop' === evt.target.getAttribute('id')) {
        state ^= LOOP; // toggle the loop state bit
        if (state) {
          loop.setAttribute('fill', 'green');
          loop.setAttribute('transform', 'translate(0,2)');
        }
        else {
          loop.setAttribute('fill', 'black');
          loop.setAttribute('transform', 'translate(0,0)');
        }
      }
    };
    if (panel.addEventListener) {
      panel.addEventListener('mouseover',
        function (evt) {
          mouseover(evt);
        }, false);
      panel.addEventListener('mouseout',
        function (evt) {
          mouseout(evt);
        }, false);
      panel.addEventListener('mousedown',
        function (evt) {
          mousedown(evt);
        }, false);
      panel.addEventListener('mouseup',
        function (evt) {
          mouseup(evt);
        }, false);
      panel.addEventListener('click',
        function (evt) {
          click(evt);
        }, false);
    }

    panel.appendChild(play);
    panel.appendChild(stop);
    panel.appendChild(pause);
    panel.appendChild(loop);
    panel.appendChild(about);
    svg.appendChild(panel);
  };

  /**
   * Class: Buffer
   * A buffer for every clip of frames
   */
  var Buffer = function (doc, id, frames, interval, Options, panel) {
    this.doc = doc; // reference to the SVG document
    this.id = id; // buffer identification
    this.frames = frames; // SVG group elements used as frames
    this.start = Options.start; // determines the starting index
    this.step = Options.step; // how much to increment the index
    this.index = Options.start; // determines the currently shown frame
    this.end = (this.frames.length - 1); // determines when to restart the index
    this.interval = interval; // determines how long to show each frame in milliseconds
    this.prefix = Options.prefix; // determines which parents groups to use as frames
    this.panel = panel;
    /* Used to set, clear, toggle and test the buffer state
     *             00000000000000000000000000000001
     *    Use the first bit to set play on or off ^
     *             00000000000000000000000000000010
     * Use the second bit to set pause on or off ^
     *             00000000000000000000000000000100
     *  Use the third bit to set loop on or off ^
     */
    this.state = 0;
  };

  /**
   * Class: SvgDomPlayer
   * A SVG DOM player class
   */
  var SvgDomPlayer = function () {
    var Clips = {}; // to contain multiple frame buffers
    var Options = {
      start: 0, // determines the starting index
      step: 1, // how much to increment the index
      interval: 100, // determines how long to show each frame in milliseconds
      prefix: 'layer', // determines which top level groups to use as frames
      play: false,
      loop: false,
      Show: false
    };
    var loading = 0; // Used to test the number of milliseconds during loading
    var States = {
      Actions: {
        Masks: {
          PLAY:  1,
          PAUSE: 2,
          LOOP:  4
        },
        timeout: function (buf, event) {
          var self = this;
          buf.doc.defaultView.setTimeout(
            function () {
              self.show(buf, event);
            }, buf.interval);
        },
        show: function (buf, event) {
          var result;
          if ((buf.state & this.Masks.PLAY) &&
             !(buf.state & this.Masks.PAUSE)) {
            // don't display the previous frame
            var previous;
            result = 'play';
            // show the currently indexed buffer frame
            buf.frames[buf.index].setAttribute('display', 'inline');
            if (buf.index >= buf.step) {
              previous = (buf.index - buf.step);
            }
            else {
              previous = (buf.frames.length - 1);
            }
            buf.frames[previous].setAttribute('display', 'none');
            // timeout calls this show method again
            this.timeout(buf, event);
            if (buf.index >= buf.end) {
              // restart buffer frame index
              buf.index = buf.start;
              // when not looping clear the play state
              if (!(buf.state & this.Masks.LOOP)) {
                if (buf.doc) {
                  var evt = buf.doc.createEvent('MouseEvents');
                  evt.initMouseEvent('click', true, true, buf.doc.defaultView,
                                     1, 0, 0, 0, 0, false, false, true, false,
                                     0, null);
                  var elem = buf.doc.getElementById('pause');
                  if (elem) {
                    elem.dispatchEvent(evt);
                  }
                }
                result = 'pause';
              }
            }
            else {
              // increment buffer frame index
              buf.index = buf.index + buf.step;
            }
          }
          return result;
        },
        play: function (buf, event) {
          if ((buf.state & this.Masks.PLAY) &&
              (buf.state & this.Masks.PAUSE)) {
            this.pause(buf, event);
          }
          if (!(buf.state & this.Masks.PLAY)) {
            // set play state
            buf.state |= this.Masks.PLAY;
            this.show(buf, event);
          }
        },
        stop: function (buf, event) {
          if ((buf.state & this.Masks.PLAY)) {
            var i;
            // clear play and pause state
            buf.index = buf.start;
            buf.state &= ~this.Masks.PLAY;
            buf.state &= ~this.Masks.PAUSE;
            buf.frames[buf.start].setAttribute('display', 'inline');
            for (i = (buf.start + 1); i < buf.frames.length; i++) {
              buf.frames[i].setAttribute('display', 'none');
            }
          }
        },
        pause: function (buf, event) {
          // when in play state, toggle pause state and show frame buffer
          if ((buf.state & this.Masks.PLAY)) {
            buf.state ^= this.Masks.PAUSE;
            if (!(buf.state & this.Masks.PAUSE)) {
              this.show(buf, event);
            }
          }
        },
        loop: function (buf, event) {
          // toggle loop state
          buf.state ^= this.Masks.LOOP;
        },
        Version: {
          NAME: 'SVG DOM Player', // the project version name
          LABEL: ' Version ', // the project version label
          NUMBER: '0.1.2', // the project version number
          COPYRIGHT: '\nCopyright (c) 2010, Steven Garcia. All rights reserved.', // the project copyright
          LICENSE: '\nThis program is free software and licensed by GPLv2.',
          DISCLAIMER: '\nThis program comes with absolutely no warranty.'
        },
        about: function (buf, event) {
          alert(this.Version.NAME +
                this.Version.LABEL +
                this.Version.NUMBER +
                this.Version.COPYRIGHT +
                this.Version.LICENSE +
                this.Version.DISCLAIMER);
        }
      }
    };

    var doAction = function (act, id, event) {
      States.Actions[act](Clips[id], event);
    };

    /* get the frame interval from SVG desc element where id='interval' */
    var getInterval = function (descs, name) {
      var result = Options.interval;
      var id = new RegExp(name);
      for (var i = 0; i < descs.length; i++) {
        if (id.test(descs[i].id)) {
          result = parseInt(descs[i].firstChild.nodeValue, 10);
        }
      }
      return result;
    };

    /* get a frame when a group is a parent and not a child of another group
     * get all group tag elements with id prefix into sequential array.
     * set first frame to display and all others to none*/
    var getFrames = function (groups, prefix) {
      var id = new RegExp(prefix + '\\d+');
      var frames = [];
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].parentNode.nodeName !== 'g' && id.test(groups[i].id)) {
          groups[i].setAttribute('display', 'none');
          frames.push(groups[i]);
        }
      }
      frames[Options.start].setAttribute('display', 'inline');
      return frames;
    };
    var setClip = function (id, doc) {
      var elem = null;
      var groups = doc.getElementsByTagName('g');
      var frames = getFrames(groups, Options.prefix);
      var descs = doc.getElementsByTagName('desc');
      var interval = getInterval(descs, 'interval');
      var panel = new Panel(doc, id, doAction, Options);
      Clips[id] = new Buffer(doc, id, frames, interval, Options, panel);
      var evt = doc.createEvent('MouseEvents');
      evt.initMouseEvent('click', true, true, doc.defaultView,
                         1, 0, 0, 0, 0, false, false, true, false, 0, null);
      if (Options.loop) {
        elem = doc.getElementById('loop');
        if (elem) {
          elem.dispatchEvent(evt);
        }
      }
      if (Options.play) {
        elem = doc.getElementById('play');
        if (elem) {
          elem.dispatchEvent(evt);
        }
      }
    };
    this.loadFromWindow = function (win) {
      if (win.addEventListener) {
        win.addEventListener('load',
          function () {
            setClip('0', win.document);
          }, false);
      }
    };

    var loadClipFromElement = function (win, id) {
      var doc = null;
      var expire = 9000; // The maximum milliseconds to try loading a clip
      var wait = 100; // The number of milliseconds to wait during a load try
      var elem = win.document.getElementById(id);
      /* Note that because of security restrictions, the contents of a
       * document can be accessed from another document only if the two
       * documents are located in the same domain. In Google Chrome, the
       * contentDocument and the contentWindow.document properties cannot
       * be used to access local files ('file:' protocol).
       *
       * The GetSVGDocument interface is deprecated and may be dropped from
       * future versions of the SVG specification. Authors are suggested to
       * use the contentDocument attribute on the EmbeddingElement interface
       * to obtain a referenced SVG document, if that interface is available.
       * Cited: http://www.w3.org/TR/SVG11/struct.html#InterfaceGetSVGDocument */
      doc = (elem.getSVGDocument() || elem.contentDocument);
      /* A work-around when SVG document returns null. In most cases, this will
       * happen when this function is called before the SVG document is finished
       * loading. So, we will try to get the SVG document again in a few moments
       * until the document is not null or undefined. In a case that a document
       * will always return null or undefined, an attempt to load will expire. */
      if (!doc || !doc.documentElement) {
        if (loading < expire) {
          loading = loading + wait;
          win.setTimeout(
            function () {
              loadClipFromElement(win, id);
            }, wait);
        }
      }
      else {
        setClip(id, doc);
      }
    };

    this.loadFromWindowElementId = function (win, id) {
      loading = 0;
      if (win.addEventListener) {
        win.addEventListener('load',
          function (event) {
            loadClipFromElement(win, id);
          }, false);
      }
      else if (win.attachEvent) { // for IExplore
        win.attachEvent('onload',
          function () {
            loadClipFromElement(win, id);
          });
      }
    };

    this.setInterval = function (millis) {
      Options.interval = millis;
    };

    this.setPrefix = function (prefix) {
      Options.prefix = prefix;
    };

    this.setPlay = function (bool) {
      Options.play = bool;
    };

    this.setLoop = function (bool) {
      Options.loop = bool;
    };

    this.setShow = function (bool) {
      Options.show = bool;
    };
  };

  this.svgDomPlayer = new SvgDomPlayer();
})();
