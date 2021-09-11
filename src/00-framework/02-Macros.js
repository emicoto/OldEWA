/**
 * Define macro, passing arguments to function and store them in $args, preserving & restoring previous $args
 */
 function DefineMacro(macroName, macroFunction, tags, skipArgs) {
	Macro.add(macroName, {
		isWidget: true,
		tags: tags,
		skipArgs: skipArgs,
		handler: function () {
			EWA.Perflog.logWidgetStart(macroName);
			try {
				var oldArgs = State.variables.args;
				State.variables.args = this.args.slice();
				macroFunction.apply(this, this.args);
				if (typeof oldArgs === 'undefined') {
					delete State.variables.args;
				} else {
					State.variables.args = oldArgs;
				}
			} finally {
				EWA.Perflog.logWidgetEnd(macroName);
			}
		}
	});
}

/**
 * Define macro, where macroFunction returns text to wikify & print
 */
 function DefineMacroS(macroName, macroFunction, tags, skipArgs, maintainContext) {
	DefineMacro(macroName, function () {
		$(this.output).wiki(macroFunction.apply(maintainContext ? this : null, this.args))
	}, tags, skipArgs);
}

window.wikifier = function (widget, arg1, arg2, arg3) {
	if (arg3 !== undefined) {
		new Wikifier(null, '<<' + widget + ' ' + arg1 + ' ' + arg2 + ' ' + arg3 + '>>');
	}
	else if (arg2 !== undefined) {
		new Wikifier(null, '<<' + widget + ' ' + arg1 + ' ' + arg2 + '>>');
	}
	else if (arg1 !== undefined) {
		new Wikifier(null, '<<' + widget + ' ' + arg1 + '>>');
	}
	else if (arg1 === undefined) {
		new Wikifier(null, '<<' + widget + '>>');
	}
}

window.wikifier2 = function (str) {
	new Wikifier(null, str);
}

/*
 * Similar to <<script>>, but preprocesses the contents, so $variables are accessible.
 * The variable "output" is also exposed (unlike <<run>>, <<set>>)
 *
 * Example:
 * <<twinescript>>
 *     output.textContent = $text
 * <</twinescript>>
 */
Macro.add('twinescript', {
	skipArgs : true,
	tags     : null,

	handler() {
		const output = document.createDocumentFragment();

		try {
			Scripting.evalTwineScript(this.payload[0].contents, output);
		}
		catch (ex) {
			return this.error(`bad evaluation: ${typeof ex === 'object' ? ex.message : ex}`);
		}

		// Custom debug view setup.
		if (Config.debug) {
			this.createDebugView();
		}

		if (output.hasChildNodes()) {
			this.output.appendChild(output);
		}
	}
});

/*
 * Usage:
 * <<radiovar VARNAME VALUE [LABEL]>> ONCHANGE <</radiovar>>
 *
 * Will display a radiobutton, optionally labeled, that corresponds
 * to state variable VARNAME having value VALUE.
 *
 * When var value is set to this value, silently execute ONCHANGE
 */
Macro.add("radiovar", {
	tags: null,
	handler: function() {
		if (this.args.length < 2) return this.error("missing <<radiovar>> arguments");
		var varname = this.args[0];
		var value = this.args[1];
		var content = this.payload[0].contents;
		var e = $("<input>")
			.attr({
				name: "radiovar"+Util.slugify(varname),
				id: "radiovar"+Util.slugify(varname)+"-"+Util.slugify(value),
				tabindex: 0,
				type: "radio"
			})
			.prop("checked", State.getVar(varname) ==  value)
			.addClass("macro-radiovar")
			.on('change.macros', function () {
				if (this.checked) {
					State.setVar(varname, value);
					Wikifier.wikifyEval(content);
				}
			});
		if (this.args[2]) e = $("<label>").append(this.args[2], e);
		e.appendTo(this.output);
	}
});


function updatehistorycontrols(){
	if (V.maxStates === undefined || V.maxStates > 20) {
		/* initiate new variable based on engine config and limit it to 20 */
		V.maxStates = Math.clamp(1, 20, Config.history.maxStates);
	}
	if (V.maxStates == 1) {
		/* when disabled, irreversibly delete history controls the way sugarcube intended */
		Config.history.maxStates = 1;
		jQuery('#ui-bar-history').remove();
	} else {
		/* set actual maxStates in accordance with our new variable */
		Config.history.maxStates = V.maxStates;
		/* ensure that controls are enabled so sugarcube won't destroy them on reload */
		Config.history.controls = true;
		/* if irreversibly deleted, restore #ui-bar-history from oblivion and pop it after #ui-bar-toggle */
		if (jQuery("#ui-bar-history").length == 0){
			jQuery("#ui-bar-toggle").after(`
				<div id="ui-bar-history">
					<button id="history-backward" tabindex="0" title="'+t+'" aria-label="'+t+'">\uE821</button>
					<button id="history-jumpto" tabindex="0" title="'+r+'" aria-label="'+r+'">\uE839</button>
					<button id="history-forward" tabindex="0" title="'+n+'" aria-label="'+n+'">\uE822</button>
				</div>`);
			/* make buttons active/inactive based on the available history states */
			jQuery(document).on(':historyupdate.ui-bar', (($backward, $forward) => () => {
					$backward.ariaDisabled(State.length < 2);
					$forward.ariaDisabled(State.length === State.size);
				})(jQuery('#history-backward'), jQuery('#history-forward')));
			/* update uibar to accept it's new masters */
			UIBar.start();
		}
		jQuery("#ui-bar-history").show();
	}
}
DefineMacro("updatehistorycontrols", updatehistorycontrols);