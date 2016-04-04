webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = process.env.ELECTRON_COV
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/electron\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(3);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Electron
	 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Electron constructors
	 */

	var Program = __webpack_require__(4)
	  , Args = __webpack_require__(16);

	/*!
	 * Primary export - program factory
	 */

	var exports = module.exports = defineProgram;

	/*!
	 * defineProgram long form
	 */

	exports.defineProgram = defineProgram;

	/*!
	 * Electron version
	 */

	exports.version = '0.4.0';

	/*!
	 * Argv parsing factory
	 */

	exports.argv = function (args) {
	  args = args || process.argv;
	  var argv = new Args(args);
	  return argv;
	};

	/*!
	 * program factory
	 */

	function defineProgram (name, opts) {
	  var program = new Program(name, opts);
	  return program;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Electron - process.argv parsing
	 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * External dependancies
	 */

	var EventEmitter = __webpack_require__(5).EnhancedEmitter
	  , tty = __webpack_require__(12)
	  , util = __webpack_require__(13);

	/*!
	 * Electron dependancies
	 */

	var Args = __webpack_require__(16)
	  , Command = __webpack_require__(17)
	  , themes = __webpack_require__(18);

	/*!
	 * isTTY (can support color)
	 */

	var istty = tty.isatty(1) && tty.isatty(2);

	/*!
	 * defaults (a, b)
	 *
	 * Helper function to merge one object to another
	 * using the first object as default values.
	 *
	 * @param {Object} subject
	 * @param {Object} defaults
	 * @name defaults
	 * @api private
	 */

	function defaults (a, b) {
	  if (a && b) {
	    for (var key in b) {
	      if ('undefined' == typeof a[key]) a[key] = b[key];
	    }
	  }
	  return a;
	};

	/*!
	 * Main export
	 */

	module.exports = Program;

	/**
	 * ## Program Framework
	 *
	 * The primary export of the electron module is a function
	 * that composes a new program framework. The returned
	 * `program` is a chainable api that allow you to change
	 * settings, define commands, and start launch the program.
	 *
	 * The primary argument provided on construction is the base
	 * name used through the help documentation. In a majority of
	 * of cases, this would be the command executed from your terminal
	 * used launch the program.
	 *
	 * In the case of scripts with the header of `#!/usr/bin/env node`,
	 * you should use a variant of the following.
	 *
	 *     var program = electron('microscope');
	 *
	 * If you are however launching your program from a `.js` file,
	 * the recommended construction pattern is the following.
	 *
	 *     var program = electrong('node microscope.js');
	 *
	 * You can then chain any of the following commands to further
	 * define your application and commands.
	 *
	 * @header Program Framework
	 */

	function Program (base, opts) {
	  /*!
	   * @param {String} base name
	   * @param {Object} options
	   */

	  EventEmitter.call(this, { delimeter: ' ' });
	  this.commands = [];
	  this._colorized = false;
	  this.opts = defaults(opts || {}, {
	      useColors: istty
	    , version: null
	    , desc: null
	    , name: base || 'Electron'
	    , base: base || 'electron'
	    , cwd: process.cwd()
	    , theme: {
	          name: 'clean'
	        , spec: {
	            noColor: false
	          }
	      }
	  });
	}

	/*!
	 * Inherit from Drip event emitter.
	 */

	util.inherits(Program, EventEmitter);

	/**
	 * ### .command (name)
	 *
	 * The most important aspect of an application is defining
	 * the different commands that can be executed for it. Some
	 * people prefer a CLI tool that does one thing based on a
	 * set of options. Others prefer a command line tool that
	 * can pivot based on a command string. Electron supports both.
	 *
	 * When using the `command` method, it will return a constructed
	 * command object with a different set of methods for chaining.
	 * Please read the "Constructing Commands" section for all available
	 * chainable methods and their respective purpose.
	 *
	 * ##### Single Command
	 *
	 * As you understand how Electron parses command-line options,
	 * you know that a command is any option that does
	 * not start with `-` or `--`. Therefor, a single-command electron
	 * application is one that does not require any `commands`, but
	 * will execute a single action. Best demonstrated...
	 *
	 *     $ node app.js -p 8080
	 *
	 * In the case of single-command applications, we will define
	 * a `default` command for electron to run.
	 *
	 *     program
	 *       .command('default')
	 *       .action(function (argv) {
	 *         var port = argv.param('p', 'port');
	 *         // something cool
	 *       });
	 *
	 * The `default` command will run when no commands are passed in,
	 * but it will not run if a command is provided.
	 *
	 * ##### Multiple Commands
	 *
	 * You can also create many different commands for your application
	 * based on a simple string. These can be used in conjunction
	 * with `default` if you would like.
	 *
	 *     $ node app.js hello --universe
	 *
	 * In this case we want to only run an action when the comamnd
	 * `hello` is present. This can easily be achieved.
	 *
	 *     program
	 *       .command('hello')
	 *       .action(fn);
	 *
	 * There are also cases where you might want to have multipe layers
	 * of commands.
	 *
	 *     $ node app.js hello universe
	 *
	 * Using the same mechanism, we can easily define this action.
	 *
	 *     program
	 *       .command('hello universe')
	 *       .action(fn);
	 *
	 * One final option to explore with multiple commands is wildcards.
	 * Wildcards can exist at any level in a multi-word command, but they
	 * only work for entire words, not substrings.
	 *
	 *     program
	 *       .command('hello *')
	 *       .action(function (argv) {
	 *         var where = argv.commands[1];
	 *       });
	 *
	 * Would respond for any command starting with `hello` and is two
	 * commands long, such as...
	 *
	 *     $ node app.js hello world
	 *     $ node app.js hello universe
	 *
	 * ##### Absent Commands
	 *
	 * Should you want to notify your users when they attempt to use
	 * a command is not support, you may use the `absent` command. This
	 * is also useful if you want to have a single command app but
	 * support a list of items as "options", such as a list of files or
	 * directories.
	 *
	 *     $ node build.js file1.js files2.js
	 *
	 *     program
	 *       .command('absent')
	 *       .action(function (argv) {
	 *         var files = argv.commands.slice(0);
	 *         // something cool
	 *       });
	 *
	 * @param {String} command name
	 * @returns chainable constructed command
	 * @name command
	 * @api public
	 */

	Program.prototype.command = function (name) {
	  var cmd = new Command(name);
	  this.commands.push(cmd);
	  return cmd;
	};

	/**
	 * ### .parse (process.argv)
	 *
	 * The `parse` method will initiate the program with
	 * selection of arguments and run a matching action. It
	 * should be used once all commands and settings have
	 * been propogated.
	 *
	 *     program.parse();
	 *     program.parse(process.argv);
	 *     program.parse([ 'node', 'app.js', '--hello', '--universe' ]);
	 *
	 * If no parameter is provided, `parse` will default to using
	 * the current processes `process.argv` array. You may alse
	 * provide your own array of commands if you like. Note that
	 * argv parsing expectes the first item to be the executing program
	 * and the second argument to be the script (as is with all node argv).
	 * These will be discarded.
	 *
	 * @param {Array} process.argv or compable array
	 * @name parse
	 * @api public
	 */

	Program.prototype.parse = function (args) {
	  args = args || process.argv;
	  var argv = new Args(args)
	    , cmds = mountCommands.call(this)
	    , command = argv.commands.slice(0);

	  argv.cwd = this.opts.cwd;
	  if (argv.mode('help', 'h')) {
	    this.showHelp();
	  } else if (argv.mode('version', 'v')) {
	    displayVersion.call(this);
	  } else if (!command.length) {
	    if (cmds.def) cmds.def(argv);
	  } else if (!this.hasListener(command)) {
	    if (cmds.absent) cmds.absent(argv);
	  } else {
	    this.emit(command, argv);
	  }

	  return this;
	};

	/**
	 * ### .name (name)
	 *
	 * Provide a formal name to be used when displaying
	 * the help for the given program. Returns the program
	 * for chaining.
	 *
	 *     program.name('Electron Framework');
	 *
	 * @param {String} formal name
	 * @returns `this` for chaining
	 * @name name
	 * @api public
	 */

	Program.prototype.name = function (name) {
	  this.opts.name = name;
	  return this;
	};

	/**
	 * ### .version (version)
	 *
	 * Provide a program version to be used when displaying
	 * the version for the given program. Returns the program
	 * for chaining.
	 *
	 *     program.version(electron.version);
	 *
	 * @param {String} application version
	 * @returns `this` for chaining
	 * @name version
	 * @api public
	 */

	Program.prototype.version = function (v) {
	  this.opts.version = v;
	  return this;
	};

	/**
	 * ### .desc (description)
	 *
	 * Provide a program discription to be used when displaying
	 * the the help for the given program. Returns the program
	 * for chaining.
	 *
	 *     program.desc('https://github.com/logicalparadox/electron');
	 *
	 * @param {String} application description
	 * @returns `this` for chaining
	 * @name desc
	 * @api public
	 */

	Program.prototype.desc = function (desc) {
	  this.opts.desc = desc;
	  return this;
	};

	/**
	 * ### .cwd (fqp)
	 *
	 * Provide an alternative current working directory to be
	 * passed as part of the `argv` parameter to the action that has
	 * been executed. Returns the program for chaining.
	 *
	 *     // set
	 *     program.cwd(__dirname);
	 *
	 *     // get
	 *     program
	 *       .command('universe')
	 *       .action(function (argv) {
	 *         var cwd = argv.cwd;
	 *         // something cool
	 *       });
	 *
	 * @param {String} fully quialified path
	 * @returns `this` for chaining
	 * @name cwd
	 * @api public
	 */

	Program.prototype.cwd = function (p) {
	  this.opts.cwd = p;
	  return this;
	};

	/**
	 * ### .theme (theme, specifications)
	 *
	 * You may change the appearance of the `--help` using
	 * a simple theming mechanism. Electron comes bundled with
	 * two themes. Each theme also supports minor tweaks. Returns
	 * the program for chaining.
	 *
	 * ##### clean (default)
	 *
	 * A colorful and verbose theme useful for multi-command applications.
	 *
	 *     program
	 *       .theme('clean', {
	 *           noColor: false // set to true to disable color coding
	 *         , prefix: '' // prefix written before each line, such as 'help:'
	 *       });
	 *
	 * <img alt="Electron Clean Theme" src="http://f.cl.ly/items/10283V3e2o1R0f2d2x32/electron-clean-theme.png" />
	 *
	 * ##### simple
	 *
	 * An "options only" theme useful for single command applications.
	 *
	 *     program
	 *       .theme('simple', {
	 *           noColor: false // set to true to disable color coding
	 *         , command: 'default' // which command to show options for
	 *         , usage: '<options>' // special usage instructions
	 *       });
	 *
	 * <img alt="Electron Simple Theme" src="http://f.cl.ly/items/3z3l162D101e0016320G/electron-simple-theme.png" />
	 *
	 * ##### Use Your Own Function
	 *
	 * You may also provide a function to `theme` to provide your own output.
	 * The following example will list all of the commands present in your
	 * program.
	 *
	 *     program.theme(function () {
	 *       this.colorize();
	 *       console.log('Usage: %s <command>', this.opts.base);
	 *       this.commands.forEach(functioni (cmd) {
	 *         console.log('  %s - %s', cmd.cmd, cmd.desc);
	 *       });
	 *     });
	 *
	 * Those interesting in building custom themes should view Electron
	 * on GitHub and explore
	 * [lib/electron/themes](https://github.com/logicalparadox/electron/tree/master/lib/electron/themes).
	 *
	 * @param {String|Function} name of electron theme or custom function
	 * @param {Object} options for electron themes
	 * @returns `this` for chaining
	 * @name theme
	 * @api public
	 */

	Program.prototype.theme = function (name, spec) {
	  if ('function' === typeof name) {
	    this.opts.theme = name;
	  } else {
	    var theme = {};
	    theme.name = name || 'clean';
	    theme.spec = defaults(spec || {}, { noColor: false });
	    this.opts.theme = theme;
	  }

	  return this;
	};

	/**
	 * ### .colorize ()
	 *
	 * The `colorize` helper is available if you wish you implement
	 * a colorized but lightweight logging mechanism in your actions,
	 * or if you are building a custom help theme. `colorize` works
	 * by extending `String.prototype` with a number of color options.
	 * Just in case, if the current program is not running as a TTY,
	 * no string changes will be made.
	 *
	 *     program.colorize();
	 *     console.log('hello universe'.green);
	 *
	 * ##### Colors
	 *
	 * - red
	 * - green
	 * - yellow
	 * - blue
	 * - magenta
	 * - cyan
	 * - gray
	 *
	 * @name colorize
	 * @api public
	 */

	Program.prototype.colorize = function (noColors) {
	  if (this._colorized) return this;
	  var self = this
	    , colors = {
	          'red': 31
	        , 'green': 32
	        , 'yellow': 33
	        , 'blue': 34
	        , 'magenta': 35
	        , 'cyan': 36
	        , 'gray': 90
	        , 'reset': 0
	      };

	  Object.keys(colors).forEach(function (color) {
	    Object.defineProperty(String.prototype, color,
	      { get: function () {
	          if (noColors || !self.opts.useColors) return this + '';
	          return '\033[' + colors[color] + 'm' + this + '\033[0m';
	        }
	      , configurable: true
	    });
	  });

	  this._colorized = true;
	  return this;
	};

	/*!
	 * mountCommands ()
	 *
	 * For each constructed command added to the the program
	 * mount as a listener. If the command is special, return
	 * it for futher inspection.
	 *
	 * @ctx program
	 * @api private
	 */

	function mountCommands () {
	  var self = this
	    , res = {}
	    , arr = [];

	  this.commands.forEach(function (command) {
	    var fn = command.opts.action
	      , ev = Array.isArray(command.opts.cmd)
	          ? command.opts.cmd.join(' ')
	          : command.opts.cmd;

	    if (ev === 'default') res.def = fn;
	    else if (ev === 'absent') res.absent = fn;
	    else if (!~arr.indexOf(ev)) {
	      arr.push(ev);
	      self.on(ev, fn);
	    }
	  });

	  return res;
	}

	/*!
	 * displayVersion ()
	 *
	 * Display the current program version and exit
	 * process. Used when called with `-v` or `--version`
	 *
	 * @ctx program
	 * @api private
	 */

	function displayVersion() {
	  process.stdout.write(this.opts.version + '\n');
	  process.exit();
	}

	/*!
	 * ### displayHelp()
	 *
	 * Execute the custom help theme or find the respective
	 * electron theme and execute.
	 *
	 * @ctx program
	 * @api public
	 */

	Program.prototype.showHelp = function () {
	  if ('function' === typeof this.opts.theme)
	    return this.opts.theme.call(this);

	  var name = this.opts.theme.name
	    , theme = themes[name]
	    , spec = this.opts.theme.spec || {};

	  if (!theme) throw new Error('Electron: Invalid help theme defined.');
	  else theme.call(this, spec);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = (process && process.env && process.env.DRIP_COV)
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/drip\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(6);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * drip - Node.js event emitter.
	 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Node.js compatible emitter
	 */

	exports.EventEmitter = __webpack_require__(7);

	/*!
	 * Enhanced emitter
	 */

	exports.EnhancedEmitter = __webpack_require__(11);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var common = __webpack_require__(8);

	module.exports = EventEmitter;

	function EventEmitter () {
	  // nothing to see here
	}

	/**
	 * ### .on (event, callback)
	 *
	 * Bind a `callback` function to all emits of `event`.
	 *
	 * ```js
	 * drop.on('foo', callback);
	 * ```
	 *
	 * @param {String} event
	 * @param {Function} callback
	 * @alias addListener
	 * @name on
	 * @api public
	 */

	EventEmitter.prototype.on =
	EventEmitter.prototype.addListener = function () {
	  var map = this._events || (this._events = {})
	    , ev = arguments[0]
	    , fn = arguments[1];
	  if (!map[ev]) map[ev] = fn;
	  else if ('function' === typeof map[ev]) map[ev] = [ map[ev], fn ];
	  else map[ev].push(fn);
	  return this;
	};

	/**
	 * @import ./common.js#exports.many
	 * @api public
	 */

	EventEmitter.prototype.many = common.many;

	/**
	 * @import ./common.js#exports.once
	 * @api public
	 */

	EventEmitter.prototype.once = common.once;

	/**
	 * ### .off ([event], [callback])
	 *
	 * Unbind `callback` function from `event`. If no function
	 * is provided will unbind all callbacks from `event`. If
	 * no event is provided, event store will be purged.
	 *
	 * ```js
	 * emitter.off('event', callback);
	 * ```
	 *
	 * @param {String} event _optional_
	 * @param {Function} callback _optional_
	 * @alias removeListener
	 * @alias removeAllListeners
	 * @name off
	 * @api public
	 */

	EventEmitter.prototype.off =
	EventEmitter.prototype.removeListener =
	EventEmitter.prototype.removeAllListeners = function (ev, fn) {
	  if (!this._events || arguments.length == 0) {
	    this._events = {};
	    return this;
	  }

	  if (!fn) {
	    this._events[ev] = null;
	    return this;
	  }

	  var fns = this._events[ev];

	  if (!fns) return this;
	  else if ('function' === typeof fns && fns == fn) this._events[ev] = null;
	  else {
	    for (var i = 0; i < fns.length; i++)
	      if (fns[i] == fn) fns.splice(i, 1);
	    if (fns.length === 0) this._events[ev] = null;
	    else if (fns.length === 1) this._events[ev] = fns[0];
	  }

	  return this;
	}

	/**
	 * ### .emit (event[, args], [...])
	 *
	 * Trigger `event`, passing any arguments to callback functions.
	 *
	 * ```js
	 * emitter.emit('event', arg, ...);
	 * ```
	 *
	 * @param {String} event name
	 * @param {Mixed} multiple parameters to pass to callback functions
	 * @name emit
	 * @api public
	 */

	EventEmitter.prototype.emit = function () {
	  if (!this._events) return false;

	  var ev = arguments[0]
	    , fns = this._events[ev];

	  if (!fns) return false;

	  if ('function' == typeof fns) {
	    if (arguments.length == 1) fns.call(this);
	    else if (arguments.length == 2) fns.call(this, arguments[1]);
	    else if (arguments.length == 3) fns.call(this, arguments[1], arguments[2]);
	    else {
	      var l = arguments.length
	        , a = Array(l - 1);
	      for (var i = 1; i < l; i++) a[i - 1] = arguments[i];
	      fns.apply(this, a);
	    }
	  } else {
	    var a;
	    for (var i = 0, l = fns.length; i < l; i++) {
	      if (arguments.length === 1) fns[i].call(this);
	      else if (arguments.length === 2) fns[i].call(this, arguments[1]);
	      else if (arguments.length === 3) fns[i].call(this, arguments[1], arguments[2]);
	      else {
	        if (!a) {
	          var l = arguments.length
	          a = Array(l - 1);
	          for (var i2 = 1; i2 < l; i2++) a[i2 - 1] = arguments[i2];
	        }
	        fns[i].apply(this, a);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * ### .hasListener (ev[, function])
	 *
	 * Determine if an event has listeners. If a function
	 * is proved will determine if that function is a
	 * part of the listeners.
	 *
	 * @param {String} event key to seach for
	 * @param {Function} optional function to check
	 * @returns {Boolean} found
	 * @name hasListeners
	 * @api public
	 */

	EventEmitter.prototype.hasListener = function (ev, fn) {
	  if (!this._events) return false;
	  var fns = this._events[ev];
	  if (!fns) return false;
	  return common.hasListener(fns, fn);
	};

	/**
	 * ### .listners (ev)
	 *
	 * Retrieve a list of all callbacks for an
	 * event.
	 *
	 * @param {String} event
	 * @return {Array} callbacks
	 * @name listeners
	 * @api public
	 */

	EventEmitter.prototype.listeners = function (ev) {
	  if (!this._events) return [];
	  var fns = this._events[ev];
	  if (!fns) return [];
	  if ('function' === typeof fns) return [ fns ];
	  else return fns;
	};

	/**
	 * ### .bindEvent (event, target)
	 *
	 * A bound event will listen for events on the current emitter
	 * instance and emit them on the target when they occur. This
	 * functionality is compable with node event emitter.
	 *
	 * ```js
	 * emitter.bindEvent('request', target);
	 * ```
	 *
	 * Note that proxies will also be removed if a generic `off` call
	 * is used.
	 *
	 * @param {String} event key to bind
	 * @param {Object} target drip or node compatible event emitter
	 * @name bindEvent
	 * @api public
	 */

	EventEmitter.prototype.bindEvent = common.bindEvent;

	/**
	 * ### .unbindEvent (event, target)
	 *
	 * Remove a bound event listener. Event and target
	 * must be provied the same as in `bindEvent`.
	 *
	 * ```js
	 * emitter.unbindEvent('request', target);
	 * ```
	 *
	 * @param {String} event key to bind
	 * @param {Object} target drip or node compatible event emitter
	 * @name unbindEvent
	 * @api public
	 */

	EventEmitter.prototype.unbindEvent = common.unbindEvent;

	/**
	 * ### .proxyEvent (event, [namespace], target)
	 *
	 * An event proxy will listen for events on a different
	 * event emitter and emit them on the current drip instance
	 * when they occur. An optional namespace will be pre-pended
	 * to the event when they are emitted on the current drip
	 * instance.
	 *
	 * For example, the following will demonstrate a
	 * namspacing pattern for node.
	 *
	 * ```js
	 * function ProxyServer (port) {
	 *   Drip.call(this, { delimeter: ':' });
	 *   this.server = http.createServer().listen(port);
	 *   this.bindEvent('request', 'server', this.server);
	 * }
	 * ```
	 *
	 * Anytime `this.server` emits a `request` event, it will be
	 * emitted on the constructed ProxyServer as `server:request`.
	 * All arguments included in the original emit will also be
	 * available.
	 *
	 * ```js
	 * var proxy = new ProxyServer(8080);
	 *   proxy.on('server:request', function (req, res) {
	 *   // ..
	 * });
	 * ```
	 *
	 * If you decide to use the namespace option, you can namespace
	 * as deep as you like using either an array or a string that
	 * uses your delimeter or `:`. The following examples are valid.
	 *
	 * ```js
	 * emitter.proxyEvent('request', 'proxy:server', server);
	 * emitter.proxyEvent('request', [ 'proxy', 'server' ], server);
	 * emitter.on('proxy:server:request', cb);
	 * ```
	 *
	 * @param {String} event key to proxy
	 * @param {String} namespace to prepend to this emit
	 * @param {Object} target event emitter
	 * @name proxyEvent
	 * @api public
	 */

	EventEmitter.prototype.proxyEvent = common.proxyEvent;

	/**
	 * ### .unproxyEvent (event, [namespace], target)
	 *
	 * Remove an event proxy by removing the listening event
	 * from the target. Don't forget to include a namespace
	 * if it was used during `proxyEvent`.
	 *
	 * ```js
	 * proxy.unbindEvent('request', proxy.server);
	 * proxy.unbindEvent('request', 'request', proxy.server);
	 * ```
	 *
	 * @param {String} event key to proxy
	 * @param {String} namespace to prepend to this emit
	 * @param {Object} target event emitter
	 * @name unproxyEvent
	 * @api public
	 */

	EventEmitter.prototype.unproxyEvent = common.unproxyEvent;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var concat = __webpack_require__(9);

	/**
	 * ### .many (event, ttl, callback)
	 *
	 * Bind a `callback` function to count(`ttl`) emits of `event`.
	 *
	 *     // 3 times then auto turn off callback
	 *     drop.many('event', 3, callback)
	 *
	 * @param {String|Array} event
	 * @param {Integer} TTL Times to listen
	 * @param {Function} callback
	 * @api public
	 */

	exports.many = function (ev, times, fn) {
	  var self = this;

	  function wrap () {
	    if (--times === 0) self.off(ev, wrap);
	    fn.apply(null, arguments);
	  };

	  this.on(ev, wrap);
	  return this;
	};

	/**
	 * ### .once (event, callback)
	 *
	 * Bind a `callback` function to one emit of `event`.
	 *
	 *      drip.once('event', callback)
	 *
	 * @param {String|Array} event
	 * @param {Function} callback
	 * @api public
	 */

	exports.once = function (ev, fn) {
	  this.many(ev, 1, fn);
	  return this;
	};

	/**
	 * Determine if a function is included in a
	 * list of functions. Or, if a check function
	 * is not available, return true.
	 *
	 * @param {Function|Array} function list
	 * @param {Function|null} function to validate
	 * @api public
	 */

	exports.hasListener = function (fns, fn) {
	  if (!fn && 'function' === typeof fns) return true;
	  else if (fn && 'function' === typeof fns && fn == fns) return true;
	  else if (fns.length === 0) return false;
	  else if (fn && fns.indexOf(fn) > -1) return true;
	  else if (fn) return false;
	  else return true;
	};

	exports.bindEvent = function (ev, target) {
	  var proxy = eventProxy.call(this, ev, target);
	  this.on(ev, proxy);
	  return this;
	};

	exports.unbindEvent = function (ev, target) {
	  var proxy = eventProxy.call(this, ev, target);
	  this.off(ev, proxy);
	  return this;
	};

	exports.proxyEvent = function (ev, ns, target) {
	  if (arguments.length === 2) target = ns, ns = null;
	  var drip = this._drip || {}
	    , listen = !drip.delimeter
	      ? (ns  ? ns + ':' + ev : ev)
	      : (ns
	        ? (Array.isArray(ns)
	          ? concat(ns, [ ev ])
	          : concat(ns.split(drip.delimeter), [ ev ]))
	        : ev);

	  target.addListener(ev, eventProxy.call(this, listen, this));
	  return this;
	};

	exports.unproxyEvent = function (ev, ns, target) {
	  if (arguments.length === 2) target = ns, ns = null;
	  var drip = this._drip || {}
	    , listen = !drip.delimeter
	      ? (ns  ? ns + ':' + ev : ev)
	      : (ns
	        ? (Array.isArray(ns)
	          ? concat(ns, [ ev ])
	          : concat(ns.split(drip.delimeter), [ ev ]))
	        : ev);

	  target.removeListener(ev, eventProxy.call(this, listen, this));
	  return this;
	};


	/*!
	 * Create a function to use as a listener for bind/unbind or
	 * proxy/unproxy calls. It will memoize the result to always
	 * ensure the name function is provided for subequent calls.
	 * This ensure that the the listener is correctly removed during
	 * the un(bind|proxy) variants
	 *
	 * @param {String} event
	 * @param {Object} target
	 * @returns {Function} new or found callback
	 * @api public
	 */

	function eventProxy (ev, target) {
	  var _drip = this._drip || (this._drip = {})
	    , _memoize = _drip.memoize || (_drip.memoize = {})
	    , event = (_drip.delimeter && Array.isArray(ev))
	      ? ev.join(_drip.delimeter)
	      : ev
	    , mem = _memoize[event]
	    , proxy = null;

	  if (!mem) {
	    proxy = makeProxy(event, target);
	    _memoize[event] = [ [ target, proxy ] ];
	  } else {
	    for (var i = 0, l = mem.length; i < l; i++)
	      if (mem[i][0] === target) return mem[i][1];
	    proxy = makeProxy(event, target);
	    mem.push([ target, proxy ]);
	  }

	  return proxy;
	}

	/*!
	 * makeProxy (event, target)
	 *
	 * Provide a context independant proxy function
	 * for using with `eventProxy` construction.
	 *
	 * @param {String} event
	 * @param {Object} target
	 * @returns {Function} to be used callback
	 * @api private
	 */

	function makeProxy(ev, target) {
	  return function proxy () {
	    var args = Array.prototype.slice.call(arguments)
	      , evs = [ ev ].concat(args);
	    target.emit.apply(target, evs);
	  };
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {module.exports = process.env.concat_COV
	  ? __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./lib-cov/concat\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	  : __webpack_require__(10);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	/*!
	 * tea-inherits
	 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
	 * MIT Licensed
	 */

	/**
	 * ### concat (arr1, arr2)
	 *
	 * A much faster concat for two arrays.
	 * Returns a new array.
	 *
	 * ```js
	 * var concat = require('tea-concat')
	 *   , arr = concat([ 1, 2 ], [ 3, 4 ]);
	 * ```
	 *
	 * @param {Array} first array
	 * @param {Array} second array
	 * @return {Array} combined
	 * @api public
	 */

	module.exports = function concat (arr1, arr2) {
	  var l1 = arr1.length
	    , l2 = arr2.length
	    , res = Array(l1 + l2);
	  for (var i = 0; i < l1; i++) res[i] = arr1[i];
	  for (var i2 = 0; i2 < l2; i2++) res[i + i2] = arr2[i2];
	  return res;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var concat = __webpack_require__(9);

	var common = __webpack_require__(8);

	module.exports = EnhancedEmitter;

	function EnhancedEmitter (opts) {
	  opts = opts || {};
	  this._drip = {};
	  this._drip.delimeter = opts.delimeter || ':';
	  this._drip.wildcard = opts.wildcard || (opts.delimeter ? true : false);
	}

	/**
	 * ### .on (event, callback)
	 *
	 * Bind a `callback` function to all emits of `event`.
	 * Wildcards `*`, will be executed for every event at
	 * that level of heirarchy.
	 *
	 *     // for simple drips
	 *     drop.on('foo', callback);
	 *
	 *     // for delimeted drips
	 *     drop.on('foo:bar', callback);
	 *     drop.on([ 'foo', 'bar' ], callback);
	 *     drop.on('foo:*', callback);
	 *     drop.on([ 'foo', '*' ], callback);
	 *
	 * An array can be passed for event when a delimeter has been
	 * defined. Events can also have as many levels as you like.
	 *
	 * @param {String|Array} event
	 * @param {Function} callback
	 * @alias addListener
	 * @name on
	 * @api public
	 */

	EnhancedEmitter.prototype.on =
	EnhancedEmitter.prototype.addListener = function () {
	  var map = this._events || (this._events = {})
	    , ev = arguments[0]
	    , fn = arguments[1]
	    , evs = Array.isArray(ev)
	      ? ev.slice(0)
	      : ev.split(this._drip.delimeter)
	    , store = this._events || (this._events = {});

	  function iterate (events, map) {
	    var event = events.shift();
	    map[event] = map[event] || {};

	    if (events.length) {
	      iterate(events, map[event]);
	    } else {
	      if (!map[event]._) map[event]._= [ fn ];
	      else map[event]._.push(fn);
	    }
	  };

	  iterate(evs, store);
	  return this;
	};

	/**
	 * @import ./common.js#exports.many
	 * @api public
	 */

	EnhancedEmitter.prototype.many = common.many;

	/**
	 * @import ./common.js#exports.once
	 * @api public
	 */

	EnhancedEmitter.prototype.once = common.once;

	/**
	 * ### .off ([event], [callback])
	 *
	 * Unbind `callback` function from `event`. If no function
	 * is provided will unbind all callbacks from `event`. If
	 * no event is provided, event store will be purged.
	 *
	 * ```js
	 * emitter.off('event', callback);
	 * emitter.off('event:nested', callback);
	 * emitter.off([ 'event', 'nested' ], callback);
	 * ```
	 *
	 * @param {String|Array} event _optional_
	 * @param {Function} callback _optional_
	 * @alias removeListener
	 * @alias removeAllListeners
	 * @name off
	 * @api public
	 */

	EnhancedEmitter.prototype.off =
	EnhancedEmitter.prototype.removeListener =
	EnhancedEmitter.prototype.removeAllListeners = function (ev, fn) {
	  if (!this._events || arguments.length === 0) {
	    this._events = {};
	    return this;
	  }

	  var evs = Array.isArray(ev)
	      ? ev.slice(0)
	      : ev.split(this._drip.delimeter);

	  if (evs.length === 1 && !fn) {
	    if (this._events[ev]) this._events[ev]._ = null;
	    return this;
	  } else {
	    function isEmpty (obj) {
	      for (var name in obj)
	        if (obj[name] && name != '_') return false;
	      return true;
	    };

	    function clean (event) {
	      if (fn && 'function' === typeof fn) {
	        for (var i = 0; i < event._.length; i++)
	          if (fn == event._[i]) event._.splice(i, 1);
	        if (event._.length === 0) event._ = null;
	        if (event._ && event._.length == 1) event._ = event._[0];
	      } else {
	        event._ = null;
	      }

	      if (!event._ && isEmpty(event)) event = null;
	      return event;
	    };

	    function iterate (events, map) {
	      var event = events.shift();
	      if (map[event] && map[event]._ && !events.length) map[event] = clean(map[event]);
	      if (map[event] && events.length) map[event] = iterate(events, map[event]);
	      if (!map[event] && isEmpty(map)) map = null;
	      return map;
	    };

	    this._events = iterate(evs, this._events);
	  }

	  return this;
	};

	/**
	 * ### .emit (event[, args], [...])
	 *
	 * Trigger `event`, passing any arguments to callback functions.
	 *
	 * ```js
	 * emitter.emit('event', arg, ...);
	 * emitter.emit('event:nested', arg, ...);
	 * emitter.emit([ 'event', 'nested' ], arg, ...);
	 * ```
	 *
	 * @param {String} event name
	 * @param {Mixed} multiple parameters to pass to callback functions
	 * @name emit
	 * @api public
	 */

	EnhancedEmitter.prototype.emit = function () {
	  if (!this._events) return false;

	  var ev = arguments[0]
	    , evs = Array.isArray(ev)
	      ? ev.slice(0)
	      : ev.split(this._drip.delimeter)
	    , fns = traverse(evs, this._events);

	  if (!fns.length) return false;

	  var a;
	  for (var i = 0, l = fns.length; i < l; i++) {
	    if (arguments.length === 1) fns[i].call(this);
	    else if (arguments.length === 2) fns[i].call(this, arguments[1]);
	    else if (arguments.length === 3) fns[i].call(this, arguments[1], arguments[2]);
	    else {
	      if (!a) {
	        var la = arguments.length
	        a = Array(la - 1);
	        for (var i2 = 1; i2 < la; i2++) a[i2 - 1] = arguments[i2];
	      }
	      fns[i].apply(this, a);
	    }
	  }

	  return true;
	};

	/**
	 * ### .hasListener (ev[, function])
	 *
	 * Determine if an event has listeners. If a function
	 * is proved will determine if that function is a
	 * part of the listeners.
	 *
	 * @param {String|Array} event key to seach for
	 * @param {Function} optional function to check
	 * @returns {Boolean} found
	 * @name hasListeners
	 * @api public
	 */

	EnhancedEmitter.prototype.hasListener = function (ev, fn) {
	  if (!this._events) return false;
	  var evs = Array.isArray(ev)
	      ? ev.slice(0)
	      : ev.split(this._drip.delimeter)
	    , fns = traverse(evs, this._events);
	  if (fns.length === 0) return false;
	  return common.hasListener(fns, fn);
	};

	/**
	 * ### .listeners (ev)
	 *
	 * Retrieve an array of all of the listners for speciific
	 * event. Wildcard events will also be included.
	 *
	 * @param {String} event
	 * @return {Array} callbacks
	 * @name listeners
	 * @api public
	 */

	EnhancedEmitter.prototype.listeners = function (ev) {
	  if (!this._events) return [];
	  var evs = Array.isArray(ev)
	      ? ev.slice(0)
	      : ev.split(this._drip.delimeter)
	    , fns = traverse(evs, this._events);
	  return fns;
	};

	/**
	 * ### .bindEvent (event, target)
	 *
	 * A bound event will listen for events on the current emitter
	 * instance and emit them on the target when they occur. This
	 * functionality is compable with node event emitter. Wildcarded
	 * events on this instance will be emitted using the delimeter
	 * on the target.
	 *
	 * ```js
	 * emitter.bindEvent('request', target);
	 * emitter.bindEvent('server:request', target);
	 * emitter.bindEvent([ 'server', 'request' ], target);
	 * ```
	 *
	 * Note that proxies will also be removed if a generic `off` call
	 * is used.
	 *
	 * @param {String|Array} event key to bind
	 * @param {Object} target drip or node compatible event emitter
	 * @name bindEvent
	 * @api public
	 */

	EnhancedEmitter.prototype.bindEvent = common.bindEvent;

	/**
	 * ### .unbindEvent (event, target)
	 *
	 * Remove a bound event listener. Event and target
	 * must be provied the same as in `bindEvent`.
	 *
	 * ```js
	 * emitter.unbindEvent('request', target);
	 * emitter.unbindEvent('server:request', target);
	 * emitter.unbindEvent([ 'server', 'request' ], target);
	 * ```
	 *
	 * @param {String|Array} event key to bind
	 * @param {Object} target drip or node compatible event emitter
	 * @name unbindEvent
	 * @api public
	 */

	EnhancedEmitter.prototype.unbindEvent = common.unbindEvent;

	/**
	 * ### .proxyEvent (event, [namespace], target)
	 *
	 * An event proxy will listen for events on a different
	 * event emitter and emit them on the current drip instance
	 * when they occur. An optional namespace will be pre-pended
	 * to the event when they are emitted on the current drip
	 * instance.
	 *
	 * For example, the following will demonstrate a
	 * namspacing pattern for node.
	 *
	 * ```js
	 * function ProxyServer (port) {
	 *   Drip.call(this, { delimeter: ':' });
	 *   this.server = http.createServer().listen(port);
	 *   this.bindEvent('request', 'server', this.server);
	 * }
	 * ```
	 *
	 * Anytime `this.server` emits a `request` event, it will be
	 * emitted on the constructed ProxyServer as `server:request`.
	 * All arguments included in the original emit will also be
	 * available.
	 *
	 * ```js
	 * var proxy = new ProxyServer(8080);
	 *   proxy.on('server:request', function (req, res) {
	 *   // ..
	 * });
	 * ```
	 *
	 * If you decide to use the namespace option, you can namespace
	 * as deep as you like using either an array or a string that
	 * uses your delimeter. The following examples are valid.
	 *
	 * ```js
	 * emitter.proxyEvent('request', 'proxy:server', server);
	 * emitter.proxyEvent('request', [ 'proxy', 'server' ], server);
	 * emitter.on('proxy:server:request', cb);
	 * ```
	 *
	 * @param {String|Array} event key to proxy
	 * @param {String} namespace to prepend to this emit
	 * @param {Object} target event emitter
	 * @name proxyEvent
	 * @api public
	 */

	EnhancedEmitter.prototype.proxyEvent = common.proxyEvent;

	/**
	 * ### .unproxyEvent (event, [namespace], target)
	 *
	 * Remove an event proxy by removing the listening event
	 * from the target. Don't forget to include a namespace
	 * if it was used during `bindEvent`.
	 *
	 * ```js
	 * proxy.unbindEvent('request', proxy.server);
	 * proxy.unbindEvent('request', 'request', proxy.server);
	 * ```
	 *
	 * @param {String|Array} event key to proxy
	 * @param {String} namespace to prepend to this emit
	 * @param {Object} target event emitter
	 * @name unproxyEvent
	 * @api public
	 */

	EnhancedEmitter.prototype.unproxyEvent = common.unproxyEvent;

	/*!
	 * Traverse through a wildcard event tree
	 * and determine which callbacks match the
	 * given lookup. Recursive. Returns array
	 * of events at that level and all subsequent
	 * levels.
	 *
	 * @param {Array} event lookup
	 * @param {Object} events tree to search
	 * @api private
	 */

	function traverse (events, map) {
	  var event = events.shift()
	    , fns = [];

	  if (event !== '*' && map[event] && map[event]._ && !events.length) {
	    if ('function' == typeof map[event]._) fns.push(map[event]._);
	    else fns = concat(fns, map[event]._);
	  }

	  if (map['*'] && map['*']._ && !events.length) {
	    if ('function' == typeof map['*']._) fns.push(map['*']._);
	    else fns = concat(fns, map['*']._);
	  }

	  if (events.length && (map[event] || map['*'])) {
	    var l = events.length
	      , arr1 = Array(l)
	      , arr2 = Array(l);
	    for (var i = 0; i < l; i++) {
	      arr1[i] = events[i];
	      arr2[i] = events[i];
	    }
	    if (map[event]) {
	      var trav = traverse(arr1, map[event]);
	      fns = concat(fns, trav);
	    }
	    if (map['*']) {
	      var trav = traverse(arr2, map['*']);
	      fns = concat(fns, trav);
	    }
	  }

	  return fns;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	exports.isatty = function () { return false; };

	function ReadStream() {
	  throw new Error('tty.ReadStream is not implemented');
	}
	exports.ReadStream = ReadStream;

	function WriteStream() {
	  throw new Error('tty.ReadStream is not implemented');
	}
	exports.WriteStream = WriteStream;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(14);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(15);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * Electron - process.argv parsing
	 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module export
	 */

	module.exports = Args;

	/**
	 * ## Argument Parsing Utility
	 *
	 * The electron argument parser takes the node.js standard
	 * `process.argv` array and constructs an object with helpers
	 * that can easily be queried. This helper is publicly exposed
	 * so it can be used independant of the cli framework.
	 *
	 *     var electron = require('electron')
	 *       , argv = electron.argv(process.argv);
	 *
	 * When constructed, the electron argv parser recognizes three
	 * types command line arguments: _commands_, _modes_, and _parameters_.
	 *
	 * Each of these types also has a helper that will provide quick access
	 * to whether a _command_ or _mode_ is present, or the value of a _parameter_.
	 *
	 * ##### Commands
	 *
	 * Commands are the simplest of arguments. They are any arguments
	 * that are listed to that do not start with the `-` or `--` prefix.
	 * Essentially, they are a list of keys.
	 *
	 *     // $ node cli.js hello universe
	 *     argv.commands === [ 'hello', 'universe' ];
	 *
	 * ##### Modes
	 *
	 * Modes are also a non-value list of keys, but they can be expressed
	 * differently by using the `-` or `--` prefix. When using modes, if
	 * it begins with a single `-`, each letter will be parsed as its own mode.
	 *
	 *     // $ node cli.js --universe -abc
	 *     argv.modes === [ 'universe', 'a', 'b', 'c' ];
	 *
	 * ##### Parameters
	 *
	 * Paremeters are key:value pairs that are declared in a similiar manner
	 * as modes. They can be declared in any of the following ways.
	 *
	 *     // $ node cli.js --noun unverse -v say --topic=hello -w=now
	 *     argv.params === {
	 *         noun: 'universe'
	 *       , v: 'say'
	 *       , topic: 'hello'
	 *       , w: 'now'
	 *     };
	 *
	 * You can also specify paramters with multiple words by surrounding the
	 * phrase with double-quotes.
	 *
	 *     // $ node cli.js --say "hello universe"
	 *     argv.params === {
	 *       say: 'hello universe'
	 *     };
	 *
	 * @header Argument Parsing Utility
	 */

	function Args (args) {
	  /*!
	   * @param {Array} node.js compatible process.argv
	   */

	  this._raw = args;
	  this.commands = [];
	  this.modes = [];
	  this.params = {};
	  processArgs.call(this, args);
	}

	/**
	 * ### .command (cmd, [cmd], [...])
	 *
	 * The `command` helper takes a list of commands and will
	 * return `true` if any of them exist in the _commands_ list.
	 *
	 *     // node cli.js hello universe
	 *     var greeting = argv.command('hi', 'hello') // true
	 *       , world = argv.command('world', 'earth'); // false
	 *
	 * @param {String} command(s) to check
	 * @returns {Boolean} exists
	 * @name command
	 * @api public
	 */

	Args.prototype.command = filter('commands');

	/**
	 * ### .mode (mode, [mode], [...])
	 *
	 * The `mode` helper takes a list of modes and will
	 * return `true` if any of them exist in the _modes_ list.
	 *
	 *     // node cli.js --hello -abc
	 *     var greeting = argv.mode('h', 'hello') // true
	 *       , world = argv.mode('w', 'world'); // false
	 *
	 * @param {String} mode(s) to check
	 * @returns {Boolean} exists
	 * @name mode
	 * @api public
	 */

	Args.prototype.mode = filter('modes');

	/**
	 * ### .param (param, [param], [...])
	 *
	 * The `param` helper takes a list of parameters and will
	 * return the value of the first parameter that matches, or
	 * `null` if none of the parameters exist in the _params_ list.
	 *
	 *     // node cli.js --hello universe
	 *     var greeting = argv.param('h', 'hello') // 'universe'
	 *       , world = argv.param('w', 'world'); // null
	 *
	 * @param {String} mode(s) to check
	 * @returns {String|null} value of first matching parameter
	 * @name param
	 * @api public
	 */

	Args.prototype.param = filter('params');

	/*!
	 * ### processArgs (args)
	 *
	 * Take the raw node.js args array and parse out
	 * commands, modes, and parameters. Per node standard,
	 * the first two elements are considered to be the executor
	 * and file and irrelevant.
	 *
	 * @param {Array} process.argv
	 * @ctx Args
	 * @api private
	 */

	function processArgs (args) {
	  var param_key = null
	    , parts = args.slice(2)
	    , input = this
	    , isStr = false;

	  function checkParamKey () {
	    if (param_key !== null) {
	      input.modes.push(param_key);
	      param_key = null;
	    }
	  }

	  function appendStr (key, str) {
	    input.params[key] += ' ' + str;
	  }

	  parts.forEach(function (part) {
	    if (part.substr(0, 2) === '--') {
	      checkParamKey();
	      if (part.indexOf('=') !== -1) {
	        part = part.substr(2).split('=', 2);
	        return input.params[part[0]] = part[1]
	      }

	      return param_key = part.substr(2);
	    }

	    if (part[0] === '-') {
	      checkParamKey();
	      var sstr = part.substr(1);
	      if (sstr.length > 1) {
	        if (part.indexOf('=') !== -1) {
	          part = part.substr(1).split('=', 2);
	          return input.params[part[0]] = part[1]
	        }
	        for (var i = 0; i < sstr.length; i++)
	          input.modes.push(sstr[i]);
	        return;
	      } else {
	        return param_key = part.substr(1);
	      }
	    }

	    part = Number(part) || part

	    if (param_key !== null) {
	      if (part[0] === '"') {
	        isStr = true;
	        input.params[param_key] = part.substr(1);
	      } else if (isStr && part[part.length - 1] === '"') {
	        isStr = false;
	        appendStr(param_key, part.substr(0, part.length - 1));
	        param_key = null;
	      } else if (isStr) {
	        appendStr(param_key, part);
	      } else {
	        input.params[param_key] = part;
	        param_key = null;
	      }
	    } else {
	      input.commands.push(part);
	    }
	  });

	  checkParamKey();
	}

	/*!
	 * ### filter (which)
	 *
	 * Constructs a helper function for each of the
	 * three types of process.argv types. Returns function
	 * to be mounted on to the Arg.prototype.
	 *
	 * @param {String} which argument type
	 * @returns {Function}
	 * @api private
	 */

	function filter (which) {
	  return function () {
	    var self = this
	      , modes = Array.prototype.slice.call(arguments)
	      , res = Array.isArray(this[which])
	        ? false
	        : null;

	    function check (el) {
	      if (Array.isArray(self[which])) {
	        return self[which].indexOf(el) > -1
	          ? true
	          : null;
	      } else {
	        return 'undefined' !== typeof self[which][el]
	          ? self[which][el]
	          : null;
	      }
	    }

	    for (var i = 0; i < modes.length; i++) {
	      var val = check(modes[i]);
	      if (val && !res) res = val;
	    }

	    return res;
	  };
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*!
	 * Electron - command constructor
	 * Copyright (c) 2012 Jake Luer <jake@alogicalpardox.com>
	 * MIT Licensed
	 */

	/*!
	 * Main export
	 */

	module.exports = Command;

	/**
	 * ## Constructing Commands
	 *
	 * Once you have decided to construct a command through `program.command`
	 * you will be returned a command object that you can manipulate through
	 * chainable methods.
	 *
	 * @header Constructing Commands
	 */

	function Command (cmd) {
	  this.opts = {
	      cmd: cmd
	    , desc: ''
	    , options: []
	    , action: function () {}
	  }
	}

	/**
	 * ### .desc (description)
	 *
	 * Provide a description for this command to be used when
	 * being display in help.
	 *
	 *     program
	 *       .command('hello universe')
	 *       .desc('Say "Hello" to the Universe.');
	 *
	 * @param {String} description
	 * @returns `command` for chaining
	 * @name desc
	 * @api public
	 */

	Command.prototype.desc = function (desc) {
	  this.opts.desc = desc;
	  return this;
	};

	/*!
	 * legacy support
	 */

	Command.prototype.description = Command.prototype.desc;

	/**
	 * ### .option (opts, description, required)
	 *
	 * You may define any number of options for
	 * each command. The `opts` string expects a comma delimited
	 * list of commands with an optional default value or
	 * indicator surrounded by brackets. You may
	 * also provide a description of the option and whether
	 * it is required.
	 *
	 * This command may be called multiple times to define multiple
	 * options.
	 *
	 *     program
	 *       .command('build')
	 *       .option('-m, --minify', 'Flag to build minify version')
	 *       .option('-f, --file [build.js]', 'Save filename', true);
	 *
	 * @param {String} options to parse
	 * @param {String} description
	 * @param {Boolean} required. defaults to false
	 * @returns `command` for chaining
	 * @name option
	 * @api public
	 */

	Command.prototype.option = function (opt, desc, required) {
	  var opts = prepareOptions(opt);

	  this.opts.options.push({
	      opts: opts
	    , desc: desc
	    , required: ('boolean' === typeof required)
	      ? required
	      : false
	  });

	  return this;
	};

	/**
	 * ### .action (function)
	 *
	 * Provide the action to be used should this command be
	 * called. The function will receive one parameter of the
	 * parsed process.argv object. Multiple calls to `action` will
	 * replace the previous defined action.
	 *
	 *     program
	 *       .command('build')
	 *       .action(function (argv) {
	 *         var minify = argv.mode('m', 'minify')
	 *           , file = argv.param('f', 'file');
	 *         // go!
	 *       });
	 *
	 * @param {Function} action to perform
	 * @returns `command` for chaining
	 * @name action
	 * @api public
	 */

	Command.prototype.action = function (fn) {
	  if ('function' === typeof fn)
	    this.opts.action = fn;
	  return this;
	};

	/*!
	 * prepareOptions (string)
	 *
	 * Parse the parameter string provide as an option
	 * list in `option`. Returns an object that can be
	 * explored during help dislay.
	 *
	 * @param {String} options
	 * @returns {Object} parsed
	 * @api private
	 */

	function prepareOptions (str) {
	  var list = str.split(' ')
	    , res = { flags: [], def: null }
	    , m;

	  list.forEach(function (line) {
	    // remove trailing commas
	    if (line[line.length - 1] === ',')
	      line = line.substr(0, line.length - 1);

	    // parse out flags and default value
	    if (line.substr(0, 2) === '--')
	      res.flags.push(line.substr(2));
	    else if (line[0] === '-')
	      res.flags.push(line.substr(1));
	    else if (m = line.match(/[^\[\]]+(?=\])/g))
	      if (!res.def) res.def= m[0];
	  });

	  return res;
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Electron - theme loader
	 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * expose clean theme
	 */

	exports.clean = __webpack_require__(19);

	/*!
	 * expose simple theme
	 */

	exports.simple = __webpack_require__(20);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Electron - clean theme
	 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * main export - theme display
	 */

	module.exports = function cleanHelp (spec) {
	  // parse specs
	  spec = spec || {};
	  spec.prefix = spec.prefix || '';

	  // colors
	  this.colorize(spec.noColor || false);

	  // helper function and variables
	  var l = function (s) { console.log(spec.prefix.cyan+ '  ' + (s || '')); }
	    , pad = function (s, w) { return Array(w - s.length - 1).join(' ') + s; }
	    , name = this.opts.name
	    , base = this.opts.base;

	  // header
	  l();
	  l(name.cyan + ' ' + this.opts.version);
	  if (this.opts.desc) l(this.opts.desc.gray);

	  // commmand display
	  this.commands.forEach(function (cmd) {
	    // we don't display absent command
	    if (cmd.opts.cmd === 'absent') return;

	    // hlper variables
	    var c = cmd.opts
	      , command = c.cmd !== 'default' ? c.cmd + ' ' : ''
	      , opts = c.options.length ? '<options>' : '';

	    // main lines
	    l();
	    l(base.gray + ' ' + command.green + opts);
	    if (c.desc.length) l(pad('', 4) + c.desc.blue);
	    if (!c.options.length) return;

	    // if there are options ...
	    c.options.forEach(function (opt) {
	      var n = c.desc.length ? 6 : 4
	        , opts = opt.opts.flags.map(function (flag) {
	            if (flag.length === 1) return '-' + flag;
	            else return '--' + flag;
	          });

	      l(pad('', n) + opts.join(', ')
	        + (opt.opts.def ? ' [' + opt.opts.def + ']' : '' )
	        + ' ' + opt.desc.gray);
	    });
	  });

	  // all done
	  l();
	  process.exit();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Electron - simple theme
	 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * main export - theme display
	 */

	module.exports = function cleanHelp (spec) {
	  // parse specs
	  spec = spec || {};
	  spec.prefix = spec.prefix || '';
	  spec.command = spec.command || 'default';
	  spec.usage = spec.usage || '<options>';

	  // colors!
	  this.colorize(spec.noColor || false);

	  // helper function and variables
	  var l = function (s) { console.log(spec.prefix.cyan + '  ' + (s || '')); }
	    , pad = function (s, w) { return s + Array(w - s.length - 1).join(' '); }
	    , name = this.opts.name
	    , base = this.opts.base;

	  // header
	  l();
	  l(name.cyan + ' ' + this.opts.version);
	  if (this.opts.desc) l(this.opts.desc.gray);

	  // get the command
	  var command = this.commands.filter(function (cmd) {
	    return (cmd.opts.cmd === spec.command) ? true : false;
	  })[0];

	  // check for command
	  if (!command) {
	    l('Invalid command identified for help.'.red);
	    l();
	    process.exit();
	  }

	  // comamnd usage
	  l();
	  l('Usage: '.green + base.gray + ' ' + spec.usage);
	  l();
	  l('Options:'.magenta);
	  l();

	  // iterate through options
	  command.opts.options.forEach(function (opt) {
	    var opts = opt.opts.flags.map(function (flag) {
	      if (flag.length === 1) return '-' + flag;
	      else return '--' + flag;
	    });

	    l(pad('', 4)
	      + pad(
	          opts.join(', ')
	          + (opt.opts.def ? ' [' + opt.opts.def + ']' : '' )
	        , 26)
	      + ' ' + opt.desc.gray);
	  });

	  // all done
	  l();
	  l(command.opts.desc.blue);
	  l();
	  process.exit();
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);