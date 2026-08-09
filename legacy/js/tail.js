/*
 * Copyright (C) 2006 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain a
 * copy of the License at
 * 
 * https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
window.PR_SHOULD_USE_CONTINUATION = true;
window.PR_TAB_WIDTH = 8;
window.PR_normalizedHtml = window.PR = window.prettyPrintOne = window.prettyPrint = void 0;
window._pr_isIE6 = function() {
	var c = navigator && navigator.userAgent
			&& navigator.userAgent.match(/\bMSIE ([678])\./);
	c = c ? +c[1] : false;
	window._pr_isIE6 = function() {
		return c
	};
	return c
};
window.ASNLAB_langCode = {
	en : "English",
	"zh-CN" : "\u4e2d\u6587 (\u7b80\u4f53)",
};
window.ASNLAB_prodLang = [
		{
			url : "/appengine/",
			langloc : [ "en", "zh-CN"]
		}
];
(function() {
	var c = /\/\/([^\/]*)?(\/intl\/[^\/]*)?(\/.*)?/, a = /\/intl\/(([a-zA-Z]+)(-[a-zA-Z]+)?)(_[a-zA-Z]+)?/, g = a.exec(window.location.href);
	if (g == null) {
		window.ASNLAB_langLoc = "en";
		window.ASNLAB_langUrl = ""
	} else {
		window.ASNLAB_langLoc = g[1];
		window.ASNLAB_langUrl = g[0].replace(/_ALL/, "")
	}
	jQuery(document).ready(
					window.ASNLAB_langSelectInit = function(b, d) {
						var e = b("#lang-dropdown")[0];
						if (e) {
							var i = null;
							d = d || window.location;
							d = c.exec(d.href);
							for ( var k = 0; k < window.ASNLAB_prodLang.length; k++)
								if (d[3].indexOf(window.ASNLAB_prodLang[k].url) >= 0) {
									i = window.ASNLAB_prodLang[k].langloc;
									break
								}
							i || (i = [ "en", "zh-CN" ]);
							e = new Menu(e, null, null, function() {
								ASNLAB_click("/gb/sc/langselect/" + ASNLAB_langLoc)
							});
							for (d = 0; d < i.length; d++) {
								k = i[d];
								var r = ASNLAB_localeRedirect(k,
										window.location, false);
								e.addItem(window.ASNLAB_langCode[k], r)
							}
							b("body").append(e.menu)
						}
					});
	window.ASNLAB_localeRedirect = function(b, d, e) {
		d = d || window.location;
		var i = c.exec(d.href);
		e = e == null ? true : false;
		var k = d.href;
		if (i) {
			k = i[3] ? "https://" + i[1] + "/intl/" + b + i[3] : "https://"
					+ i[1] + "/intl/" + b + "/";
			if (e)
				d.href = k
		}
		//return k;

		// Modified by HZR
		if(i[3]) {
			var index = i[1].indexOf(".");
			var f = i[1].substring(index, i[1].length);
			return "https://" + b + f + i[3];
		}
		else {
			return "https://" + b + f + "/";
		}
	};
	window.ASNLAB_redirectToI18nContent = function(b, d) {
		d = d || ASNLAB_localeRedirect;
		b = (b = a.exec(b.href)) && b[1] || "en";
		d(b, null);
		return false
	}
})(jQuery);
(function() {
	function c(a) {
		this.parentElem = a.parent;
		this.controlsElem = a.controls;
		this.contentElem = a.content;
		if (!(!this.parentElem || !this.controlsElem || !this.contentElem)) {
			c.active[this.index = c.active.length] = this;
			var g = this;
			this.toggleElem = jQuery('<img src="images/cleardot.gif">')
					.addClass("collapsible-control").mouseover(function() {
						var b = jQuery(this);
						b.addClass("collapsible-hover")
					}).mouseout(function() {
						var b = jQuery(this);
						b.removeClass("collapsible-hover")
					});
			this.controlsElem.mousedown(function() {
				var b = jQuery(g.toggleElem), d = jQuery(g.contentElem);
				if (d.is(":visible")) {
					b.addClass("collapsible-plus").removeClass(
							"collapsible-minus");
					d.hide()
				} else {
					b.addClass("collapsible-minus").removeClass(
							"collapsible-plus");
					d.show()
				}
			});
			if (this.parentElem.is(".closed"))
				a.opened = false;
			if (this.parentElem.is(".opened"))
				a.opened = true;
			if (a.opened === true)
				this.toggleElem.addClass("collapsible-minus");
			else {
				this.toggleElem.addClass("collapsible-plus");
				this.contentElem.hide()
			}
			this.controlsElem.prepend(this.toggleElem);
			this.parentElem.addClass("collapsible-done")
		}
	}
	c.prototype = {
		index : -1,
		parentElem : null,
		controlsElem : null,
		contentElem : null,
		toggleElem : null
	};
	jQuery.extend(c, {
		active : [],
		convert : function() {
			for ( var a = jQuery(".collapsible"), g = 0; g < a.length; g++)
				if (a[g].className.indexOf("collapsible-done") == -1) {
					var b = jQuery(".collapsible-controls", a[g]), d = jQuery(
							".collapsible-content", a[g]);
					b.length && d.length && new c({
						parent : jQuery(a[g]),
						controls : b,
						content : d
					})
				}
		}
	});
	window.ASNLAB_collapsible = c;
	jQuery(function() {
		ASNLAB_collapsible.convert()
	})
})();
