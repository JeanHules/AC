window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    arguments.callee = arguments.callee.caller;
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments))
    }
};
(function (e) {
    function h() {}
    for (var g = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), f; f = g.pop();) {
        e[f] = e[f] || h
    }
})(window.console = window.console || {});
(function (n, g, j) {
    var p = function (v) {
            return v.charAt(0).toUpperCase() + v.slice(1)
        };
    var s = "Moz Webkit O Ms".split(" ");
    var o = function (z) {
            var y = document.documentElement.style,
                w;
            if (typeof y[z] === "string") {
                return z
            }
            z = p(z);
            for (var x = 0, v = s.length; x < v; x++) {
                w = s[x] + z;
                if (typeof y[w] === "string") {
                    return w
                }
            }
        };
    var d = o("transform"),
        t = o("transitionProperty");
    /*!
     * Modernizr v1.6ish: miniModernizr for Isotope
     * http://www.modernizr.com
     *
     * Developed by: 
     * - Faruk Ates  http://farukat.es/
     * - Paul Irish  http://paulirish.com/
     *
     * Copyright (c) 2009-2010
     * Dual-licensed under the BSD or MIT licenses.
     * http://www.modernizr.com/license/
     */
    var k = {
        csstransforms: function () {
            return !!d
        },
        csstransforms3d: function () {
            var z = !! o("perspective");
            if (z) {
                var w = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                    y = "@media (" + w.join("transform-3d),(") + "modernizr)",
                    x = g("<style>" + y + "{#modernizr{height:3px}}</style>").appendTo("head"),
                    v = g('<div id="modernizr" />').appendTo("html");
                z = v.height() === 3;
                v.remove();
                x.remove()
            }
            return z
        },
        csstransitions: function () {
            return !!t
        }
    };
    if (n.Modernizr) {
        for (var l in k) {
            if (!Modernizr.hasOwnProperty(l)) {
                Modernizr.addTest(l, k[l])
            }
        }
    } else {
        n.Modernizr = (function () {
            var y = {
                _version: "1.6ish: miniModernizr for Isotope"
            },
                x = " ",
                w, v;
            for (v in k) {
                w = k[v]();
                y[v] = w;
                x += " " + (w ? "" : "no-") + v
            }
            g("html").addClass(x);
            return y
        })()
    }
    if (Modernizr.csstransforms) {
        var f = Modernizr.csstransforms3d ? {
            translate: function (v) {
                return "translate3d(" + v[0] + "px, " + v[1] + "px, 0) "
            },
            scale: function (v) {
                return "scale3d(" + v + ", " + v + ", 1) "
            }
        } : {
            translate: function (v) {
                return "translate(" + v[0] + "px, " + v[1] + "px) "
            },
            scale: function (v) {
                return "scale(" + v + ") "
            }
        };
        var r = function (y, w, D) {
                var B = g.data(y, "isoTransform") || {},
                    F = {},
                    x, z = {},
                    C;
                F[w] = D;
                g.extend(B, F);
                for (x in B) {
                    C = B[x];
                    z[x] = f[x](C)
                }
                var A = z.translate || "",
                    E = z.scale || "",
                    v = A + E;
                g.data(y, "isoTransform", B);
                y.style[d] = v
            };
        g.cssNumber.scale = true;
        g.cssHooks.scale = {
            set: function (v, w) {
                r(v, "scale", w)
            },
            get: function (x, w) {
                var v = g.data(x, "isoTransform");
                return v && v.scale ? v.scale : 1
            }
        };
        g.fx.step.scale = function (v) {
            g.cssHooks.scale.set(v.elem, v.now + v.unit)
        };
        g.cssNumber.translate = true;
        g.cssHooks.translate = {
            set: function (v, w) {
                r(v, "translate", w)
            },
            get: function (x, w) {
                var v = g.data(x, "isoTransform");
                return v && v.translate ? v.translate : [0, 0]
            }
        }
    }
    var c, b;
    if (Modernizr.csstransitions) {
        c = {
            WebkitTransitionProperty: "webkitTransitionEnd",
            MozTransitionProperty: "transitionend",
            OTransitionProperty: "oTransitionEnd",
            transitionProperty: "transitionEnd"
        }[t];
        b = o("transitionDuration")
    }
    var m = g.event,
        e;
    m.special.smartresize = {
        setup: function () {
            g(this).bind("resize", m.special.smartresize.handler)
        },
        teardown: function () {
            g(this).unbind("resize", m.special.smartresize.handler)
        },
        handler: function (y, v) {
            var x = this,
                w = arguments;
            y.type = "smartresize";
            if (e) {
                clearTimeout(e)
            }
            e = setTimeout(function () {
                jQuery.event.handle.apply(x, w)
            }, v === "execAsap" ? 0 : 100)
        }
    };
    g.fn.smartresize = function (v) {
        return v ? this.bind("smartresize", v) : this.trigger("smartresize", ["execAsap"])
    };
    g.Isotope = function (v, w, x) {
        this.element = g(w);
        this._create(v);
        this._init(x)
    };
    var h = ["overflow", "position", "width", "height"];
    var q = g(n);
    g.Isotope.settings = {
        resizable: true,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
            opacity: 0,
            scale: 0.001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        animationEngine: "best-available",
        animationOptions: {
            queue: false,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: true,
        resizesContainer: true,
        transformsEnabled: !g.browser.opera,
        itemPositionDataEnabled: false
    };
    g.Isotope.prototype = {
        _create: function (z) {
            this.options = g.extend({}, g.Isotope.settings, z);
            this.styleQueue = [];
            this.elemCount = 0;
            var x = this.element[0].style;
            this.originalStyle = {};
            for (var A = 0, w = h.length; A < w; A++) {
                var B = h[A];
                this.originalStyle[B] = x[B] || ""
            }
            this.element.css({
                overflow: "hidden",
                position: "relative"
            });
            this._updateAnimationEngine();
            this._updateUsingTransforms();
            var y = {
                "original-order": function (D, C) {
                    C.elemCount++;
                    return C.elemCount
                },
                random: function () {
                    return Math.random()
                }
            };
            this.options.getSortData = g.extend(this.options.getSortData, y);
            this.reloadItems();
            this.offset = {
                left: parseInt(this.element.css("padding-left"), 10),
                top: parseInt(this.element.css("padding-top"), 10)
            };
            var v = this;
            setTimeout(function () {
                v.element.addClass(v.options.containerClass)
            }, 0);
            if (this.options.resizable) {
                q.bind("smartresize.isotope", function () {
                    v.resize()
                })
            }
            this.element.delegate("." + this.options.hiddenClass, "click", function () {
                return false
            })
        },
        _getAtoms: function (y) {
            var v = this.options.itemSelector,
                x = v ? y.filter(v).add(y.find(v)) : y,
                w = {
                    position: "absolute"
                };
            if (this.usingTransforms) {
                w.left = 0;
                w.top = 0
            }
            x.css(w).addClass(this.options.itemClass);
            this.updateSortData(x, true);
            return x
        },
        _init: function (v) {
            this.$filteredAtoms = this._filter(this.$allAtoms);
            this._sort();
            this.reLayout(v)
        },
        option: function (x) {
            if (g.isPlainObject(x)) {
                this.options = g.extend(true, this.options, x);
                var v;
                for (var w in x) {
                    v = "_update" + p(w);
                    if (this[v]) {
                        this[v]()
                    }
                }
            }
        },
        _updateAnimationEngine: function () {
            var w = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "");
            var v;
            switch (w) {
            case "css":
            case "none":
                v = false;
                break;
            case "jquery":
                v = true;
                break;
            default:
                v = !Modernizr.csstransitions
            }
            this.isUsingJQueryAnimation = v;
            this._updateUsingTransforms()
        },
        _updateTransformsEnabled: function () {
            this._updateUsingTransforms()
        },
        _updateUsingTransforms: function () {
            var v = this.usingTransforms = this.options.transformsEnabled && Modernizr.csstransforms && Modernizr.csstransitions && !this.isUsingJQueryAnimation;
            if (!v) {
                delete this.options.hiddenStyle.scale;
                delete this.options.visibleStyle.scale
            }
            this.getPositionStyles = v ? this._translate : this._positionAbs
        },
        _filter: function (B) {
            var x = this.options.filter === "" ? "*" : this.options.filter;
            if (!x) {
                return B
            }
            var A = this.options.hiddenClass,
                w = "." + A,
                z = B.filter(w),
                v = z;
            if (x !== "*") {
                v = z.filter(x);
                var y = B.not(w).not(x).addClass(A);
                this.styleQueue.push({
                    $el: y,
                    style: this.options.hiddenStyle
                })
            }
            this.styleQueue.push({
                $el: v,
                style: this.options.visibleStyle
            });
            v.removeClass(A);
            return B.filter(x)
        },
        updateSortData: function (A, x) {
            var w = this,
                y = this.options.getSortData,
                z, v;
            A.each(function () {
                z = g(this);
                v = {};
                for (var B in y) {
                    if (!x && B === "original-order") {
                        v[B] = g.data(this, "isotope-sort-data")[B]
                    } else {
                        v[B] = y[B](z, w)
                    }
                }
                g.data(this, "isotope-sort-data", v)
            })
        },
        _sort: function () {
            var y = this.options.sortBy,
                x = this._getSorter,
                v = this.options.sortAscending ? 1 : -1,
                w = function (C, B) {
                    var A = x(C, y),
                        z = x(B, y);
                    if (A === z && y !== "original-order") {
                        A = x(C, "original-order");
                        z = x(B, "original-order")
                    }
                    return ((A > z) ? 1 : (A < z) ? -1 : 0) * v
                };
            this.$filteredAtoms.sort(w)
        },
        _getSorter: function (v, w) {
            return g.data(v, "isotope-sort-data")[w]
        },
        _translate: function (v, w) {
            return {
                translate: [v, w]
            }
        },
        _positionAbs: function (v, w) {
            return {
                left: v,
                top: w
            }
        },
        _pushPosition: function (z, w, A) {
            w += this.offset.left;
            A += this.offset.top;
            var v = this.getPositionStyles(w, A);
            this.styleQueue.push({
                $el: z,
                style: v
            });
            if (this.options.itemPositionDataEnabled) {
                z.data("isotope-item-position", {
                    x: w,
                    y: A
                })
            }
        },
        layout: function (y, x) {
            var w = this.options.layoutMode;
            this["_" + w + "Layout"](y);
            if (this.options.resizesContainer) {
                var v = this["_" + w + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: v
                })
            }
            this._processStyleQueue(y, x);
            this.isLaidOut = true
        },
        _processStyleQueue: function (w, I) {
            var y = !this.isLaidOut ? "css" : (this.isUsingJQueryAnimation ? "animate" : "css"),
                B = this.options.animationOptions,
                G, z, D, E;
            z = function (J, K) {
                K.$el[y](K.style, B)
            };
            if (this._isInserting && this.isUsingJQueryAnimation) {
                z = function (J, K) {
                    G = K.$el.hasClass("no-transition") ? "css" : y;
                    K.$el[G](K.style, B)
                }
            } else {
                if (I) {
                    var x = false,
                        H = this;
                    D = true;
                    E = function () {
                        if (x) {
                            return
                        }
                        I.call(H.element, w);
                        x = true
                    };
                    if (this.isUsingJQueryAnimation && y === "animate") {
                        B.complete = E;
                        D = false
                    } else {
                        if (Modernizr.csstransitions) {
                            var C = 0,
                                F = this.styleQueue[0].$el,
                                v;
                            while (!F.length) {
                                v = this.styleQueue[C++];
                                if (!v) {
                                    return
                                }
                                F = v.$el
                            }
                            var A = parseFloat(getComputedStyle(F[0])[b]);
                            if (A > 0) {
                                z = function (J, K) {
                                    K.$el[y](K.style, B).one(c, E)
                                };
                                D = false
                            }
                        }
                    }
                }
            }
            g.each(this.styleQueue, z);
            if (D) {
                E()
            }
            this.styleQueue = []
        },
        resize: function () {
            if (this["_" + this.options.layoutMode + "ResizeChanged"]()) {
                this.reLayout()
            }
        },
        reLayout: function (v) {
            this["_" + this.options.layoutMode + "Reset"]();
            this.layout(this.$filteredAtoms, v)
        },
        addItems: function (w, x) {
            var v = this._getAtoms(w);
            this.$allAtoms = this.$allAtoms.add(v);
            if (x) {
                x(v)
            }
        },
        insert: function (w, x) {
            this.element.append(w);
            var v = this;
            this.addItems(w, function (y) {
                var z = v._filter(y);
                v._addHideAppended(z);
                v._sort();
                v.reLayout();
                v._revealAppended(z, x)
            })
        },
        appended: function (w, x) {
            var v = this;
            this.addItems(w, function (y) {
                v._addHideAppended(y);
                v.layout(y);
                v._revealAppended(y, x)
            })
        },
        _addHideAppended: function (v) {
            this.$filteredAtoms = this.$filteredAtoms.add(v);
            v.addClass("no-transition");
            this._isInserting = true;
            this.styleQueue.push({
                $el: v,
                style: this.options.hiddenStyle
            })
        },
        _revealAppended: function (w, x) {
            var v = this;
            setTimeout(function () {
                w.removeClass("no-transition");
                v.styleQueue.push({
                    $el: w,
                    style: v.options.visibleStyle
                });
                v._isInserting = false;
                v._processStyleQueue(w, x)
            }, 10)
        },
        reloadItems: function () {
            this.$allAtoms = this._getAtoms(this.element.children())
        },
        remove: function (x) {
            var v = this;
            var w = function () {
                    v.$allAtoms = v.$allAtoms.not(x);
                    x.remove()
                };
            if (x.filter(":not(." + this.options.hiddenClass + ")").length) {
                this.styleQueue.push({
                    $el: x,
                    style: this.options.hiddenStyle
                });
                this.$filteredAtoms = this.$filteredAtoms.not(x);
                this._sort();
                this.reLayout(w)
            } else {
                w()
            }
        },
        shuffle: function (v) {
            this.updateSortData(this.$allAtoms);
            this.options.sortBy = "random";
            this._sort();
            this.reLayout(v)
        },
        destroy: function () {
            var z = this.usingTransforms;
            var x = this.options;
            this.$allAtoms.removeClass(x.hiddenClass + " " + x.itemClass).each(function () {
                var B = this.style;
                B.position = "";
                B.top = "";
                B.left = "";
                B.opacity = "";
                if (z) {
                    B[d] = ""
                }
            });
            var w = this.element[0].style;
            for (var y = 0, v = h.length; y < v; y++) {
                var A = h[y];
                w[A] = this.originalStyle[A]
            }
            this.element.unbind(".isotope").undelegate("." + x.hiddenClass, "click").removeClass(x.containerClass).removeData("isotope");
            q.unbind(".isotope")
        },
        _getSegments: function (B) {
            var y = this.options.layoutMode,
                x = B ? "rowHeight" : "columnWidth",
                w = B ? "height" : "width",
                A = B ? "rows" : "cols",
                C = this.element[w](),
                v, z = this.options[y] && this.options[y][x] || this.$filteredAtoms["outer" + p(w)](true) || C;
            v = Math.floor(C / z);
            v = Math.max(v, 1);
            this[y][A] = v;
            this[y][x] = z
        },
        _checkIfSegmentsChanged: function (y) {
            var w = this.options.layoutMode,
                x = y ? "rows" : "cols",
                v = this[w][x];
            this._getSegments(y);
            return (this[w][x] !== v)
        },
        _masonryReset: function () {
            this.masonry = {};
            this._getSegments();
            var v = this.masonry.cols;
            this.masonry.colYs = [];
            while (v--) {
                this.masonry.colYs.push(0)
            }
        },
        _masonryLayout: function (x) {
            var v = this,
                w = v.masonry;
            x.each(function () {
                var C = g(this),
                    A = Math.ceil(C.outerWidth(true) / w.columnWidth);
                A = Math.min(A, w.cols);
                if (A === 1) {
                    v._masonryPlaceBrick(C, w.colYs)
                } else {
                    var D = w.cols + 1 - A,
                        z = [],
                        B, y;
                    for (y = 0; y < D; y++) {
                        B = w.colYs.slice(y, y + A);
                        z[y] = Math.max.apply(Math, B)
                    }
                    v._masonryPlaceBrick(C, z)
                }
            })
        },
        _masonryPlaceBrick: function (A, E) {
            var v = Math.min.apply(Math, E),
                G = 0;
            for (var z = 0, B = E.length; z < B; z++) {
                if (E[z] === v) {
                    G = z;
                    break
                }
            }
            var F = this.masonry.columnWidth * G,
                D = v;
            this._pushPosition(A, F, D);
            var C = v + A.outerHeight(true),
                w = this.masonry.cols + 1 - B;
            for (z = 0; z < w; z++) {
                this.masonry.colYs[G + z] = C
            }
        },
        _masonryGetContainerSize: function () {
            var v = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: v
            }
        },
        _masonryResizeChanged: function () {
            return this._checkIfSegmentsChanged()
        },
        _fitRowsReset: function () {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            }
        },
        _fitRowsLayout: function (y) {
            var v = this,
                x = this.element.width(),
                w = this.fitRows;
            y.each(function () {
                var B = g(this),
                    A = B.outerWidth(true),
                    z = B.outerHeight(true);
                if (w.x !== 0 && A + w.x > x) {
                    w.x = 0;
                    w.y = w.height
                }
                v._pushPosition(B, w.x, w.y);
                w.height = Math.max(w.y + z, w.height);
                w.x += A
            })
        },
        _fitRowsGetContainerSize: function () {
            return {
                height: this.fitRows.height
            }
        },
        _fitRowsResizeChanged: function () {
            return true
        },
        _cellsByRowReset: function () {
            this.cellsByRow = {
                index: 0
            };
            this._getSegments();
            this._getSegments(true)
        },
        _cellsByRowLayout: function (x) {
            var v = this,
                w = this.cellsByRow;
            x.each(function () {
                var B = g(this),
                    A = w.index % w.cols,
                    C = Math.floor(w.index / w.cols),
                    z = Math.round((A + 0.5) * w.columnWidth - B.outerWidth(true) / 2),
                    D = Math.round((C + 0.5) * w.rowHeight - B.outerHeight(true) / 2);
                v._pushPosition(B, z, D);
                w.index++
            })
        },
        _cellsByRowGetContainerSize: function () {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            }
        },
        _cellsByRowResizeChanged: function () {
            return this._checkIfSegmentsChanged()
        },
        _straightDownReset: function () {
            this.straightDown = {
                y: 0
            }
        },
        _straightDownLayout: function (w) {
            var v = this;
            w.each(function (x) {
                var y = g(this);
                v._pushPosition(y, 0, v.straightDown.y);
                v.straightDown.y += y.outerHeight(true)
            })
        },
        _straightDownGetContainerSize: function () {
            return {
                height: this.straightDown.y
            }
        },
        _straightDownResizeChanged: function () {
            return true
        },
        _masonryHorizontalReset: function () {
            this.masonryHorizontal = {};
            this._getSegments(true);
            var v = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (v--) {
                this.masonryHorizontal.rowXs.push(0)
            }
        },
        _masonryHorizontalLayout: function (x) {
            var v = this,
                w = v.masonryHorizontal;
            x.each(function () {
                var C = g(this),
                    A = Math.ceil(C.outerHeight(true) / w.rowHeight);
                A = Math.min(A, w.rows);
                if (A === 1) {
                    v._masonryHorizontalPlaceBrick(C, w.rowXs)
                } else {
                    var D = w.rows + 1 - A,
                        z = [],
                        B, y;
                    for (y = 0; y < D; y++) {
                        B = w.rowXs.slice(y, y + A);
                        z[y] = Math.max.apply(Math, B)
                    }
                    v._masonryHorizontalPlaceBrick(C, z)
                }
            })
        },
        _masonryHorizontalPlaceBrick: function (A, F) {
            var v = Math.min.apply(Math, F),
                D = 0;
            for (var z = 0, B = F.length; z < B; z++) {
                if (F[z] === v) {
                    D = z;
                    break
                }
            }
            var G = v,
                E = this.masonryHorizontal.rowHeight * D;
            this._pushPosition(A, G, E);
            var C = v + A.outerWidth(true),
                w = this.masonryHorizontal.rows + 1 - B;
            for (z = 0; z < w; z++) {
                this.masonryHorizontal.rowXs[D + z] = C
            }
        },
        _masonryHorizontalGetContainerSize: function () {
            var v = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: v
            }
        },
        _masonryHorizontalResizeChanged: function () {
            return this._checkIfSegmentsChanged(true)
        },
        _fitColumnsReset: function () {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            }
        },
        _fitColumnsLayout: function (y) {
            var v = this,
                x = this.element.height(),
                w = this.fitColumns;
            y.each(function () {
                var B = g(this),
                    A = B.outerWidth(true),
                    z = B.outerHeight(true);
                if (w.y !== 0 && z + w.y > x) {
                    w.x = w.width;
                    w.y = 0
                }
                v._pushPosition(B, w.x, w.y);
                w.width = Math.max(w.x + A, w.width);
                w.y += z
            })
        },
        _fitColumnsGetContainerSize: function () {
            return {
                width: this.fitColumns.width
            }
        },
        _fitColumnsResizeChanged: function () {
            return true
        },
        _cellsByColumnReset: function () {
            this.cellsByColumn = {
                index: 0
            };
            this._getSegments();
            this._getSegments(true)
        },
        _cellsByColumnLayout: function (x) {
            var v = this,
                w = this.cellsByColumn;
            x.each(function () {
                var B = g(this),
                    A = Math.floor(w.index / w.rows),
                    C = w.index % w.rows,
                    z = Math.round((A + 0.5) * w.columnWidth - B.outerWidth(true) / 2),
                    D = Math.round((C + 0.5) * w.rowHeight - B.outerHeight(true) / 2);
                v._pushPosition(B, z, D);
                w.index++
            })
        },
        _cellsByColumnGetContainerSize: function () {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            }
        },
        _cellsByColumnResizeChanged: function () {
            return this._checkIfSegmentsChanged(true)
        },
        _straightAcrossReset: function () {
            this.straightAcross = {
                x: 0
            }
        },
        _straightAcrossLayout: function (w) {
            var v = this;
            w.each(function (x) {
                var y = g(this);
                v._pushPosition(y, v.straightAcross.x, 0);
                v.straightAcross.x += y.outerWidth(true)
            })
        },
        _straightAcrossGetContainerSize: function () {
            return {
                width: this.straightAcross.x
            }
        },
        _straightAcrossResizeChanged: function () {
            return true
        }
    };
    /*!
     * jQuery imagesLoaded plugin v1.1.0
     * http://github.com/desandro/imagesloaded
     *
     * MIT License. by Paul Irish et al.
     */
    g.fn.imagesLoaded = function (C) {
        var A = this,
            y = A.find("img").add(A.filter("img")),
            v = y.length,
            B = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            x = [];

        function z() {
            C.call(A, y)
        }
        function w(D) {
            if (D.target.src !== B && g.inArray(this, x) === -1) {
                x.push(this);
                if (--v <= 0) {
                    setTimeout(z);
                    y.unbind(".imagesLoaded", w)
                }
            }
        }
        if (!v) {
            z()
        }
        y.bind("load.imagesLoaded error.imagesLoaded", w).each(function () {
            var D = this.src;
            this.src = B;
            this.src = D
        });
        return A
    };
    var u = function (v) {
            if (n.console) {
                n.console.error(v)
            }
        };
    g.fn.isotope = function (w, x) {
        if (typeof w === "string") {
            var v = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var y = g.data(this, "isotope");
                if (!y) {
                    u("cannot call methods on isotope prior to initialization; attempted to call method '" + w + "'");
                    return
                }
                if (!g.isFunction(y[w]) || w.charAt(0) === "_") {
                    u("no such method '" + w + "' for isotope instance");
                    return
                }
                y[w].apply(y, v)
            })
        } else {
            this.each(function () {
                var y = g.data(this, "isotope");
                if (y) {
                    y.option(w);
                    y._init(x)
                } else {
                    g.data(this, "isotope", new g.Isotope(w, this, x))
                }
            })
        }
        return this
    }
})(window, jQuery);
(function (b) {
    b.tumblrPhotoset = function (e, d) {
        var g = {
            width: "100%",
            margin: "0px",
            highres: false,
            layout: "",
            margin: "2",
            links: true,
            onInit: function () {},
            onComplete: function () {}
        };
        var f = this;
        f.settings = {};
        var c = b(e),
            e = e;
        f.init = function () {
            f.settings = b.extend({}, g, d);
            f.settings.onInit();
            if (f.settings.layout == "") {
                if (c.attr("data-photoset-layout") !== undefined) {
                    f.settings.layout = c.attr("data-photoset-layout")
                }
            }
            var l = f.settings.layout.split("");
            for (a in l) {
                l[a] = parseInt(l[a])
            }
            var m = 0;
            var j = c.find("img");
            b.each(l, function (o, p) {
                var q = m;
                var n = p + m;
                j.slice(q, n).wrapAll('<div class="photosetRow cols' + p + '"></div>');
                m = n
            });
            c.css({
                width: f.settings.width,
                "font-size": "0px",
            });
            var k = f.settings.margin + "px";
            var h = (f.settings.margin * 2) + "px";
            c.find("img").css({
                display: "inline-block",
                "vertical-align": "top",
                "margin-left": k,
                "margin-right": k
            });
            c.find(".photosetRow img:first-child").css({
                "margin-left": "0px"
            });
            c.find(".cols1 img").css({
                margin: "0px"
            });
            c.find(".photosetRow img:last-child").css({
                "margin-right": "0px"
            });
            c.find(".photosetRow").css({
                overflow: "hidden",
                "white-space": "nowrap",
                "margin-bottom": h
            });
            c.find(".photosetRow:last-child").css({
                "margin-bottom": "0px"
            });
            c.find(".cols1 img").width("100%");
            c.find(".cols2 img").width("50%");
            c.find(".cols3 img").width("33.4%");
            c.find("img").height("auto");
            c.find(".photosetRow").each(function () {
                var n = b(this).find("img:eq(0)");
                b(this).find("img").each(function () {
                    if (b(this).height() < n.height()) {
                        n = b(this)
                    }
                });
                b(this).data("$smallestImg", n)
            });
            f.resizePhotoset();
            if (f.settings.links == true) {
                c.find("img").each(function () {
                    var o = b(this).attr("data-highres");
                    var q = b(this).attr("data-500px");
                    if (o !== undefined) {
                        var s = o
                    } else {
                        var s = q
                    }
                    var n = b(this).attr("alt");
                    var r = b(this).parent().parent().attr("data-photoset-id");
                    var p = '<a href="' + s + '" rel="' + r + '" title="' + n + '" target="_blank"></a>';
                    b(this).wrap(p)
                })
            }
            f.settings.onComplete()
        };
        f.resizePhotoset = function () {
            c.find(".photosetRow").each(function () {
                var h = b(this).data("$smallestImg").height();
                b(this).height(h);
                b(this).find("img").each(function () {
                    var j = ((h - b(this).height()) * 0.5) + "px";
                    b(this).css({
                        "margin-top": j
                    })
                })
            });
            c.find("img").each(function () {
                if (b(this).width() > 250 && b(this).width() <= 500) {
                    if (b(this).attr("data-img-size") !== "500" && b(this).attr("data-img-size") !== "highres") {
                        var h = b(this).attr("data-500px");
                        b(this).attr("src", h);
                        b(this).attr("data-img-size", "500")
                    }
                }
                if (b(this).width() > 500) {
                    if (b(this).attr("data-img-size") !== "highres") {
                        var h = b(this).attr("data-highres");
                        if (h !== undefined) {
                            b(this).attr("src", h);
                            b(this).attr("data-img-size", "highres")
                        }
                    }
                }
            })
        };
        f.init()
    };
    b.fn.tumblrPhotoset = function (c) {
        return this.each(function () {
            if (undefined == b(this).data("tumblrPhotoset")) {
                var d = new b.tumblrPhotoset(this, c);
                b(this).data("tumblrPhotoset", d)
            }
        })
    }
})(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (f, g, e, j, h) {
        return jQuery.easing[jQuery.easing.def](f, g, e, j, h)
    },
    easeInQuad: function (f, g, e, j, h) {
        return j * (g /= h) * g + e
    },
    easeOutQuad: function (f, g, e, j, h) {
        return -j * (g /= h) * (g - 2) + e
    },
    easeInOutQuad: function (f, g, e, j, h) {
        if ((g /= h / 2) < 1) {
            return j / 2 * g * g + e
        }
        return -j / 2 * ((--g) * (g - 2) - 1) + e
    },
    easeInCubic: function (f, g, e, j, h) {
        return j * (g /= h) * g * g + e
    },
    easeOutCubic: function (f, g, e, j, h) {
        return j * ((g = g / h - 1) * g * g + 1) + e
    },
    easeInOutCubic: function (f, g, e, j, h) {
        if ((g /= h / 2) < 1) {
            return j / 2 * g * g * g + e
        }
        return j / 2 * ((g -= 2) * g * g + 2) + e
    },
    easeInQuart: function (f, g, e, j, h) {
        return j * (g /= h) * g * g * g + e
    },
    easeOutQuart: function (f, g, e, j, h) {
        return -j * ((g = g / h - 1) * g * g * g - 1) + e
    },
    easeInOutQuart: function (f, g, e, j, h) {
        if ((g /= h / 2) < 1) {
            return j / 2 * g * g * g * g + e
        }
        return -j / 2 * ((g -= 2) * g * g * g - 2) + e
    },
    easeInQuint: function (f, g, e, j, h) {
        return j * (g /= h) * g * g * g * g + e
    },
    easeOutQuint: function (f, g, e, j, h) {
        return j * ((g = g / h - 1) * g * g * g * g + 1) + e
    },
    easeInOutQuint: function (f, g, e, j, h) {
        if ((g /= h / 2) < 1) {
            return j / 2 * g * g * g * g * g + e
        }
        return j / 2 * ((g -= 2) * g * g * g * g + 2) + e
    },
    easeInSine: function (f, g, e, j, h) {
        return -j * Math.cos(g / h * (Math.PI / 2)) + j + e
    },
    easeOutSine: function (f, g, e, j, h) {
        return j * Math.sin(g / h * (Math.PI / 2)) + e
    },
    easeInOutSine: function (f, g, e, j, h) {
        return -j / 2 * (Math.cos(Math.PI * g / h) - 1) + e
    },
    easeInExpo: function (f, g, e, j, h) {
        return (g == 0) ? e : j * Math.pow(2, 10 * (g / h - 1)) + e
    },
    easeOutExpo: function (f, g, e, j, h) {
        return (g == h) ? e + j : j * (-Math.pow(2, -10 * g / h) + 1) + e
    },
    easeInOutExpo: function (f, g, e, j, h) {
        if (g == 0) {
            return e
        }
        if (g == h) {
            return e + j
        }
        if ((g /= h / 2) < 1) {
            return j / 2 * Math.pow(2, 10 * (g - 1)) + e
        }
        return j / 2 * (-Math.pow(2, -10 * --g) + 2) + e
    },
    easeInCirc: function (f, g, e, j, h) {
        return -j * (Math.sqrt(1 - (g /= h) * g) - 1) + e
    },
    easeOutCirc: function (f, g, e, j, h) {
        return j * Math.sqrt(1 - (g = g / h - 1) * g) + e
    },
    easeInOutCirc: function (f, g, e, j, h) {
        if ((g /= h / 2) < 1) {
            return -j / 2 * (Math.sqrt(1 - g * g) - 1) + e
        }
        return j / 2 * (Math.sqrt(1 - (g -= 2) * g) + 1) + e
    },
    easeInElastic: function (f, h, e, m, l) {
        var j = 1.70158;
        var k = 0;
        var g = m;
        if (h == 0) {
            return e
        }
        if ((h /= l) == 1) {
            return e + m
        }
        if (!k) {
            k = l * 0.3
        }
        if (g < Math.abs(m)) {
            g = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * l - j) * (2 * Math.PI) / k)) + e
    },
    easeOutElastic: function (f, h, e, m, l) {
        var j = 1.70158;
        var k = 0;
        var g = m;
        if (h == 0) {
            return e
        }
        if ((h /= l) == 1) {
            return e + m
        }
        if (!k) {
            k = l * 0.3
        }
        if (g < Math.abs(m)) {
            g = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * l - j) * (2 * Math.PI) / k) + m + e
    },
    easeInOutElastic: function (f, h, e, m, l) {
        var j = 1.70158;
        var k = 0;
        var g = m;
        if (h == 0) {
            return e
        }
        if ((h /= l / 2) == 2) {
            return e + m
        }
        if (!k) {
            k = l * (0.3 * 1.5)
        }
        if (g < Math.abs(m)) {
            g = m;
            var j = k / 4
        } else {
            var j = k / (2 * Math.PI) * Math.asin(m / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * l - j) * (2 * Math.PI) / k)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * l - j) * (2 * Math.PI) / k) * 0.5 + m + e
    },
    easeInBack: function (f, g, e, k, j, h) {
        if (h == undefined) {
            h = 1.70158
        }
        return k * (g /= j) * g * ((h + 1) * g - h) + e
    },
    easeOutBack: function (f, g, e, k, j, h) {
        if (h == undefined) {
            h = 1.70158
        }
        return k * ((g = g / j - 1) * g * ((h + 1) * g + h) + 1) + e
    },
    easeInOutBack: function (f, g, e, k, j, h) {
        if (h == undefined) {
            h = 1.70158
        }
        if ((g /= j / 2) < 1) {
            return k / 2 * (g * g * (((h *= (1.525)) + 1) * g - h)) + e
        }
        return k / 2 * ((g -= 2) * g * (((h *= (1.525)) + 1) * g + h) + 2) + e
    },
    easeInBounce: function (f, g, e, j, h) {
        return j - jQuery.easing.easeOutBounce(f, h - g, 0, j, h) + e
    },
    easeOutBounce: function (f, g, e, j, h) {
        if ((g /= h) < (1 / 2.75)) {
            return j * (7.5625 * g * g) + e
        } else {
            if (g < (2 / 2.75)) {
                return j * (7.5625 * (g -= (1.5 / 2.75)) * g + 0.75) + e
            } else {
                if (g < (2.5 / 2.75)) {
                    return j * (7.5625 * (g -= (2.25 / 2.75)) * g + 0.9375) + e
                } else {
                    return j * (7.5625 * (g -= (2.625 / 2.75)) * g + 0.984375) + e
                }
            }
        }
    },
    easeInOutBounce: function (f, g, e, j, h) {
        if (g < h / 2) {
            return jQuery.easing.easeInBounce(f, g * 2, 0, j, h) * 0.5 + e
        }
        return jQuery.easing.easeOutBounce(f, g * 2 - h, 0, j, h) * 0.5 + j * 0.5 + e
    }
});
(function (b) {
    b.address = (function () {
        var e = function (an) {
                b(b.address).trigger(b.extend(b.Event(an), (function () {
                    var ar = {},
                        aq = b.address.parameterNames();
                    for (var ap = 0, ao = aq.length; ap < ao; ap++) {
                        ar[aq[ap]] = b.address.parameter(aq[ap])
                    }
                    return {
                        value: b.address.value(),
                        path: b.address.path(),
                        pathNames: b.address.pathNames(),
                        parameterNames: aq,
                        parameters: ar,
                        queryString: b.address.queryString()
                    }
                }).call(b.address)))
            },
            l = function (ap, ao, an) {
                b().bind.apply(b(b.address), Array.prototype.slice.call(arguments));
                return b.address
            },
            Q = function () {
                return (ae.pushState && H.state !== L)
            },
            K = function () {
                return ("/" + aa.pathname.replace(new RegExp(H.state), "") + aa.search + (W() ? "#" + W() : "")).replace(S, "/")
            },
            W = function () {
                var an = aa.href.indexOf("#");
                return an != -1 ? G(aa.href.substr(an + 1), af) : ""
            },
            C = function () {
                return Q() ? K() : W()
            },
            c = function () {
                try {
                    return top.document !== L ? top : window
                } catch (an) {
                    return window
                }
            },
            n = function () {
                return "javascript"
            },
            al = function (an) {
                an = an.toString();
                return (H.strict && an.substr(0, 1) != "/" ? "/" : "") + an
            },
            G = function (an, ao) {
                if (H.crawlable && ao) {
                    return (an !== "" ? "!" : "") + an
                }
                return an.replace(/^\!/, "")
            },
            V = function (an, ao) {
                return parseInt(an.css(ao), 10)
            },
            m = function (ar) {
                var ao, aq;
                for (var ap = 0, an = ar.childNodes.length; ap < an; ap++) {
                    try {
                        if ("src" in ar.childNodes[ap] && ar.childNodes[ap].src) {
                            ao = String(ar.childNodes[ap].src)
                        }
                    } catch (at) {}
                    aq = m(ar.childNodes[ap]);
                    if (aq) {
                        ao = aq
                    }
                }
                return ao
            },
            ad = function () {
                if (!v) {
                    var ao = C(),
                        an = Y != ao;
                    if (an) {
                        if (j && s < 7) {
                            aa.reload()
                        } else {
                            if (j && s < 8 && H.history) {
                                p(I, 50)
                            }
                            Y = ao;
                            ab(af)
                        }
                    }
                }
            },
            ab = function (an) {
                e(J);
                e(an ? h : ak);
                p(z, 10)
            },
            z = function () {
                if (H.tracker !== "null" && H.tracker !== null) {
                    var an = b.isFunction(H.tracker) ? H.tracker : T[H.tracker],
                        ao = (aa.pathname + aa.search + (b.address && !Q() ? b.address.value() : "")).replace(/\/\//, "/").replace(/^\/$/, "");
                    if (b.isFunction(an)) {
                        an(ao)
                    } else {
                        if (b.isFunction(T.urchinTracker)) {
                            T.urchinTracker(ao)
                        } else {
                            if (T.pageTracker !== L && b.isFunction(T.pageTracker._trackPageview)) {
                                T.pageTracker._trackPageview(ao)
                            } else {
                                if (T._gaq !== L && b.isFunction(T._gaq.push)) {
                                    T._gaq.push(["_trackPageview", decodeURI(ao)])
                                }
                            }
                        }
                    }
                }
            },
            I = function () {
                var an = n() + ":" + af + ";document.open();document.writeln('<html><head><title>" + ai.title.replace("'", "\\'") + "</title><script>var " + B + ' = "' + encodeURIComponent(C()) + (ai.domain != aa.hostname ? '";document.domain="' + ai.domain : "") + "\";<\/script></head></html>');document.close();";
                if (s < 7) {
                    f.src = an
                } else {
                    f.contentWindow.location.replace(an)
                }
            },
            ag = function () {
                if (k && d != -1) {
                    var ao, an = k.substr(d + 1).split("&");
                    for (i = 0; i < an.length; i++) {
                        ao = an[i].split("=");
                        if (/^(autoUpdate|crawlable|history|strict|wrap)$/.test(ao[0])) {
                            H[ao[0]] = (isNaN(ao[1]) ? /^(true|yes)$/i.test(ao[1]) : (parseInt(ao[1], 10) !== 0))
                        }
                        if (/^(state|tracker)$/.test(ao[0])) {
                            H[ao[0]] = ao[1]
                        }
                    }
                    k = null
                }
                Y = C()
            },
            U = function () {
                if (!Z) {
                    Z = F;
                    ag();
                    var ap = function () {
                            y.call(this);
                            t.call(this)
                        },
                        ao = b("body").ajaxComplete(ap);
                    ap();
                    if (H.wrap) {
                        var aq = b("body > *").wrapAll('<div style="padding:' + (V(ao, "marginTop") + V(ao, "paddingTop")) + "px " + (V(ao, "marginRight") + V(ao, "paddingRight")) + "px " + (V(ao, "marginBottom") + V(ao, "paddingBottom")) + "px " + (V(ao, "marginLeft") + V(ao, "paddingLeft")) + 'px;" />').parent().wrap('<div id="' + B + '" style="height:100%;overflow:auto;position:relative;' + (u && !window.statusbar.visible ? "resize:both;" : "") + '" />');
                        b("html, body").css({
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            overflow: "hidden"
                        });
                        if (u) {
                            b('<style type="text/css" />').appendTo("head").text("#" + B + "::-webkit-resizer { background-color: #fff; }")
                        }
                    }
                    if (j && s < 8) {
                        var an = ai.getElementsByTagName("frameset")[0];
                        f = ai.createElement((an ? "" : "i") + "frame");
                        if (an) {
                            an.insertAdjacentElement("beforeEnd", f);
                            an[an.cols ? "cols" : "rows"] += ",0";
                            f.noResize = F;
                            f.frameBorder = f.frameSpacing = 0
                        } else {
                            f.style.display = "none";
                            f.style.width = f.style.height = 0;
                            f.tabIndex = -1;
                            ai.body.insertAdjacentElement("afterBegin", f)
                        }
                        p(function () {
                            b(f).bind("load", function () {
                                var ar = f.contentWindow;
                                Y = ar[B] !== L ? ar[B] : "";
                                if (Y != C()) {
                                    ab(af);
                                    aa.hash = G(Y, F)
                                }
                            });
                            if (f.contentWindow[B] === L) {
                                I()
                            }
                        }, 50)
                    }
                    p(function () {
                        e("init");
                        ab(af)
                    }, 1);
                    if (!Q()) {
                        if ((j && s > 7) || (!j && ("on" + X) in T)) {
                            if (T.addEventListener) {
                                T.addEventListener(X, ad, af)
                            } else {
                                if (T.attachEvent) {
                                    T.attachEvent("on" + X, ad)
                                }
                            }
                        } else {
                            w(ad, 50)
                        }
                    }
                }
            },
            y = function () {
                var aq, at = b("a"),
                    ar = at.size(),
                    ao = 1,
                    an = -1,
                    ap = function () {
                        if (++an != ar) {
                            aq = b(at.get(an));
                            if (aq.is('[rel*="address:"]')) {
                                aq.address()
                            }
                            p(ap, ao)
                        }
                    };
                p(ap, ao)
            },
            r = function () {
                if (Y != C()) {
                    Y = C();
                    ab(af)
                }
            },
            q = function () {
                if (T.removeEventListener) {
                    T.removeEventListener(X, ad, af)
                } else {
                    if (T.detachEvent) {
                        T.detachEvent("on" + X, ad)
                    }
                }
            },
            t = function () {
                if (H.crawlable) {
                    var ao = aa.pathname.replace(/\/$/, ""),
                        an = "_escaped_fragment_";
                    if (b("body").html().indexOf(an) != -1) {
                        b('a[href]:not([href^=http]), a[href*="' + document.domain + '"]').each(function () {
                            var ap = b(this).attr("href").replace(/^http:/, "").replace(new RegExp(ao + "/?$"), "");
                            if (ap === "" || ap.indexOf(an) != -1) {
                                b(this).attr("href", "#" + ap.replace(new RegExp("/(.*)\\?" + an + "=(.*)$"), "!$2"))
                            }
                        })
                    }
                }
            },
            L, B = "jQueryAddress",
            ac = "string",
            X = "hashchange",
            o = "init",
            J = "change",
            h = "internalChange",
            ak = "externalChange",
            F = true,
            af = false,
            H = {
                autoUpdate: F,
                crawlable: af,
                history: F,
                strict: F,
                wrap: af
            },
            E = b.browser,
            s = parseFloat(b.browser.version),
            ah = E.mozilla,
            j = E.msie,
            P = E.opera,
            u = E.webkit || E.safari,
            aj = af,
            T = c(),
            ai = T.document,
            ae = T.history,
            aa = T.location,
            w = setInterval,
            p = setTimeout,
            S = /\/{2,9}/g,
            am = navigator.userAgent,
            f, N, k = m(document),
            d = k ? k.indexOf("?") : -1,
            M = ai.title,
            v = af,
            Z = af,
            R = F,
            O = F,
            A = af,
            D = {},
            Y = C();
        if (j) {
            s = parseFloat(am.substr(am.indexOf("MSIE") + 4));
            if (ai.documentMode && ai.documentMode != s) {
                s = ai.documentMode != 8 ? 7 : 8
            }
            var x = ai.onpropertychange;
            ai.onpropertychange = function () {
                if (x) {
                    x.call(ai)
                }
                if (ai.title != M && ai.title.indexOf("#" + C()) != -1) {
                    ai.title = M
                }
            }
        }
        aj = (ah && s >= 1) || (j && s >= 6) || (P && s >= 9.5) || (u && s >= 523);
        if (aj) {
            if (P) {
                history.navigationMode = "compatible"
            }
            if (document.readyState == "complete") {
                var g = setInterval(function () {
                    if (b.address) {
                        U();
                        clearInterval(g)
                    }
                }, 50)
            } else {
                ag();
                b(U)
            }
            b(window).bind("popstate", r).bind("unload", q)
        } else {
            if (!aj && W() !== "") {
                aa.replace(aa.href.substr(0, aa.href.indexOf("#")))
            } else {
                z()
            }
        }
        return {
            bind: function (ao, ap, an) {
                return l(ao, ap, an)
            },
            init: function (an) {
                return l(o, an)
            },
            change: function (an) {
                return l(J, an)
            },
            internalChange: function (an) {
                return l(h, an)
            },
            externalChange: function (an) {
                return l(ak, an)
            },
            baseURL: function () {
                var an = aa.href;
                if (an.indexOf("#") != -1) {
                    an = an.substr(0, an.indexOf("#"))
                }
                if (/\/$/.test(an)) {
                    an = an.substr(0, an.length - 1)
                }
                return an
            },
            autoUpdate: function (an) {
                if (an !== L) {
                    H.autoUpdate = an;
                    return this
                }
                return H.autoUpdate
            },
            crawlable: function (an) {
                if (an !== L) {
                    H.crawlable = an;
                    return this
                }
                return H.crawlable
            },
            history: function (an) {
                if (an !== L) {
                    H.history = an;
                    return this
                }
                return H.history
            },
            state: function (an) {
                if (an !== L) {
                    H.state = an;
                    var ao = K();
                    if (H.state !== L) {
                        if (ae.pushState) {
                            if (ao.substr(0, 3) == "/#/") {
                                aa.replace(H.state.replace(/^\/$/, "") + ao.substr(2))
                            }
                        } else {
                            if (ao != "/" && ao.replace(/^\/#/, "") != W()) {
                                p(function () {
                                    aa.replace(H.state.replace(/^\/$/, "") + "/#" + ao)
                                }, 1)
                            }
                        }
                    }
                    return this
                }
                return H.state
            },
            strict: function (an) {
                if (an !== L) {
                    H.strict = an;
                    return this
                }
                return H.strict
            },
            tracker: function (an) {
                if (an !== L) {
                    H.tracker = an;
                    return this
                }
                return H.tracker
            },
            wrap: function (an) {
                if (an !== L) {
                    H.wrap = an;
                    return this
                }
                return H.wrap
            },
            update: function () {
                A = F;
                this.value(Y);
                A = af;
                return this
            },
            title: function (an) {
                if (an !== L) {
                    p(function () {
                        M = ai.title = an;
                        if (O && f && f.contentWindow && f.contentWindow.document) {
                            f.contentWindow.document.title = an;
                            O = af
                        }
                        if (!R && ah) {
                            aa.replace(aa.href.indexOf("#") != -1 ? aa.href : aa.href + "#")
                        }
                        R = af
                    }, 50);
                    return this
                }
                return ai.title
            },
            value: function (an) {
                if (an !== L) {
                    an = al(an);
                    if (an == "/") {
                        an = ""
                    }
                    if (Y == an && !A) {
                        return
                    }
                    R = F;
                    Y = an;
                    if (H.autoUpdate || A) {
                        ab(F);
                        if (Q()) {
                            ae[H.history ? "pushState" : "replaceState"]({}, "", H.state.replace(/\/$/, "") + (Y === "" ? "/" : Y))
                        } else {
                            v = F;
                            if (u) {
                                if (H.history) {
                                    aa.hash = "#" + G(Y, F)
                                } else {
                                    aa.replace("#" + G(Y, F))
                                }
                            } else {
                                if (Y != C()) {
                                    if (H.history) {
                                        aa.hash = "#" + G(Y, F)
                                    } else {
                                        aa.replace("#" + G(Y, F))
                                    }
                                }
                            }
                            if ((j && s < 8) && H.history) {
                                p(I, 50)
                            }
                            if (u) {
                                p(function () {
                                    v = af
                                }, 1)
                            } else {
                                v = af
                            }
                        }
                    }
                    return this
                }
                if (!aj) {
                    return null
                }
                return al(Y)
            },
            path: function (ao) {
                if (ao !== L) {
                    var an = this.queryString(),
                        ap = this.hash();
                    this.value(ao + (an ? "?" + an : "") + (ap ? "#" + ap : ""));
                    return this
                }
                return al(Y).split("#")[0].split("?")[0]
            },
            pathNames: function () {
                var ao = this.path(),
                    an = ao.replace(S, "/").split("/");
                if (ao.substr(0, 1) == "/" || ao.length === 0) {
                    an.splice(0, 1)
                }
                if (ao.substr(ao.length - 1, 1) == "/") {
                    an.splice(an.length - 1, 1)
                }
                return an
            },
            queryString: function (ao) {
                if (ao !== L) {
                    var ap = this.hash();
                    this.value(this.path() + (ao ? "?" + ao : "") + (ap ? "#" + ap : ""));
                    return this
                }
                var an = Y.split("?");
                return an.slice(1, an.length).join("?").split("#")[0]
            },
            parameter: function (ao, ax, aq) {
                var av, at;
                if (ax !== L) {
                    var aw = this.parameterNames();
                    at = [];
                    ax = ax ? ax.toString() : "";
                    for (av = 0; av < aw.length; av++) {
                        var ar = aw[av],
                            ay = this.parameter(ar);
                        if (typeof ay == ac) {
                            ay = [ay]
                        }
                        if (ar == ao) {
                            ay = (ax === null || ax === "") ? [] : (aq ? ay.concat([ax]) : [ax])
                        }
                        for (var au = 0; au < ay.length; au++) {
                            at.push(ar + "=" + ay[au])
                        }
                    }
                    if (b.inArray(ao, aw) == -1 && ax !== null && ax !== "") {
                        at.push(ao + "=" + ax)
                    }
                    this.queryString(at.join("&"));
                    return this
                }
                ax = this.queryString();
                if (ax) {
                    var an = [];
                    at = ax.split("&");
                    for (av = 0; av < at.length; av++) {
                        var ap = at[av].split("=");
                        if (ap[0] == ao) {
                            an.push(ap.slice(1).join("="))
                        }
                    }
                    if (an.length !== 0) {
                        return an.length != 1 ? an : an[0]
                    }
                }
            },
            parameterNames: function () {
                var an = this.queryString(),
                    aq = [];
                if (an && an.indexOf("=") != -1) {
                    var ar = an.split("&");
                    for (var ap = 0; ap < ar.length; ap++) {
                        var ao = ar[ap].split("=")[0];
                        if (b.inArray(ao, aq) == -1) {
                            aq.push(ao)
                        }
                    }
                }
                return aq
            },
            hash: function (ao) {
                if (ao !== L) {
                    this.value(Y.split("#")[0] + (ao ? "#" + ao : ""));
                    return this
                }
                var an = Y.split("#");
                return an.slice(1, an.length).join("#")
            }
        }
    })();
    b.fn.address = function (c) {
        if (!b(this).attr("address")) {
            var d = function (g) {
                    if (g.shiftKey || g.ctrlKey || g.metaKey) {
                        return true
                    }
                    if (b(this).is("a")) {
                        var f = c ? c.call(this) : /address:/.test(b(this).attr("rel")) ? b(this).attr("rel").split("address:")[1].split(" ")[0] : b.address.state() !== undefined && b.address.state() != "/" ? b(this).attr("href").replace(new RegExp("^(.*" + b.address.state() + "|\\.)"), "") : b(this).attr("href").replace(/^(#\!?|\.)/, "");
                        b.address.value(f);
                        g.preventDefault()
                    }
                };
            b(this).click(d).live("click", d).live("submit", function (h) {
                if (b(this).is("form")) {
                    var g = b(this).attr("action"),
                        f = c ? c.call(this) : (g.indexOf("?") != -1 ? g.replace(/&$/, "") : g + "?") + b(this).serialize();
                    b.address.value(f);
                    h.preventDefault()
                }
            }).attr("address", true)
        }
        return this
    }
})(jQuery);
/*! 
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */ (function (b) {
    b.fn.fitVids = function (c) {
        var d = {
            customSelector: null
        };
        var f = document.createElement("div"),
            e = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        f.className = "fit-vids-style";
        f.innerHTML = "&shy;<style>               .fluid-width-video-wrapper {                 width: 100%;                              position: relative;                       padding: 0;                            }                                                                                   .fluid-width-video-wrapper iframe,        .fluid-width-video-wrapper object,        .fluid-width-video-wrapper embed {           position: absolute;                       top: 0;                                   left: 0;                                  width: 100%;                              height: 100%;                          }                                       </style>";
        e.parentNode.insertBefore(f, e);
        if (c) {
            b.extend(d, c)
        }
        return this.each(function () {
            var g = ["iframe[src^='http://player.vimeo.com']", "iframe[src^='http://www.youtube.com']", "iframe[src^='http://www.kickstarter.com']", "object", "embed"];
            if (d.customSelector) {
                g.push(d.customSelector)
            }
            var h = b(this).find(g.join(","));
            h.each(function () {
                var m = b(this);
                if (this.tagName.toLowerCase() == "embed" && m.parent("object").length || m.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                var j = this.tagName.toLowerCase() == "object" ? m.attr("height") : m.height(),
                    k = j / m.width();
                if (!m.attr("id")) {
                    var l = "fitvid" + Math.floor(Math.random() * 999999);
                    m.attr("id", l)
                }
                m.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", (k * 100) + "%");
                m.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
(function (b) {
    b.fn.extend({
        summarizePost: function (c) {
            var d = {
                len: 200,
                fullPosts: false,
                minimalSummary: false,
                stripMedia: true
            };
            var c = b.extend(d, c);
            return this.each(function () {
                var l = c;
                var k = b(this);
                var j = k.find("section.post-full").html();
                var g = k.find("section.post-summary");
                g.append(j);
                var f = k.find("footer");
                var h = f.find(".notes").text();
                var e = f.find(".comments").text();
                f.find(".notes").attr("data-full", h);
                f.find(".comments").attr("data-full", e);
                f.find(".notes a").text(h.substring(0, h.indexOf(" ")));
                f.find(".comments a").text(e.substring(0, e.indexOf(" ")));
                if (k.is(".text")) {
                    if (k.find(".more-link").length > 0) {
                        return true
                    }
                }
                if (l.fullPosts == true) {
                    return true
                }
                if (l.stripMedia == true) {
                    if (k.not(".audio")) {
                        g.find("img").remove();
                        g.find("iframe").remove();
                        g.find("embed").remove();
                        g.find("object").remove()
                    }
                }
                if (l.minimalSummary == true) {
                    if (k.is(".photo, .photoset, .video, .audio")) {
                        k.find("section.post-summary").empty();
                        return true
                    }
                }
                if (l.len > 0) {
                    g.truncate({
                        maxLength: l.len,
                        linkClass: "more-link"
                    })
                }
            })
        }
    })
})(jQuery);
(function (d) {
    var k = true;
    d.fn.truncate = function (l) {
        var m = d.extend({}, d.fn.truncate.defaults, l);
        d(this).each(function () {
            var p = d.trim(g(d(this).text())).length;
            if (p <= m.maxLength) {
                return
            }
            var q = m.maxLength - m.more.length - 3;
            var o;
            if (m.stripFormatting == true) {
                o = b(this, q)
            } else {
                o = c(this, q)
            }
            var n = d(this).hide();
            o.insertAfter(n);
            f(o).append('â€¦&nbsp;<a href="#showMoreContent">' + m.more + "</a>");
            j(n).append('&nbsp;<a href="#showLessContent">' + m.less + "</a>");
            if (m.linkClass && m.linkClass.length > 0) {
                o.find("a:last").addClass(m.linkClass);
                n.find("a:last").addClass(m.linkClass)
            }
        })
    };
    d.fn.truncate.defaults = {
        maxLength: 100,
        more: "â€¦more",
        less: "less",
        stripFormatting: false
    };

    function b(l, o) {
        var n = d(l).clone().empty();
        var m = g(d(l).text());
        m = m.slice(0, o);
        n.text(m);
        return n
    }
    function c(l, m) {
        return (l.nodeType == 3) ? e(l, m) : h(l, m)
    }
    function h(l, o) {
        var l = d(l);
        var n = l.clone().empty();
        var m;
        l.contents().each(function () {
            var p = o - n.text().length;
            if (p == 0) {
                return
            }
            m = c(this, p);
            if (m) {
                n.append(m)
            }
        });
        return n
    }
    function e(l, n) {
        var m = g(l.data);
        if (k) {
            m = m.replace(/^ /, "")
        }
        k = !! m.match(/ $/);
        var m = m.slice(0, n);
        m = d("<div/>").text(m).html();
        return m
    }
    function g(l) {
        return l.replace(/\s+/g, " ")
    }
    function f(n) {
        var l = d(n);
        var m = l.children(":last");
        if (!m) {
            return n
        }
        var o = m.css("display");
        if (!o || o == "inline") {
            return l
        }
        return f(m)
    }
    function j(n) {
        var l = d(n);
        var m = l.children(":last");
        if (m && m.is("p")) {
            return m
        }
        return n
    }
})(jQuery);
$.fn.textWidth = function () {
    var c = $(this).html();
    var b = "<span>" + c + "</span>";
    $(this).html(b);
    var d = $(this).find("span:first").width();
    $(this).html(c);
    return d
};
(function (n, p, u) {
    var w = n([]),
        s = n.resize = n.extend(n.resize, {}),
        o, l = "setTimeout",
        m = "resize",
        t = m + "-special-event",
        v = "delay",
        r = "throttleWindow";
    s[v] = 250;
    s[r] = true;
    n.event.special[m] = {
        setup: function () {
            if (!s[r] && this[l]) {
                return false
            }
            var b = n(this);
            w = w.add(b);
            n.data(this, t, {
                w: b.width(),
                h: b.height()
            });
            if (w.length === 1) {
                q()
            }
        },
        teardown: function () {
            if (!s[r] && this[l]) {
                return false
            }
            var b = n(this);
            w = w.not(b);
            b.removeData(t);
            if (!w.length) {
                clearTimeout(o)
            }
        },
        add: function (c) {
            if (!s[r] && this[l]) {
                return false
            }
            var d;

            function b(e, j, h) {
                var g = n(this),
                    f = n.data(this, t);
                f.w = j !== u ? j : g.width();
                f.h = h !== u ? h : g.height();
                d.apply(this, arguments)
            }
            if (n.isFunction(c)) {
                d = c;
                return b
            } else {
                d = c.handler;
                c.handler = b
            }
        }
    };

    function q() {
        o = p[l](function () {
            w.each(function () {
                var e = n(this),
                    b = e.width(),
                    c = e.height(),
                    d = n.data(this, t);
                if (b !== d.w || c !== d.h) {
                    e.trigger(m, [d.w = b, d.h = c])
                }
            });
            q()
        }, s[v])
    }
})(jQuery, this);
(function (b) {
    b.fn.jkey = function (k, n, m) {
        var g = {
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            "0": 48,
            "1": 49,
            "2": 50,
            "3": 51,
            "4": 52,
            "5": 53,
            "6": 54,
            "7": 55,
            "8": 56,
            "9": 57,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            shift: 16,
            ctrl: 17,
            control: 17,
            alt: 18,
            option: 18,
            opt: 18,
            cmd: 224,
            command: 224,
            fn: 255,
            "function": 255,
            backspace: 8,
            osxdelete: 8,
            enter: 13,
            "return": 13,
            space: 32,
            spacebar: 32,
            esc: 27,
            escape: 27,
            tab: 9,
            capslock: 20,
            capslk: 20,
            "super": 91,
            windows: 91,
            insert: 45,
            "delete": 46,
            home: 36,
            end: 35,
            pgup: 33,
            pageup: 33,
            pgdn: 34,
            pagedown: 34,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            "`": 96,
            "~": 96,
            "-": 45,
            _: 45,
            "=": 187,
            "+": 187,
            "[": 219,
            "{": 219,
            "]": 221,
            "}": 221,
            "\\": 220,
            "|": 220,
            ";": 59,
            ":": 59,
            "'": 222,
            '"': 222,
            ",": 188,
            "<": 188,
            ".": 190,
            ">": 190,
            "/": 191,
            "?": 191
        };
        var l = "";
        var j = "";
        if (typeof n == "function" && typeof m == "undefined") {
            m = n;
            n = false
        }
        if (k.toString().indexOf(",") > -1) {
            var e = k.match(/[a-zA-Z0-9]+/gi)
        } else {
            var e = [k]
        }
        for (l in e) {
            if (!e.hasOwnProperty(l)) {
                continue
            }
            if (e[l].toString().indexOf("+") > -1) {
                var d = [];
                var h = e[l].split("+");
                for (j in h) {
                    d[j] = g[h[j]]
                }
                e[l] = d
            } else {
                e[l] = g[e[l]]
            }
        }
        function c(p) {
            var q, o = {};
            for (q in p) {
                if (p.hasOwnProperty(q)) {
                    o[p[q]] = q
                }
            }
            return o
        }
        var f = c(g);
        return this.each(function () {
            $this = b(this);
            var o = [];
            $this.bind("keydown", function (r) {
                o[r.keyCode] = r.keyCode;
                if (b.inArray(r.keyCode, e) > -1) {
                    if (typeof m == "function") {
                        m.call(this, f[r.keyCode]);
                        if (n === false) {
                            r.preventDefault()
                        }
                    }
                } else {
                    for (l in e) {
                        if (b.inArray(r.keyCode, e[l]) > -1) {
                            var q = "unchecked";
                            for (j in e[l]) {
                                if (q != false) {
                                    if (b.inArray(e[l][j], o) > -1) {
                                        q = true
                                    } else {
                                        q = false
                                    }
                                }
                            }
                            if (q === true) {
                                if (typeof m == "function") {
                                    var p = "";
                                    for (var s in o) {
                                        if (o[s] != "") {
                                            p += f[o[s]] + "+"
                                        }
                                    }
                                    p = p.substring(0, p.length - 1);
                                    m.call(this, p);
                                    if (n === false) {
                                        r.preventDefault()
                                    }
                                }
                            }
                        }
                    }
                }
            }).bind("keyup", function (p) {
                o[p.keyCode] = ""
            })
        })
    }
})(jQuery);
(function (d) {
    function c(f, e) {
        return (typeof f == "function") ? (f.call(e)) : f
    }
    function b(f, e) {
        this.$element = d(f);
        this.options = e;
        this.enabled = true;
        this.fixTitle()
    }
    b.prototype = {
        show: function () {
            var h = this.getTitle();
            if (h && this.enabled) {
                var g = this.tip();
                g.find(".tipsy-inner")[this.options.html ? "html" : "text"](h);
                g[0].className = "tipsy";
                g.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).prependTo(document.body);
                var l = d.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });
                var e = g[0].offsetWidth,
                    k = g[0].offsetHeight,
                    j = c(this.options.gravity, this.$element[0]);
                var f;
                switch (j.charAt(0)) {
                case "n":
                    f = {
                        top: l.top + l.height + this.options.offset,
                        left: l.left + l.width / 2 - e / 2
                    };
                    break;
                case "s":
                    f = {
                        top: l.top - k - this.options.offset,
                        left: l.left + l.width / 2 - e / 2
                    };
                    break;
                case "e":
                    f = {
                        top: l.top + l.height / 2 - k / 2,
                        left: l.left - e - this.options.offset
                    };
                    break;
                case "w":
                    f = {
                        top: l.top + l.height / 2 - k / 2,
                        left: l.left + l.width + this.options.offset
                    };
                    break
                }
                if (j.length == 2) {
                    if (j.charAt(1) == "w") {
                        f.left = l.left + l.width / 2 - 15
                    } else {
                        f.left = l.left + l.width / 2 - e + 15
                    }
                }
                g.css(f).addClass("tipsy-" + j);
                g.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + j.charAt(0);
                if (this.options.className) {
                    g.addClass(c(this.options.className, this.$element[0]))
                }
                if (this.options.fade) {
                    g.stop().css({
                        opacity: 0,
                        display: "block",
                        visibility: "visible"
                    }).animate({
                        opacity: this.options.opacity
                    })
                } else {
                    g.css({
                        visibility: "visible",
                        opacity: this.options.opacity
                    })
                }
            }
        },
        hide: function () {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function () {
                    d(this).remove()
                })
            } else {
                this.tip().remove()
            }
        },
        fixTitle: function () {
            var e = this.$element;
            if (e.attr("title") || typeof (e.attr("original-title")) != "string") {
                e.attr("original-title", e.attr("title") || "").removeAttr("title")
            }
        },
        getTitle: function () {
            var g, e = this.$element,
                f = this.options;
            this.fixTitle();
            var g, f = this.options;
            if (typeof f.title == "string") {
                g = e.attr(f.title == "title" ? "original-title" : f.title)
            } else {
                if (typeof f.title == "function") {
                    g = f.title.call(e[0])
                }
            }
            g = ("" + g).replace(/(^\s*|\s*$)/, "");
            return g || f.fallback
        },
        tip: function () {
            if (!this.$tip) {
                this.$tip = d('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>')
            }
            return this.$tip
        },
        validate: function () {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null
            }
        },
        enable: function () {
            this.enabled = true
        },
        disable: function () {
            this.enabled = false
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        }
    };
    d.fn.tipsy = function (j) {
        if (j === true) {
            return this.data("tipsy")
        } else {
            if (typeof j == "string") {
                var l = this.data("tipsy");
                if (l) {
                    l[j]()
                }
                return this
            }
        }
        j = d.extend({}, d.fn.tipsy.defaults, j);

        function h(n) {
            var o = d.data(n, "tipsy");
            if (!o) {
                o = new b(n, d.fn.tipsy.elementOptions(n, j));
                d.data(n, "tipsy", o)
            }
            return o
        }
        function m() {
            var n = h(this);
            n.hoverState = "in";
            if (j.delayIn == 0) {
                n.show()
            } else {
                n.fixTitle();
                setTimeout(function () {
                    if (n.hoverState == "in") {
                        n.show()
                    }
                }, j.delayIn)
            }
        }
        function g() {
            var n = h(this);
            n.hoverState = "out";
            if (j.delayOut == 0) {
                n.hide()
            } else {
                setTimeout(function () {
                    if (n.hoverState == "out") {
                        n.hide()
                    }
                }, j.delayOut)
            }
        }
        if (!j.live) {
            this.each(function () {
                h(this)
            })
        }
        if (j.trigger != "manual") {
            var e = j.live ? "live" : "bind",
                k = j.trigger == "hover" ? "mouseenter" : "focus",
                f = j.trigger == "hover" ? "mouseleave" : "blur";
            this[e](k, m)[e](f, g)
        }
        return this
    };
    d.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: "",
        gravity: "n",
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: "title",
        trigger: "hover"
    };
    d.fn.tipsy.elementOptions = function (f, e) {
        return d.metadata ? d.extend({}, e, d(f).metadata()) : e
    };
    d.fn.tipsy.autoNS = function () {
        return d(this).offset().top > (d(document).scrollTop() + d(window).height() / 2) ? "s" : "n"
    };
    d.fn.tipsy.autoWE = function () {
        return d(this).offset().left > (d(document).scrollLeft() + d(window).width() / 2) ? "e" : "w"
    };
    d.fn.tipsy.autoBounds = function (f, e) {
        return function () {
            var g = {
                ns: e[0],
                ew: (e.length > 1 ? e[1] : false)
            },
                k = d(document).scrollTop() + f,
                h = d(document).scrollLeft() + f,
                j = d(this);
            if (j.offset().top < k) {
                g.ns = "n"
            }
            if (j.offset().left < h) {
                g.ew = "w"
            }
            if (d(window).width() + d(document).scrollLeft() - j.offset().left < f) {
                g.ew = "e"
            }
            if (d(window).height() + d(document).scrollTop() - j.offset().top < f) {
                g.ns = "s"
            }
            return g.ns + (g.ew ? g.ew : "")
        }
    }
})(jQuery);
(function (p, k, m) {
    k.infinitescroll = function A(D, F, E) {
        this.element = k(E);
        this._create(D, F)
    };
    k.infinitescroll.defaults = {
        loading: {
            finished: m,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: "http://www.infinite-scroll.com/loading.gif",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: "fast",
            start: m
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false,
            isPaused: false,
            currPage: 1
        },
        callback: m,
        debug: false,
        behavior: m,
        binder: k(p),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: m,
        dataType: "html",
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () {},
        infid: 0,
        pixelsFromNavToBottom: m,
        path: m
    };
    k.infinitescroll.prototype = {
        _binding: function h(F) {
            var D = this,
                E = D.options;
            E.v = "2.0b2.111027";
            if ( !! E.behavior && this["_binding_" + E.behavior] !== m) {
                this["_binding_" + E.behavior].call(this);
                return
            }
            if (F !== "bind" && F !== "unbind") {
                this._debug("Binding value  " + F + " not valid");
                return false
            }
            if (F == "unbind") {
                (this.options.binder).unbind("smartscroll.infscr." + D.options.infid)
            } else {
                (this.options.binder)[F]("smartscroll.infscr." + D.options.infid, function () {
                    D.scroll()
                })
            }
            this._debug("Binding", F)
        },
        _create: function u(D, H) {
            if (!this._validate(D)) {
                return false
            }
            var E = this.options = k.extend(true, {}, k.infinitescroll.defaults, D),
                G = /(.*?\/\/).*?(\/.*)/,
                F = k(E.nextSelector).attr("href");
            E.contentSelector = E.contentSelector || this.element;
            E.loading.selector = E.loading.selector || E.contentSelector;
            if (!F) {
                this._debug("Navigation selector not found");
                return
            }
            E.path = this._determinepath(F);
            E.loading.msg = k('<div id="infscr-loading"><img alt="Loading..." src="' + E.loading.img + '" /><div>' + E.loading.msgText + "</div></div>");
            (new Image()).src = E.loading.img;
            E.pixelsFromNavToBottom = k(document).height() - k(E.navSelector).offset().top;
            E.loading.start = E.loading.start ||
            function () {
                k(E.navSelector).hide();
                E.loading.msg.appendTo(E.loading.selector).show(E.loading.speed, function () {
                    beginAjax(E)
                })
            };
            E.loading.finished = E.loading.finished ||
            function () {
                E.loading.msg.fadeOut("normal")
            };
            E.callback = function (I, J) {
                if ( !! E.behavior && I["_callback_" + E.behavior] !== m) {
                    I["_callback_" + E.behavior].call(k(E.contentSelector)[0], J)
                }
                if (H) {
                    H.call(k(E.contentSelector)[0], J, E)
                }
            };
            this._setup()
        },
        _debug: function r() {
            if (this.options && this.options.debug) {
                return p.console && console.log.call(console, arguments)
            }
        },
        _determinepath: function B(E) {
            var D = this.options;
            if ( !! D.behavior && this["_determinepath_" + D.behavior] !== m) {
                this["_determinepath_" + D.behavior].call(this, E);
                return
            }
            if ( !! D.pathParse) {
                this._debug("pathParse manual");
                return D.pathParse()
            } else {
                if (E.match(/^(.*?)\b2\b(.*?$)/)) {
                    E = E.match(/^(.*?)\b2\b(.*?$)/).slice(1)
                } else {
                    if (E.match(/^(.*?)2(.*?$)/)) {
                        if (E.match(/^(.*?page=)2(\/.*|$)/)) {
                            E = E.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                            return E
                        }
                        E = E.match(/^(.*?)2(.*?$)/).slice(1)
                    } else {
                        if (E.match(/^(.*?page=)1(\/.*|$)/)) {
                            E = E.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                            return E
                        } else {
                            this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
                            D.state.isInvalidPage = true
                        }
                    }
                }
            }
            this._debug("determinePath", E);
            return E
        },
        _error: function w(E) {
            var D = this.options;
            if ( !! D.behavior && this["_error_" + D.behavior] !== m) {
                this["_error_" + D.behavior].call(this, E);
                return
            }
            if (E !== "destroy" && E !== "end") {
                E = "unknown"
            }
            this._debug("Error", E);
            if (E == "end") {
                this._showdonemsg()
            }
            D.state.isDone = true;
            D.state.currPage = 1;
            D.state.isPaused = false;
            this._binding("unbind")
        },
        _loadcallback: function d(H, I) {
            var G = this.options,
                K = this.options.callback,
                D = (G.state.isDone) ? "done" : (!G.appendCallback) ? "no-append" : "append",
                J;
            if ( !! G.behavior && this["_loadcallback_" + G.behavior] !== m) {
                this["_loadcallback_" + G.behavior].call(this, H, I);
                return
            }
            switch (D) {
            case "done":
                this._showdonemsg();
                return false;
                break;
            case "no-append":
                if (G.dataType == "html") {
                    I = "<div>" + I + "</div>";
                    I = k(I).find(G.itemSelector)
                }
                break;
            case "append":
                var F = H.children();
                if (F.length == 0) {
                    return this._error("end")
                }
                J = document.createDocumentFragment();
                while (H[0].firstChild) {
                    J.appendChild(H[0].firstChild)
                }
                this._debug("contentSelector", k(G.contentSelector)[0]);
                k(G.contentSelector)[0].appendChild(J);
                I = F.get();
                break
            }
            G.loading.finished.call(k(G.contentSelector)[0], G);
            if (G.animate) {
                var E = k(p).scrollTop() + k("#infscr-loading").height() + G.extraScrollPx + "px";
                k("html,body").animate({
                    scrollTop: E
                }, 800, function () {
                    G.state.isDuringAjax = false
                })
            }
            if (!G.animate) {
                G.state.isDuringAjax = false
            }
            K(this, I)
        },
        _nearbottom: function v() {
            var E = this.options,
                D = 0 + k(document).height() - (E.binder.scrollTop()) - k(p).height();
            if ( !! E.behavior && this["_nearbottom_" + E.behavior] !== m) {
                this["_nearbottom_" + E.behavior].call(this);
                return
            }
            this._debug("math:", D, E.pixelsFromNavToBottom);
            return (D - E.bufferPx < E.pixelsFromNavToBottom)
        },
        _pausing: function n(E) {
            var D = this.options;
            if ( !! D.behavior && this["_pausing_" + D.behavior] !== m) {
                this["_pausing_" + D.behavior].call(this, E);
                return
            }
            if (E !== "pause" && E !== "resume" && E !== null) {
                this._debug("Invalid argument. Toggling pause value instead")
            }
            E = (E && (E == "pause" || E == "resume")) ? E : "toggle";
            switch (E) {
            case "pause":
                D.state.isPaused = true;
                break;
            case "resume":
                D.state.isPaused = false;
                break;
            case "toggle":
                D.state.isPaused = !D.state.isPaused;
                break
            }
            this._debug("Paused", D.state.isPaused);
            return false
        },
        _setup: function s() {
            var D = this.options;
            if ( !! D.behavior && this["_setup_" + D.behavior] !== m) {
                this["_setup_" + D.behavior].call(this);
                return
            }
            this._binding("bind");
            return false
        },
        _showdonemsg: function b() {
            var D = this.options;
            if ( !! D.behavior && this["_showdonemsg_" + D.behavior] !== m) {
                this["_showdonemsg_" + D.behavior].call(this);
                return
            }
            D.loading.msg.find("img").hide().parent().find("div").html(D.loading.finishedMsg).animate({
                opacity: 1
            }, 2000, function () {
                k(this).parent().fadeOut("normal")
            });
            D.errorCallback.call(k(D.contentSelector)[0], "done")
        },
        _validate: function x(E) {
            for (var D in E) {
                if (D.indexOf && D.indexOf("Selector") > -1 && k(E[D]).length === 0) {
                    this._debug("Your " + D + " found no elements.");
                    return false
                }
                return true
            }
        },
        bind: function q() {
            this._binding("bind")
        },
        destroy: function C() {
            this.options.state.isDestroyed = true;
            return this._error("destroy")
        },
        pause: function f() {
            this._pausing("pause")
        },
        resume: function j() {
            this._pausing("resume")
        },
        retrieve: function c(J) {
            var K = this,
                E = K.options,
                M = E.path,
                G, L, N, D, F, J = J || null,
                I = ( !! J) ? J : E.state.currPage;
            beginAjax = function H(O) {
                O.state.currPage++;
                K._debug("heading into ajax", M);
                G = k(O.contentSelector).is("table") ? k("<tbody/>") : k("<div/>");
                N = M.join(O.state.currPage);
                D = (O.dataType == "html" || O.dataType == "json") ? O.dataType : "html+callback";
                if (O.appendCallback && O.dataType == "html") {
                    D += "+callback"
                }
                switch (D) {
                case "html+callback":
                    K._debug("Using HTML via .load() method");
                    G.load(N + " " + O.itemSelector, null, function P(Q) {
                        K._loadcallback(G, Q)
                    });
                    break;
                case "html":
                case "json":
                    K._debug("Using " + (D.toUpperCase()) + " via $.ajax() method");
                    k.ajax({
                        url: N,
                        dataType: O.dataType,
                        complete: function P(Q, R) {
                            F = (typeof (Q.isResolved) !== "undefined") ? (Q.isResolved()) : (R === "success" || R === "notmodified");
                            (F) ? K._loadcallback(G, Q.responseText) : K._error("end")
                        }
                    });
                    break
                }
            };
            if ( !! E.behavior && this["retrieve_" + E.behavior] !== m) {
                this["retrieve_" + E.behavior].call(this, J);
                return
            }
            if (E.state.isDestroyed) {
                this._debug("Instance is destroyed");
                return false
            }
            E.state.isDuringAjax = true;
            E.loading.start.call(k(E.contentSelector)[0], E)
        },
        scroll: function g() {
            var D = this.options,
                E = D.state;
            if ( !! D.behavior && this["scroll_" + D.behavior] !== m) {
                this["scroll_" + D.behavior].call(this);
                return
            }
            if (E.isDuringAjax || E.isInvalidPage || E.isDone || E.isDestroyed || E.isPaused) {
                return
            }
            if (!this._nearbottom()) {
                return
            }
            this.retrieve()
        },
        toggle: function z() {
            this._pausing()
        },
        unbind: function o() {
            this._binding("unbind")
        },
        update: function l(D) {
            if (k.isPlainObject(D)) {
                this.options = k.extend(true, this.options, D)
            }
        }
    };
    k.fn.infinitescroll = function e(F, G) {
        var E = typeof F;
        switch (E) {
        case "string":
            var D = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var H = k.data(this, "infinitescroll");
                if (!H) {
                    return false
                }
                if (!k.isFunction(H[F]) || F.charAt(0) === "_") {
                    return false
                }
                H[F].apply(H, D)
            });
            break;
        case "object":
            this.each(function () {
                var H = k.data(this, "infinitescroll");
                if (H) {
                    H.update(F)
                } else {
                    k.data(this, "infinitescroll", new k.infinitescroll(F, G, this))
                }
            });
            break
        }
        return this
    };
    var y = k.event,
        t;
    y.special.smartscroll = {
        setup: function () {
            k(this).bind("scroll", y.special.smartscroll.handler)
        },
        teardown: function () {
            k(this).unbind("scroll", y.special.smartscroll.handler)
        },
        handler: function (G, D) {
            var F = this,
                E = arguments;
            G.type = "smartscroll";
            if (t) {
                clearTimeout(t)
            }
            t = setTimeout(function () {
                k.event.handle.apply(F, E)
            }, D === "execAsap" ? 0 : 100)
        }
    };
    k.fn.smartscroll = function (D) {
        return D ? this.bind("smartscroll", D) : this.trigger("smartscroll", ["execAsap"])
    }
})(window, jQuery);
(function (e) {
    e.timeago = function (h) {
        if (h instanceof Date) {
            return b(h)
        } else {
            if (typeof h == "string") {
                return b(e.timeago.parse(h))
            } else {
                return b(e.timeago.datetime(h))
            }
        }
    };
    var g = e.timeago;
    e.extend(e.timeago, {
        settings: {
            refreshMillis: 60000,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function (n) {
            var o = this.settings.strings;
            var k = o.prefixAgo;
            var s = o.suffixAgo;
            if (this.settings.allowFuture) {
                if (n < 0) {
                    k = o.prefixFromNow;
                    s = o.suffixFromNow
                }
                n = Math.abs(n)
            }
            var q = n / 1000;
            var h = q / 60;
            var p = h / 60;
            var r = p / 24;
            var l = r / 365;

            function j(t, v) {
                var u = e.isFunction(t) ? t(v, n) : t;
                var w = (o.numbers && o.numbers[v]) || v;
                return u.replace(/%d/i, w)
            }
            var m = q < 45 && j(o.seconds, Math.round(q)) || q < 90 && j(o.minute, 1) || h < 45 && j(o.minutes, Math.round(h)) || h < 90 && j(o.hour, 1) || p < 24 && j(o.hours, Math.round(p)) || p < 48 && j(o.day, 1) || r < 30 && j(o.days, Math.floor(r)) || r < 60 && j(o.month, 1) || r < 365 && j(o.months, Math.floor(r / 30)) || l < 2 && j(o.year, 1) || j(o.years, Math.floor(l));
            return e.trim([k, m, s].join(" "))
        },
        parse: function (j) {
            var h = e.trim(j);
            h = h.replace(/\.\d\d\d+/, "");
            h = h.replace(/-/, "/").replace(/-/, "/");
            h = h.replace(/T/, " ").replace(/Z/, " UTC");
            h = h.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            return new Date(h)
        },
        datetime: function (j) {
            var k = e(j).get(0).tagName.toLowerCase() == "time";
            var h = k ? e(j).attr("datetime") : e(j).attr("title");
            return g.parse(h)
        }
    });
    e.fn.timeago = function () {
        var j = this;
        j.each(d);
        var h = g.settings;
        if (h.refreshMillis > 0) {
            setInterval(function () {
                j.each(d)
            }, h.refreshMillis)
        }
        return j
    };

    function d() {
        var h = c(this);
        if (!isNaN(h.datetime)) {
            e(this).text(b(h.datetime))
        }
        return this
    }
    function c(h) {
        h = e(h);
        if (!h.data("timeago")) {
            h.data("timeago", {
                datetime: g.datetime(h)
            });
            var j = e.trim(h.text());
            if (j.length > 0) {
                h.attr("title", j)
            }
        }
        return h.data("timeago")
    }
    function b(h) {
        return g.inWords(f(h))
    }
    function f(h) {
        return (new Date().getTime() - h.getTime())
    }
    document.createElement("abbr");
    document.createElement("time")
})(jQuery);
if (Swell.lang == "de") {
    jQuery.timeago.settings.strings = {
        prefixAgo: "vor",
        prefixFromNow: "in",
        suffixAgo: "",
        suffixFromNow: "",
        seconds: "wenigen Sekunden",
        minute: "etwa einer Minute",
        minutes: "%d Minuten",
        hour: "etwa einer Stunde",
        hours: "%d Stunden",
        day: "etwa einem Tag",
        days: "%d Tagen",
        month: "etwa einem Monat",
        months: "%d Monaten",
        year: "etwa einem Jahr",
        years: "%d Jahren"
    }
}
if (Swell.lang == "fr") {
    jQuery.timeago.settings.strings = {
        prefixAgo: "il y a",
        prefixFromNow: "d'ici",
        seconds: "moins d'une minute",
        minute: "environ une minute",
        minutes: "environ %d minutes",
        hour: "environ une heure",
        hours: "environ %d heures",
        day: "environ un jour",
        days: "environ %d jours",
        month: "environ un mois",
        months: "environ %d mois",
        year: "un an",
        years: "%d ans"
    }
}
if (Swell.lang == "jp") {
    jQuery.timeago.settings.strings = {
        prefixAgo: "",
        prefixFromNow: "ä»Šã‹ã‚‰",
        suffixAgo: "å‰",
        suffixFromNow: "å¾Œ",
        seconds: "ã»ã‚“ã®æ•°ç§’",
        minute: "ç´„ä¸€åˆ†",
        minutes: "%d åˆ†",
        hour: "å¤§ä½“ä¸€æ™‚é–“",
        hours: "å¤§ä½“ %d æ™‚é–“ä½",
        day: "ä¸€æ—¥",
        days: "%d æ—¥ã»ã©",
        month: "å¤§ä½“ä¸€ãƒ¶æœˆ",
        months: "%d ãƒ¶æœˆã»ã©",
        year: "ä¸åº¦ä¸€å¹´ï¼ˆè™Žèˆžæµï½—ï¼‰",
        years: "%d å¹´"
    }
}
if (Swell.lang == "it") {
    jQuery.timeago.settings.strings = {
        suffixAgo: "fa",
        suffixFromNow: "da ora",
        seconds: "meno di un minuto",
        minute: "circa un minuto",
        minutes: "%d minuti",
        hour: "circa un'ora",
        hours: "circa %d ore",
        day: "un giorno",
        days: "%d giorni",
        month: "circa un mese",
        months: "%d mesi",
        year: "circa un anno",
        years: "%d anni"
    }
}(function (b) {
    b.fn.jflickrfeed = function (e, g) {
        e = b.extend(true, {
            flickrbase: "http://api.flickr.com/services/feeds/",
            feedapi: "photos_public.gne",
            limit: 20,
            qstrings: {
                lang: "en-us",
                format: "json",
                jsoncallback: "?"
            },
            cleanDescription: true,
            useTemplate: true,
            itemTemplate: "",
            itemCallback: function () {}
        }, e);
        var c = e.flickrbase + e.feedapi + "?";
        var f = true;
        for (var d in e.qstrings) {
            if (!f) {
                c += "&"
            }
            c += d + "=" + e.qstrings[d];
            f = false
        }
        return b(this).each(function () {
            var j = b(this);
            var h = this;
            b.getJSON(c, function (k) {
                b.each(k.items, function (o, r) {
                    if (o < e.limit) {
                        if (e.cleanDescription) {
                            var q = /<p>(.*?)<\/p>/g;
                            var l = r.description;
                            if (q.test(l)) {
                                r.description = l.match(q)[2];
                                if (r.description != undefined) {
                                    r.description = r.description.replace("<p>", "").replace("</p>", "")
                                }
                            }
                        }
                        r.image_s = r.media.m.replace("_m", "_s");
                        r.image_t = r.media.m.replace("_m", "_t");
                        r.image_m = r.media.m.replace("_m", "_m");
                        r.image = r.media.m.replace("_m", "");
                        r.image_b = r.media.m.replace("_m", "_b");
                        delete r.media;
                        if (e.useTemplate) {
                            var p = e.itemTemplate;
                            for (var n in r) {
                                var m = new RegExp("{{" + n + "}}", "g");
                                p = p.replace(m, r[n])
                            }
                            j.append(p)
                        }
                        e.itemCallback.call(h, r)
                    }
                });
                if (b.isFunction(g)) {
                    g.call(h, k)
                }
            })
        })
    }
})(jQuery);
(function (b) {
    b.tumblrShare = function (e, d) {
        var g = {
            url: "",
            title: "",
            media: "",
            via: "",
            twitter: true,
            facebook: true,
            gplus: true,
            pinterest: false,
            size: "horizontal",
            onInit: function () {},
            onComplete: function () {}
        };
        var f = this;
        f.settings = {};
        var c = b(e),
            e = e;
        f.init = function () {
            f.settings = b.extend({}, g, d);
            f.settings.onInit();
            var o = encodeURIComponent(f.settings.url);
            var n = encodeURIComponent(f.settings.media);
            if (f.settings.twitter) {
                var k = b('<div class="share-button share-twitter"></div>');
                var r = b('<a href="http://twitter.com/share" class="twitter-share-button" data-url="' + f.settings.url + '" data-via=' + f.settings.via + "></a>");
                if (f.settings.size == "horizontal") {
                    r.attr("data-count", "horizontal")
                }
                if (f.settings.size == "vertical") {
                    r.attr("data-count", "vertical")
                }
                k.append(r);
                c.append(k)
            }
            if (f.settings.facebook) {
                var p = b('<div class="share-button share-facebook"></div>');
                if (f.settings.size == "horizontal") {
                    var m = b('<iframe src="http://www.facebook.com/plugins/like.php?href=' + o + '&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>')
                }
                if (f.settings.size == "vertical") {
                    var m = b('<iframe src="http://www.facebook.com/plugins/like.php?href=' + o + '&amp;send=false&amp;layout=box_count&amp;show_faces=false&amp;action=like&amp;font=lucida+grande&amp;colorscheme=light&amp;height=65&amp;width=55" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:65px;" allowTransparency="true"></iframe>')
                }
                p.append(m);
                c.append(p)
            }
            if (f.settings.gplus) {
                var j = b('<div class="share-button share-gplus"></div>');
                var h = b('<g:plusone href="' + f.settings.url + '"></g:plusone>');
                if (f.settings.size == "horizontal") {
                    h.attr("size", "medium")
                }
                if (f.settings.size == "vertical") {
                    h.attr("size", "tall")
                }
                j.append(h);
                c.append(j)
            }
            if (f.settings.pinterest) {
                var q = b('<div class="share-button share-pinterest"></div>');
                var l = b('<a href="http://pinterest.com/pin/create/button/?url=' + o + "&media=" + n + '" class="pin-it-button"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>');
                if (f.settings.size == "horizontal") {
                    l.attr("count-layout", "horizontal")
                }
                if (f.settings.size == "vertical") {
                    l.attr("count-layout", "vertical")
                }
                q.append(l);
                c.append(q)
            }
            f.settings.onComplete()
        };
        f.init()
    };
    b.fn.tumblrShare = function (c) {
        return this.each(function () {
            if (undefined === b(this).data("tumblrShare")) {
                var d = new b.tumblrShare(this, c);
                b(this).data("tumblrShare", d)
            }
        })
    }
})(jQuery);
(function (b) {
    b.backstretch = function (c, s, r) {
        var n = {
            centeredX: true,
            centeredY: true,
            speed: 0
        },
            f = b("#backstretch"),
            h = f.data("settings") || n,
            j = f.data("settings"),
            d = ("onorientationchange" in window) ? b(document) : b(window),
            g, e, m, l, q, p;
        if (s && typeof s == "object") {
            b.extend(h, s)
        }
        b(document).ready(o);
        return this;

        function o() {
            if (c) {
                var t;
                if (f.length == 0) {
                    f = b("<div />").attr("id", "backstretch").css({
                        left: 0,
                        top: 0,
                        position: "fixed",
                        overflow: "hidden",
                        zIndex: -999999,
                        margin: 0,
                        padding: 0,
                        height: "100%",
                        width: "100%"
                    })
                } else {
                    f.find("img").addClass("deleteable")
                }
                t = b("<img />").css({
                    position: "absolute",
                    display: "none",
                    margin: 0,
                    padding: 0,
                    border: "none",
                    zIndex: -999999
                }).bind("load", function (x) {
                    var w = b(this),
                        v, u;
                    w.css({
                        width: "auto",
                        height: "auto"
                    });
                    v = this.width || b(x.target).width();
                    u = this.height || b(x.target).height();
                    g = v / u;
                    k(function () {
                        w.fadeIn(h.speed, function () {
                            f.find(".deleteable").remove();
                            if (typeof r == "function") {
                                r()
                            }
                        })
                    })
                }).appendTo(f);
                if (b("body #backstretch").length == 0) {
                    b("body").append(f)
                }
                f.data("settings", h);
                t.attr("src", c);
                b(window).resize(k)
            }
        }
        function k(t) {
            try {
                p = {
                    left: 0,
                    top: 0
                };
                m = d.width();
                l = m / g;
                if (l >= d.height()) {
                    q = (l - d.height()) / 2;
                    if (h.centeredY) {
                        b.extend(p, {
                            top: "-" + q + "px"
                        })
                    }
                } else {
                    l = d.height();
                    m = l * g;
                    q = (m - d.width()) / 2;
                    if (h.centeredX) {
                        b.extend(p, {
                            left: "-" + q + "px"
                        })
                    }
                }
                b("#backstretch, #backstretch img:last").width(m).height(l).filter("img").css(p)
            } catch (u) {}
            if (typeof t == "function") {
                t()
            }
        }
    }
})(jQuery);
