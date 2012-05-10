(function (J, I, H) {
    var G = function (b) {
            return b.charAt(0).toUpperCase() + b.slice(1)
        },
        F = "Moz Webkit Khtml O Ms".split(" "),
        E = function (e) {
            var d = document.documentElement.style,
                j;
            if (typeof d[e] == "string") {
                return e
            }
            e = G(e);
            for (var i = 0, h = F.length; i < h; i++) {
                j = F[i] + e;
                if (typeof d[j] == "string") {
                    return j
                }
            }
        },
        D = E("transform"),
        C = E("transitionProperty"),
        B = {
            csstransforms: function () {
                return !!D
            },
            csstransforms3d: function () {
                var b = !! E("perspective");
                if (b) {
                    var j = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        i = "@media (" + j.join("transform-3d),(") + "modernizr)",
                        h = I("<style>" + i + "{#modernizr{height:3px}}</style>").appendTo("head"),
                        f = I('<div id="modernizr" />').appendTo("html");
                    b = f.height() === 3, f.remove(), h.remove()
                }
                return b
            },
            csstransitions: function () {
                return !!C
            }
        };
    if (J.Modernizr) {
        for (var A in B) {
            Modernizr.hasOwnProperty(A) || Modernizr.addTest(A, B[A])
        }
    } else {
        J.Modernizr = function () {
            var b = {
                _version: "1.6ish: miniModernizr for Isotope"
            },
                h = " ",
                g, f;
            for (f in B) {
                g = B[f](), b[f] = g, h += " " + (g ? "" : "no-") + f
            }
            I("html").addClass(h);
            return b
        }()
    }
    if (Modernizr.csstransforms) {
        var z = Modernizr.csstransforms3d ? {
            translate: function (b) {
                return "translate3d(" + b[0] + "px, " + b[1] + "px, 0) "
            },
            scale: function (b) {
                return "scale3d(" + b + ", " + b + ", 1) "
            }
        } : {
            translate: function (b) {
                return "translate(" + b[0] + "px, " + b[1] + "px) "
            },
            scale: function (b) {
                return "scale(" + b + ") "
            }
        },
            y = function (N, M, L) {
                var K = I.data(N, "isoTransform") || {},
                    r = {},
                    q, p = {},
                    o;
                r[M] = L, I.extend(K, r);
                for (q in K) {
                    o = K[q], p[q] = z[q](o)
                }
                var k = p.translate || "",
                    g = p.scale || "",
                    b = k + g;
                I.data(N, "isoTransform", K), N.style[D] = b
            };
        I.cssNumber.scale = !0, I.cssHooks.scale = {
            set: function (d, c) {
                y(d, "scale", c)
            },
            get: function (b, f) {
                var e = I.data(b, "isoTransform");
                return e && e.scale ? e.scale : 1
            }
        }, I.fx.step.scale = function (b) {
            I.cssHooks.scale.set(b.elem, b.now + b.unit)
        }, I.cssNumber.translate = !0, I.cssHooks.translate = {
            set: function (d, c) {
                y(d, "translate", c)
            },
            get: function (b, f) {
                var e = I.data(b, "isoTransform");
                return e && e.translate ? e.translate : [0, 0]
            }
        }
    }
    var x, w;
    Modernizr.csstransitions && (x = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd",
        transitionProperty: "transitionEnd"
    }[C], w = E("transitionDuration"));
    var v = I.event,
        u;
    v.special.smartresize = {
        setup: function () {
            I(this).bind("resize", v.special.smartresize.handler)
        },
        teardown: function () {
            I(this).unbind("resize", v.special.smartresize.handler)
        },
        handler: function (f, e) {
            var h = this,
                g = arguments;
            f.type = "smartresize", u && clearTimeout(u), u = setTimeout(function () {
                jQuery.event.handle.apply(h, g)
            }, e === "execAsap" ? 0 : 100)
        }
    }, I.fn.smartresize = function (b) {
        return b ? this.bind("smartresize", b) : this.trigger("smartresize", ["execAsap"])
    }, I.Isotope = function (b, f, e) {
        this.element = I(f), this._create(b), this._init(e)
    };
    var t = ["overflow", "position", "width", "height"];
    I.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: Modernizr.csstransforms && !I.browser.opera ? {
            opacity: 0,
            scale: 0.001
        } : {
            opacity: 0
        },
        visibleStyle: Modernizr.csstransforms && !I.browser.opera ? {
            opacity: 1,
            scale: 1
        } : {
            opacity: 1
        },
        animationEngine: I.browser.opera ? "jquery" : "best-available",
        animationOptions: {
            queue: !1,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    }, I.Isotope.prototype = {
        _create: function (q) {
            this.options = I.extend({}, I.Isotope.settings, q), this.styleQueue = [], this.elemCount = 0;
            var p = this.element[0].style;
            this.originalStyle = {};
            for (var o = 0, n = t.length; o < n; o++) {
                var m = t[o];
                this.originalStyle[m] = p[m] || ""
            }
            this.element.css({
                overflow: "hidden",
                position: "relative"
            }), this._updateAnimationEngine(), this._updateUsingTransforms();
            var l = {
                "original-order": function (d, c) {
                    c.elemCount++;
                    return c.elemCount
                },
                random: function () {
                    return Math.random()
                }
            };
            this.options.getSortData = I.extend(this.options.getSortData, l), this.reloadItems();
            var k = I(document.createElement("div")).prependTo(this.element);
            this.offset = k.position(), k.remove();
            var b = this;
            setTimeout(function () {
                b.element.addClass(b.options.containerClass)
            }, 0), this.options.resizable && I(J).bind("smartresize.isotope", function () {
                b.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function () {
                return !1
            })
        },
        _getAtoms: function (f) {
            var e = this.options.itemSelector,
                h = e ? f.filter(e).add(f.find(e)) : f,
                g = {
                    position: "absolute"
                };
            this.usingTransforms && (g.left = 0, g.top = 0), h.css(g).addClass(this.options.itemClass), this.updateSortData(h, !0);
            return h
        },
        _init: function (b) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(b)
        },
        option: function (b) {
            if (I.isPlainObject(b)) {
                this.options = I.extend(!0, this.options, b);
                var f;
                for (var d in b) {
                    f = "_update" + G(d), this[f] && this[f]()
                }
            }
        },
        _updateAnimationEngine: function () {
            var b = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "");
            switch (b) {
            case "css":
            case "none":
                this.isUsingJQueryAnimation = !1;
                break;
            case "jquery":
                this.isUsingJQueryAnimation = !0;
                break;
            default:
                this.isUsingJQueryAnimation = !Modernizr.csstransitions
            }
            this._updateUsingTransforms()
        },
        _updateTransformsEnabled: function () {
            this._updateUsingTransforms()
        },
        _updateUsingTransforms: function () {
            this.usingTransforms = this.options.transformsEnabled && Modernizr.csstransforms && Modernizr.csstransitions && !this.isUsingJQueryAnimation, this.getPositionStyles = this.usingTransforms ? this._translate : this._positionAbs
        },
        _filter: function (i) {
            var h = this.options.filter === "" ? "*" : this.options.filter;
            if (!h) {
                return i
            }
            var n = this.options.hiddenClass,
                m = "." + n,
                l = i.filter(m),
                k = l;
            if (h !== "*") {
                k = l.filter(h);
                var j = i.not(m).not(h).addClass(n);
                this.styleQueue.push({
                    $el: j,
                    style: this.options.hiddenStyle
                })
            }
            this.styleQueue.push({
                $el: k,
                style: this.options.visibleStyle
            }), k.removeClass(n);
            return i.filter(h)
        },
        updateSortData: function (b, l) {
            var k = this,
                j = this.options.getSortData,
                i, h;
            b.each(function () {
                i = I(this), h = {};
                for (var c in j) {
                    !l && c === "original-order" ? h[c] = I.data(this, "isotope-sort-data")[c] : h[c] = j[c](i, k)
                }
                I.data(this, "isotope-sort-data", h)
            })
        },
        _sort: function () {
            var f = this.options.sortBy,
                e = this._getSorter,
                h = this.options.sortAscending ? 1 : -1,
                g = function (j, i) {
                    var c = e(j, f),
                        b = e(i, f);
                    c === b && f !== "original-order" && (c = e(j, "original-order"), b = e(i, "original-order"));
                    return (c > b ? 1 : c < b ? -1 : 0) * h
                };
            this.$filteredAtoms.sort(g)
        },
        _getSorter: function (b, d) {
            return I.data(b, "isotope-sort-data")[d]
        },
        _translate: function (d, c) {
            return {
                translate: [d, c]
            }
        },
        _positionAbs: function (d, c) {
            return {
                left: d,
                top: c
            }
        },
        _pushPosition: function (f, e, h) {
            e += this.offset.left, h += this.offset.top;
            var g = this.getPositionStyles(e, h);
            this.styleQueue.push({
                $el: f,
                style: g
            }), this.options.itemPositionDataEnabled && f.data("isotope-item-position", {
                x: e,
                y: h
            })
        },
        layout: function (f, e) {
            var h = this.options.layoutMode;
            this["_" + h + "Layout"](f);
            if (this.options.resizesContainer) {
                var g = this["_" + h + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: g
                })
            }
            this._processStyleQueue(f, e), this.isLaidOut = !0
        },
        _processStyleQueue: function (T, S) {
            var R = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css",
                Q = this.options.animationOptions,
                P, O, N, M;
            O = function (d, c) {
                c.$el[R](c.style, Q)
            };
            if (this._isInserting && this.isUsingJQueryAnimation) {
                O = function (d, c) {
                    P = c.$el.hasClass("no-transition") ? "css" : R, c.$el[P](c.style, Q)
                }
            } else {
                if (S) {
                    var L = !1,
                        K = this;
                    N = !0, M = function () {
                        L || (S.call(K.element, T), L = !0)
                    };
                    if (this.isUsingJQueryAnimation && R === "animate") {
                        Q.complete = M, N = !1
                    } else {
                        if (Modernizr.csstransitions) {
                            var r = 0,
                                n = this.styleQueue[0].$el,
                                m;
                            while (!n.length) {
                                m = this.styleQueue[r++];
                                if (!m) {
                                    return
                                }
                                n = m.$el
                            }
                            var b = parseFloat(getComputedStyle(n[0])[w]);
                            b > 0 && (O = function (d, c) {
                                c.$el[R](c.style, Q).one(x, M)
                            }, N = !1)
                        }
                    }
                }
            }
            I.each(this.styleQueue, O), N && M(), this.styleQueue = []
        },
        resize: function () {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        },
        reLayout: function (b) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, b)
        },
        addItems: function (e, d) {
            var f = this._getAtoms(e);
            this.$allAtoms = this.$allAtoms.add(f), d && d(f)
        },
        insert: function (e, d) {
            this.element.append(e);
            var f = this;
            this.addItems(e, function (b) {
                var c = f._filter(b, !0);
                f._addHideAppended(c), f._sort(), f.reLayout(), f._revealAppended(c, d)
            })
        },
        appended: function (e, d) {
            var f = this;
            this.addItems(e, function (b) {
                f._addHideAppended(b), f.layout(b), f._revealAppended(b, d)
            })
        },
        _addHideAppended: function (b) {
            this.$filteredAtoms = this.$filteredAtoms.add(b), b.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({
                $el: b,
                style: this.options.hiddenStyle
            })
        },
        _revealAppended: function (e, d) {
            var f = this;
            setTimeout(function () {
                e.removeClass("no-transition"), f.styleQueue.push({
                    $el: e,
                    style: f.options.visibleStyle
                }), f._isInserting = !1, f._processStyleQueue(e, d)
            }, 10)
        },
        reloadItems: function () {
            this.$allAtoms = this._getAtoms(this.element.children())
        },
        remove: function (b) {
            this.$allAtoms = this.$allAtoms.not(b), this.$filteredAtoms = this.$filteredAtoms.not(b), b.remove()
        },
        shuffle: function (b) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(b)
        },
        destroy: function () {
            var k = this.usingTransforms;
            this.$allAtoms.removeClass(this.options.hiddenClass + " " + this.options.itemClass).each(function () {
                this.style.position = "", this.style.top = "", this.style.left = "", this.style.opacity = "", k && (this.style[D] = "")
            });
            var j = this.element[0].style;
            for (var i = 0, g = t.length; i < g; i++) {
                var b = t[i];
                j[b] = this.originalStyle[b]
            }
            this.element.unbind(".isotope").undelegate("." + this.options.hiddenClass, "click").removeClass(this.options.containerClass).removeData("isotope"), I(J).unbind(".isotope")
        },
        _getSegments: function (j) {
            var d = this.options.layoutMode,
                p = j ? "rowHeight" : "columnWidth",
                o = j ? "height" : "width",
                n = j ? "rows" : "cols",
                m = this.element[o](),
                l, k = this.options[d] && this.options[d][p] || this.$filteredAtoms["outer" + G(o)](!0) || m;
            l = Math.floor(m / k), l = Math.max(l, 1), this[d][n] = l, this[d][p] = k
        },
        _checkIfSegmentsChanged: function (f) {
            var e = this.options.layoutMode,
                h = f ? "rows" : "cols",
                g = this[e][h];
            this._getSegments(f);
            return this[e][h] !== g
        },
        _masonryReset: function () {
            this.masonry = {}, this._getSegments();
            var b = this.masonry.cols;
            this.masonry.colYs = [];
            while (b--) {
                this.masonry.colYs.push(0)
            }
        },
        _masonryLayout: function (b) {
            var f = this,
                e = f.masonry;
            b.each(function () {
                var c = I(this),
                    m = Math.ceil(c.outerWidth(!0) / e.columnWidth);
                m = Math.min(m, e.cols);
                if (m === 1) {
                    f._masonryPlaceBrick(c, e.colYs)
                } else {
                    var l = e.cols + 1 - m,
                        k = [],
                        j, d;
                    for (d = 0; d < l; d++) {
                        j = e.colYs.slice(d, d + m), k[d] = Math.max.apply(Math, j)
                    }
                    f._masonryPlaceBrick(c, k)
                }
            })
        },
        _masonryPlaceBrick: function (L, K) {
            var r = Math.min.apply(Math, K),
                q = 0;
            for (var p = 0, o = K.length; p < o; p++) {
                if (K[p] === r) {
                    q = p;
                    break
                }
            }
            var n = this.masonry.columnWidth * q,
                m = r;
            this._pushPosition(L, n, m);
            var l = r + L.outerHeight(!0),
                k = this.masonry.cols + 1 - o;
            for (p = 0; p < k; p++) {
                this.masonry.colYs[q + p] = l
            }
        },
        _masonryGetContainerSize: function () {
            var b = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: b
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
        _fitRowsLayout: function (b) {
            var h = this,
                g = this.element.width(),
                f = this.fitRows;
            b.each(function () {
                var c = I(this),
                    e = c.outerWidth(!0),
                    d = c.outerHeight(!0);
                f.x !== 0 && e + f.x > g && (f.x = 0, f.y = f.height), h._pushPosition(c, f.x, f.y), f.height = Math.max(f.y + d, f.height), f.x += e
            })
        },
        _fitRowsGetContainerSize: function () {
            return {
                height: this.fitRows.height
            }
        },
        _fitRowsResizeChanged: function () {
            return !0
        },
        _cellsByRowReset: function () {
            this.cellsByRow = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByRowLayout: function (b) {
            var f = this,
                e = this.cellsByRow;
            b.each(function () {
                var c = I(this),
                    k = e.index % e.cols,
                    j = Math.floor(e.index / e.cols),
                    i = Math.round((k + 0.5) * e.columnWidth - c.outerWidth(!0) / 2),
                    d = Math.round((j + 0.5) * e.rowHeight - c.outerHeight(!0) / 2);
                f._pushPosition(c, i, d), e.index++
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
        _straightDownLayout: function (b) {
            var d = this;
            b.each(function (c) {
                var e = I(this);
                d._pushPosition(e, 0, d.straightDown.y), d.straightDown.y += e.outerHeight(!0)
            })
        },
        _straightDownGetContainerSize: function () {
            return {
                height: this.straightDown.y
            }
        },
        _straightDownResizeChanged: function () {
            return !0
        },
        _masonryHorizontalReset: function () {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var b = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (b--) {
                this.masonryHorizontal.rowXs.push(0)
            }
        },
        _masonryHorizontalLayout: function (b) {
            var f = this,
                e = f.masonryHorizontal;
            b.each(function () {
                var c = I(this),
                    m = Math.ceil(c.outerHeight(!0) / e.rowHeight);
                m = Math.min(m, e.rows);
                if (m === 1) {
                    f._masonryHorizontalPlaceBrick(c, e.rowXs)
                } else {
                    var l = e.rows + 1 - m,
                        k = [],
                        j, d;
                    for (d = 0; d < l; d++) {
                        j = e.rowXs.slice(d, d + m), k[d] = Math.max.apply(Math, j)
                    }
                    f._masonryHorizontalPlaceBrick(c, k)
                }
            })
        },
        _masonryHorizontalPlaceBrick: function (L, K) {
            var r = Math.min.apply(Math, K),
                q = 0;
            for (var p = 0, o = K.length; p < o; p++) {
                if (K[p] === r) {
                    q = p;
                    break
                }
            }
            var n = r,
                m = this.masonryHorizontal.rowHeight * q;
            this._pushPosition(L, n, m);
            var l = r + L.outerWidth(!0),
                k = this.masonryHorizontal.rows + 1 - o;
            for (p = 0; p < k; p++) {
                this.masonryHorizontal.rowXs[q + p] = l
            }
        },
        _masonryHorizontalGetContainerSize: function () {
            var b = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: b
            }
        },
        _masonryHorizontalResizeChanged: function () {
            return this._checkIfSegmentsChanged(!0)
        },
        _fitColumnsReset: function () {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            }
        },
        _fitColumnsLayout: function (b) {
            var h = this,
                g = this.element.height(),
                f = this.fitColumns;
            b.each(function () {
                var c = I(this),
                    e = c.outerWidth(!0),
                    d = c.outerHeight(!0);
                f.y !== 0 && d + f.y > g && (f.x = f.width, f.y = 0), h._pushPosition(c, f.x, f.y), f.width = Math.max(f.x + e, f.width), f.y += d
            })
        },
        _fitColumnsGetContainerSize: function () {
            return {
                width: this.fitColumns.width
            }
        },
        _fitColumnsResizeChanged: function () {
            return !0
        },
        _cellsByColumnReset: function () {
            this.cellsByColumn = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByColumnLayout: function (b) {
            var f = this,
                e = this.cellsByColumn;
            b.each(function () {
                var c = I(this),
                    k = Math.floor(e.index / e.rows),
                    j = e.index % e.rows,
                    i = Math.round((k + 0.5) * e.columnWidth - c.outerWidth(!0) / 2),
                    d = Math.round((j + 0.5) * e.rowHeight - c.outerHeight(!0) / 2);
                f._pushPosition(c, i, d), e.index++
            })
        },
        _cellsByColumnGetContainerSize: function () {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            }
        },
        _cellsByColumnResizeChanged: function () {
            return this._checkIfSegmentsChanged(!0)
        },
        _straightAcrossReset: function () {
            this.straightAcross = {
                x: 0
            }
        },
        _straightAcrossLayout: function (b) {
            var d = this;
            b.each(function (c) {
                var e = I(this);
                d._pushPosition(e, d.straightAcross.x, 0), d.straightAcross.x += e.outerWidth(!0)
            })
        },
        _straightAcrossGetContainerSize: function () {
            return {
                width: this.straightAcross.x
            }
        },
        _straightAcrossResizeChanged: function () {
            return !0
        }
    }, I.fn.imagesLoaded = function (i) {
        function j(b) {
            --m <= 0 && b.target.src !== l && (setTimeout(k), n.unbind("load error", j))
        }
        function k() {
            i.call(c, n)
        }
        var c = this,
            n = c.find("img").add(c.filter("img")),
            m = n.length,
            l = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        m || k(), n.bind("load error", j).each(function () {
            if (this.complete || this.complete === H) {
                var b = this.src;
                this.src = l, this.src = b
            }
        });
        return c
    };
    var s = function (c) {
            J.console && J.console.error(c)
        };
    I.fn.isotope = function (b, f) {
        if (typeof b == "string") {
            var e = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var d = I.data(this, "isotope");
                if (!d) {
                    s("cannot call methods on isotope prior to initialization; attempted to call method '" + b + "'")
                } else {
                    if (!I.isFunction(d[b]) || b.charAt(0) === "_") {
                        s("no such method '" + b + "' for isotope instance");
                        return
                    }
                    d[b].apply(d, e)
                }
            })
        } else {
            this.each(function () {
                var c = I.data(this, "isotope");
                c ? (c.option(b), c._init(f)) : I.data(this, "isotope", new I.Isotope(b, this, f))
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
            var k = f.settings.layout.split("");
            for (a in k) {
                k[a] = parseInt(k[a])
            }
            var l = 0;
            var i = c.find("img");
            b.each(k, function (n, o) {
                var p = l;
                var m = o + l;
                i.slice(p, m).wrapAll('<div class="photosetRow cols' + o + '"></div>');
                l = m
            });
            c.css({
                width: f.settings.width,
                "font-size": "0px"
            });
            var j = f.settings.margin + "px";
            var h = (f.settings.margin * 2) + "px";
            c.find("img").css({
                display: "inline-block",
                "vertical-align": "top",
                "margin-left": j,
                "margin-right": j
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
                var m = b(this).find("img:eq(0)");
                b(this).find("img").each(function () {
                    if (b(this).height() < m.height()) {
                        m = b(this)
                    }
                });
                b(this).data("$smallestImg", m)
            });
            f.resizePhotoset();
            if (f.settings.links == true) {
                c.find("img").each(function () {
                    var n = b(this).attr("data-highres");
                    var p = b(this).attr("data-500px");
                    if (n !== undefined) {
                        var r = n
                    } else {
                        var r = p
                    }
                    var m = b(this).attr("alt");
                    var q = b(this).parent().parent().attr("data-photoset-id");
                    var o = '<a href="' + r + '" rel="' + q + '" title="' + m + '"></a>';
                    b(this).wrap(o)
                })
            }
            f.settings.onComplete()
        };
        f.resizePhotoset = function () {
            c.find(".photosetRow").each(function () {
                var h = b(this).data("$smallestImg").height();
                b(this).height(h);
                b(this).find("img").each(function () {
                    var i = ((h - b(this).height()) * 0.5) + "px";
                    b(this).css({
                        "margin-top": i
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

            function b(e, i, h) {
                var g = n(this),
                    f = n.data(this, t);
                f.w = i !== u ? i : g.width();
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
            var n = encodeURIComponent(f.settings.url);
            var m = encodeURIComponent(f.settings.media);
            if (f.settings.twitter) {
                var j = b('<div class="share-button share-twitter"></div>');
                var q = b('<a href="http://twitter.com/share" class="twitter-share-button" data-url="' + f.settings.url + '" data-via=' + f.settings.via + "></a>");
                if (f.settings.size == "horizontal") {
                    q.attr("data-count", "horizontal")
                }
                if (f.settings.size == "vertical") {
                    q.attr("data-count", "vertical")
                }
                j.append(q);
                c.append(j)
            }
            if (f.settings.facebook) {
                var o = b('<div class="share-button share-facebook"></div>');
                if (f.settings.size == "horizontal") {
                    var l = b('<iframe src="http://www.facebook.com/plugins/like.php?href=' + n + '&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>')
                }
                if (f.settings.size == "vertical") {
                    var l = b('<iframe src="http://www.facebook.com/plugins/like.php?href=' + n + '&amp;send=false&amp;layout=box_count&amp;show_faces=false&amp;action=like&amp;font=lucida+grande&amp;colorscheme=light&amp;height=65&amp;width=55" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:65px;" allowTransparency="true"></iframe>')
                }
                o.append(l);
                c.append(o)
            }
            if (f.settings.gplus) {
                var i = b('<div class="share-button share-gplus"></div>');
                var h = b('<g:plusone href="' + f.settings.url + '"></g:plusone>');
                if (f.settings.size == "horizontal") {
                    h.attr("size", "medium")
                }
                if (f.settings.size == "vertical") {
                    h.attr("size", "tall")
                }
                i.append(h);
                c.append(i)
            }
            if (f.settings.pinterest) {
                var p = b('<div class="share-button share-pinterest"></div>');
                var k = b('<a href="http://pinterest.com/pin/create/button/?url=' + n + "&media=" + m + '" class="pin-it-button"><img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>');
                if (f.settings.size == "horizontal") {
                    k.attr("count-layout", "horizontal")
                }
                if (f.settings.size == "vertical") {
                    k.attr("count-layout", "vertical")
                }
                p.append(k);
                c.append(p)
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
                var l = b(this);
                if (this.tagName.toLowerCase() == "embed" && l.parent("object").length || l.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                var i = this.tagName.toLowerCase() == "object" ? l.attr("height") : l.height(),
                    j = i / l.width();
                if (!l.attr("id")) {
                    var k = "fitvid" + Math.floor(Math.random() * 999999);
                    l.attr("id", k)
                }
                l.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", (j * 100) + "%");
                l.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
(function (b) {
    b.fn.hoverIntent = function (l, k) {
        var m = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        m = b.extend(m, k ? {
            over: l,
            out: k
        } : l);
        var o, n, i, e;
        var h = function (f) {
                o = f.pageX;
                n = f.pageY
            };
        var d = function (g, f) {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
                if ((Math.abs(i - o) + Math.abs(e - n)) < m.sensitivity) {
                    b(f).unbind("mousemove", h);
                    f.hoverIntent_s = 1;
                    return m.over.apply(f, [g])
                } else {
                    i = o;
                    e = n;
                    f.hoverIntent_t = setTimeout(function () {
                        d(g, f)
                    }, m.interval)
                }
            };
        var j = function (g, f) {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
                f.hoverIntent_s = 0;
                return m.out.apply(f, [g])
            };
        var c = function (r) {
                var q = (r.type == "mouseover" ? r.fromElement : r.toElement) || r.relatedTarget;
                while (q && q != this) {
                    try {
                        q = q.parentNode
                    } catch (r) {
                        q = this
                    }
                }
                if (q == this) {
                    return false
                }
                var g = jQuery.extend({}, r);
                var f = this;
                if (f.hoverIntent_t) {
                    f.hoverIntent_t = clearTimeout(f.hoverIntent_t)
                }
                if (r.type == "mouseover") {
                    i = g.pageX;
                    e = g.pageY;
                    b(f).bind("mousemove", h);
                    if (f.hoverIntent_s != 1) {
                        f.hoverIntent_t = setTimeout(function () {
                            d(g, f)
                        }, m.interval)
                    }
                } else {
                    b(f).unbind("mousemove", h);
                    if (f.hoverIntent_s == 1) {
                        f.hoverIntent_t = setTimeout(function () {
                            j(g, f)
                        }, m.timeout)
                    }
                }
            };
        return this.mouseover(c).mouseout(c)
    }
})(jQuery);
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
        inWords: function (m) {
            var n = this.settings.strings;
            var j = n.prefixAgo;
            var r = n.suffixAgo;
            if (this.settings.allowFuture) {
                if (m < 0) {
                    j = n.prefixFromNow;
                    r = n.suffixFromNow
                }
                m = Math.abs(m)
            }
            var p = m / 1000;
            var h = p / 60;
            var o = h / 60;
            var q = o / 24;
            var k = q / 365;

            function i(s, u) {
                var t = e.isFunction(s) ? s(u, m) : s;
                var v = (n.numbers && n.numbers[u]) || u;
                return t.replace(/%d/i, v)
            }
            var l = p < 45 && i(n.seconds, Math.round(p)) || p < 90 && i(n.minute, 1) || h < 45 && i(n.minutes, Math.round(h)) || h < 90 && i(n.hour, 1) || o < 24 && i(n.hours, Math.round(o)) || o < 48 && i(n.day, 1) || q < 30 && i(n.days, Math.floor(q)) || q < 60 && i(n.month, 1) || q < 365 && i(n.months, Math.floor(q / 30)) || k < 2 && i(n.year, 1) || i(n.years, Math.floor(k));
            return e.trim([j, l, r].join(" "))
        },
        parse: function (i) {
            var h = e.trim(i);
            h = h.replace(/\.\d\d\d+/, "");
            h = h.replace(/-/, "/").replace(/-/, "/");
            h = h.replace(/T/, " ").replace(/Z/, " UTC");
            h = h.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            return new Date(h)
        },
        datetime: function (i) {
            var j = e(i).get(0).tagName.toLowerCase() == "time";
            var h = j ? e(i).attr("datetime") : e(i).attr("title");
            return g.parse(h)
        }
    });
    e.fn.timeago = function () {
        var i = this;
        i.each(d);
        var h = g.settings;
        if (h.refreshMillis > 0) {
            setInterval(function () {
                i.each(d)
            }, h.refreshMillis)
        }
        return i
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
            var i = e.trim(h.text());
            if (i.length > 0) {
                h.attr("title", i)
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
if (InspireWell.lang == "de") {
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
if (InspireWell.lang == "fr") {
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
if (InspireWell.lang == "jp") {
    jQuery.timeago.settings.strings = {
        prefixAgo: "",
        prefixFromNow: "Ã¤Â»Å Ã£Ââ€¹Ã£â€šâ€°",
        suffixAgo: "Ã¥â€°Â",
        suffixFromNow: "Ã¥Â¾Å’",
        seconds: "Ã£ÂÂ»Ã£â€šâ€œÃ£ÂÂ®Ã¦â€¢Â°Ã§Â§â€™",
        minute: "Ã§Â´â€žÃ¤Â¸â‚¬Ã¥Ë†â€ ",
        minutes: "%d Ã¥Ë†â€ ",
        hour: "Ã¥Â¤Â§Ã¤Â½â€œÃ¤Â¸â‚¬Ã¦â„¢â€šÃ©â€“â€œ",
        hours: "Ã¥Â¤Â§Ã¤Â½â€œ %d Ã¦â„¢â€šÃ©â€“â€œÃ¤Â½Â",
        day: "Ã¤Â¸â‚¬Ã¦â€”Â¥",
        days: "%d Ã¦â€”Â¥Ã£ÂÂ»Ã£ÂÂ©",
        month: "Ã¥Â¤Â§Ã¤Â½â€œÃ¤Â¸â‚¬Ã£Æ’Â¶Ã¦Å“Ë†",
        months: "%d Ã£Æ’Â¶Ã¦Å“Ë†Ã£ÂÂ»Ã£ÂÂ©",
        year: "Ã¤Â¸ÂÃ¥ÂºÂ¦Ã¤Â¸â‚¬Ã¥Â¹Â´Ã¯Â¼Ë†Ã¨â„¢Å½Ã¨Ë†Å¾Ã¦ÂµÂÃ¯Â½â€”Ã¯Â¼â€°",
        years: "%d Ã¥Â¹Â´"
    }
}
if (InspireWell.lang == "it") {
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
}(function (a9, aK) {
    var aR = "none",
        aq = "LoadedContent",
        a8 = false,
        aP = "resize.",
        aW = "y",
        aU = "auto",
        a6 = true,
        ar = "nofollow",
        aY = "x";

    function a5(b, d) {
        b = b ? ' id="' + a2 + b + '"' : "";
        d = d ? ' style="' + d + '"' : "";
        return a9("<div" + b + d + "/>")
    }
    function aV(d, c) {
        c = c === aY ? aX.width() : aX.height();
        return typeof d === "string" ? Math.round(/%/.test(d) ? c / 100 * parseInt(d, 10) : parseInt(d, 10)) : d
    }
    function ai(c) {
        return ba.photo || /\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(c)
    }
    function aI(b) {
        for (var d in b) {
            if (a9.isFunction(b[d]) && d.substring(0, 2) !== "on") {
                b[d] = b[d].call(aZ)
            }
        }
        b.rel = b.rel || aZ.rel || ar;
        b.href = b.href || a9(aZ).attr("href");
        b.title = b.title || aZ.title;
        return b
    }
    function aO(d, b) {
        b && b.call(aZ);
        a9.event.trigger(d)
    }
    function aH() {
        var d, i = a2 + "Slideshow_",
            j = "click." + a2,
            h, g;
        if (ba.slideshow && a3[1]) {
            h = function () {
                ay.text(ba.slideshowStop).unbind(j).bind(ah, function () {
                    if (a4 < a3.length - 1 || ba.loop) {
                        d = setTimeout(a7.next, ba.slideshowSpeed)
                    }
                }).bind(ag, function () {
                    clearTimeout(d)
                }).one(j + " " + ap, g);
                a1.removeClass(i + "off").addClass(i + "on");
                d = setTimeout(a7.next, ba.slideshowSpeed)
            };
            g = function () {
                clearTimeout(d);
                ay.text(ba.slideshowStart).unbind([ah, ag, ap, j].join(" ")).one(j, h);
                a1.removeClass(i + "on").addClass(i + "off")
            };
            ba.slideshowAuto ? h() : g()
        }
    }
    function aF(d) {
        if (!ao) {
            aZ = d;
            ba = aI(a9.extend({}, a9.data(aZ, aT)));
            a3 = a9(aZ);
            a4 = 0;
            if (ba.rel !== ar) {
                a3 = a9("." + ax).filter(function () {
                    return (a9.data(this, aT).rel || this.rel) === ba.rel
                });
                a4 = a3.index(aZ);
                if (a4 === -1) {
                    a3 = a3.add(aZ);
                    a4 = a3.length - 1
                }
            }
            if (!aQ) {
                aQ = az = a6;
                a1.show();
                if (ba.returnFocus) {
                    try {
                        aZ.blur();
                        a9(aZ).one(aa, function () {
                            try {
                                this.focus()
                            } catch (c) {}
                        })
                    } catch (b) {}
                }
                aN.css({
                    opacity: +ba.opacity,
                    cursor: ba.overlayClose ? "pointer" : aU
                }).show();
                ba.w = aV(ba.initialWidth, aY);
                ba.h = aV(ba.initialHeight, aW);
                a7.position(0);
                af && aX.bind(aP + an + " scroll." + an, function () {
                    aN.css({
                        width: aX.width(),
                        height: aX.height(),
                        top: aX.scrollTop(),
                        left: aX.scrollLeft()
                    })
                }).trigger("scroll." + an);
                aO(aJ, ba.onOpen);
                ae.add(aw).add(av).add(ay).add(ad).hide();
                aD.html(ba.close).show()
            }
            a7.load(a6)
        }
    }
    var aG = {
        transition: "elastic",
        speed: 300,
        width: a8,
        initialWidth: "600",
        innerWidth: a8,
        maxWidth: a8,
        height: a8,
        initialHeight: "450",
        innerHeight: a8,
        maxHeight: a8,
        scalePhotos: a6,
        scrolling: a6,
        inline: a8,
        html: a8,
        iframe: a8,
        photo: a8,
        href: a8,
        title: a8,
        rel: a8,
        opacity: 0.9,
        preloading: a6,
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        open: a8,
        returnFocus: a6,
        loop: a6,
        slideshow: a8,
        slideshowAuto: a6,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        onOpen: a8,
        onLoad: a8,
        onComplete: a8,
        onCleanup: a8,
        onClosed: a8,
        overlayClose: a6,
        escKey: a6,
        arrowKey: a6
    },
        aT = "colorbox",
        a2 = "cbox",
        aJ = a2 + "_open",
        ag = a2 + "_load",
        ah = a2 + "_complete",
        ap = a2 + "_cleanup",
        aa = a2 + "_closed",
        am = a2 + "_purge",
        ac = a2 + "_loaded",
        aE = a9.browser.msie && !a9.support.opacity,
        af = aE && a9.browser.version < 7,
        an = a2 + "_IE6",
        aN, a1, aC, aS, bc, aj, al, ak, a3, aX, a0, au, at, ad, ae, ay, av, aw, aD, aB, aA, aM, aL, aZ, a4, ba, aQ, az, ao = a8,
        a7, ax = a2 + "Element";
    a7 = a9.fn[aT] = a9[aT] = function (h, e) {
        var b = this,
            g;
        if (!b[0] && b.selector) {
            return b
        }
        h = h || {};
        if (e) {
            h.onComplete = e
        }
        if (!b[0] || b.selector === undefined) {
            b = a9("<a/>");
            h.open = a6
        }
        b.each(function () {
            a9.data(this, aT, a9.extend({}, a9.data(this, aT) || aG, h));
            a9(this).addClass(ax)
        });
        g = h.open;
        if (a9.isFunction(g)) {
            g = g.call(b)
        }
        g && aF(b[0]);
        return b
    };
    a7.init = function () {
        var c = "hover",
            b = "clear:left";
        aX = a9(aK);
        a1 = a5().attr({
            id: aT,
            "class": aE ? a2 + "IE" : ""
        });
        aN = a5("Overlay", af ? "position:absolute" : "").hide();
        aC = a5("Wrapper");
        aS = a5("Content").append(a0 = a5(aq, "width:0; height:0; overflow:hidden"), at = a5("LoadingOverlay").add(a5("LoadingGraphic")), ad = a5("Title"), ae = a5("Current"), av = a5("Next"), aw = a5("Previous"), ay = a5("Slideshow").bind(aJ, aH), aD = a5("Close"));
        aC.append(a5().append(a5("TopLeft"), bc = a5("TopCenter"), a5("TopRight")), a5(a8, b).append(aj = a5("MiddleLeft"), aS, al = a5("MiddleRight")), a5(a8, b).append(a5("BottomLeft"), ak = a5("BottomCenter"), a5("BottomRight"))).children().children().css({
            "float": "left"
        });
        au = a5(a8, "position:absolute; width:9999px; visibility:hidden; display:none");
        a9("body").prepend(aN, a1.append(aC, au));
        aS.children().hover(function () {
            a9(this).addClass(c)
        }, function () {
            a9(this).removeClass(c)
        }).addClass(c);
        aB = bc.height() + ak.height() + aS.outerHeight(a6) - aS.height();
        aA = aj.width() + al.width() + aS.outerWidth(a6) - aS.width();
        aM = a0.outerHeight(a6);
        aL = a0.outerWidth(a6);
        a1.css({
            "padding-bottom": aB,
            "padding-right": aA
        }).hide();
        av.click(a7.next);
        aw.click(a7.prev);
        aD.click(a7.close);
        aS.children().removeClass(c);
        a9("." + ax).live("click", function (d) {
            if (!(d.button !== 0 && typeof d.button !== "undefined" || d.ctrlKey || d.shiftKey || d.altKey)) {
                d.preventDefault();
                aF(this)
            }
        });
        aN.click(function () {
            ba.overlayClose && a7.close()
        });
        a9(document).bind("keydown", function (d) {
            if (aQ && ba.escKey && d.keyCode === 27) {
                d.preventDefault();
                a7.close()
            }
            if (aQ && ba.arrowKey && !az && a3[1]) {
                if (d.keyCode === 37 && (a4 || ba.loop)) {
                    d.preventDefault();
                    aw.click()
                } else {
                    if (d.keyCode === 39 && (a4 < a3.length - 1 || ba.loop)) {
                        d.preventDefault();
                        av.click()
                    }
                }
            }
        })
    };
    a7.remove = function () {
        a1.add(aN).remove();
        a9("." + ax).die("click").removeData(aT).removeClass(ax)
    };
    a7.position = function (k, m) {
        function c(b) {
            bc[0].style.width = ak[0].style.width = aS[0].style.width = b.style.width;
            at[0].style.height = at[1].style.height = aS[0].style.height = aj[0].style.height = al[0].style.height = b.style.height
        }
        var l, i = Math.max(document.documentElement.clientHeight - ba.h - aM - aB, 0) / 2 + aX.scrollTop(),
            j = Math.max(aX.width() - ba.w - aL - aA, 0) / 2 + aX.scrollLeft();
        l = a1.width() === ba.w + aL && a1.height() === ba.h + aM ? 0 : k;
        aC[0].style.width = aC[0].style.height = "9999px";
        a1.dequeue().animate({
            width: ba.w + aL,
            height: ba.h + aM,
            top: i,
            left: j
        }, {
            duration: l,
            complete: function () {
                c(this);
                az = a8;
                aC[0].style.width = ba.w + aL + aA + "px";
                aC[0].style.height = ba.h + aM + aB + "px";
                m && m()
            },
            step: function () {
                c(this)
            }
        })
    };
    a7.resize = function (c) {
        if (aQ) {
            c = c || {};
            if (c.width) {
                ba.w = aV(c.width, aY) - aL - aA
            }
            if (c.innerWidth) {
                ba.w = aV(c.innerWidth, aY)
            }
            a0.css({
                width: ba.w
            });
            if (c.height) {
                ba.h = aV(c.height, aW) - aM - aB
            }
            if (c.innerHeight) {
                ba.h = aV(c.innerHeight, aW)
            }
            if (!c.innerHeight && !c.height) {
                c = a0.wrapInner("<div style='overflow:auto'></div>").children();
                ba.h = c.height();
                c.replaceWith(c.children())
            }
            a0.css({
                height: ba.h
            });
            a7.position(ba.transition === aR ? 0 : ba.speed)
        }
    };
    a7.prep = function (g) {
        var f = "hidden";

        function b(i) {
            var l, k, p, n, h = a3.length,
                j = ba.loop;
            a7.position(i, function () {
                if (aQ) {
                    aE && d && a0.fadeIn(100);
                    a0.show();
                    aO(ac);
                    ad.show().html(ba.title);
                    if (h > 1) {
                        typeof ba.current === "string" && ae.html(ba.current.replace(/\{current\}/, a4 + 1).replace(/\{total\}/, h)).show();
                        av[j || a4 < h - 1 ? "show" : "hide"]().html(ba.next);
                        aw[j || a4 ? "show" : "hide"]().html(ba.previous);
                        l = a4 ? a3[a4 - 1] : a3[h - 1];
                        p = a4 < h - 1 ? a3[a4 + 1] : a3[0];
                        ba.slideshow && ay.show();
                        if (ba.preloading) {
                            n = a9.data(p, aT).href || p.href;
                            k = a9.data(l, aT).href || l.href;
                            n = a9.isFunction(n) ? n.call(p) : n;
                            k = a9.isFunction(k) ? k.call(l) : k;
                            if (ai(n)) {
                                a9("<img/>")[0].src = n
                            }
                            if (ai(k)) {
                                a9("<img/>")[0].src = k
                            }
                        }
                    }
                    at.hide();
                    if (ba.transition === "fade") {
                        a1.fadeTo(c, 1, function () {
                            if (aE) {
                                a1[0].style.filter = a8
                            }
                        })
                    } else {
                        if (aE) {
                            a1[0].style.filter = a8
                        }
                    }
                    aX.bind(aP + a2, function () {
                        a7.position(0)
                    });
                    aO(ah, ba.onComplete)
                }
            })
        }
        if (aQ) {
            var d, c = ba.transition === aR ? 0 : ba.speed;
            aX.unbind(aP + a2);
            a0.remove();
            a0 = a5(aq).html(g);
            a0.hide().appendTo(au.show()).css({
                width: function () {
                    ba.w = ba.w || a0.width();
                    ba.w = ba.mw && ba.mw < ba.w ? ba.mw : ba.w;
                    return ba.w
                }(),
                overflow: ba.scrolling ? aU : f
            }).css({
                height: function () {
                    ba.h = ba.h || a0.height();
                    ba.h = ba.mh && ba.mh < ba.h ? ba.mh : ba.h;
                    return ba.h
                }()
            }).prependTo(aS);
            au.hide();
            a9("#" + a2 + "Photo").css({
                cssFloat: aR,
                marginLeft: aU,
                marginRight: aU
            });
            af && a9("select").not(a1.find("select")).filter(function () {
                return this.style.visibility !== f
            }).css({
                visibility: f
            }).one(ap, function () {
                this.style.visibility = "inherit"
            });
            ba.transition === "fade" ? a1.fadeTo(c, 0, function () {
                b(0)
            }) : b(c)
        }
    };
    a7.load = function (b) {
        var g, f, d, e = a7.prep;
        az = a6;
        aZ = a3[a4];
        b || (ba = aI(a9.extend({}, a9.data(aZ, aT))));
        aO(am);
        aO(ag, ba.onLoad);
        ba.h = ba.height ? aV(ba.height, aW) - aM - aB : ba.innerHeight && aV(ba.innerHeight, aW);
        ba.w = ba.width ? aV(ba.width, aY) - aL - aA : ba.innerWidth && aV(ba.innerWidth, aY);
        ba.mw = ba.w;
        ba.mh = ba.h;
        if (ba.maxWidth) {
            ba.mw = aV(ba.maxWidth, aY) - aL - aA;
            ba.mw = ba.w && ba.w < ba.mw ? ba.w : ba.mw
        }
        if (ba.maxHeight) {
            ba.mh = aV(ba.maxHeight, aW) - aM - aB;
            ba.mh = ba.h && ba.h < ba.mh ? ba.h : ba.mh
        }
        g = ba.href;
        at.show();
        if (ba.inline) {
            a5().hide().insertBefore(a9(g)[0]).one(am, function () {
                a9(this).replaceWith(a0.children())
            });
            e(a9(g))
        } else {
            if (ba.iframe) {
                a1.one(ac, function () {
                    var h = a9("<iframe name='" + (new Date).getTime() + "' frameborder=0" + (ba.scrolling ? "" : " scrolling='no'") + (aE ? " allowtransparency='true'" : "") + " style='width:100%; height:100%; border:0; display:block;'/>");
                    h[0].src = ba.href;
                    h.appendTo(a0).one(am, function () {
                        h[0].src = "//about:blank"
                    })
                });
                e(" ")
            } else {
                if (ba.html) {
                    e(ba.html)
                } else {
                    if (ai(g)) {
                        f = new Image;
                        f.onload = function () {
                            var c;
                            f.onload = null;
                            f.id = a2 + "Photo";
                            a9(f).css({
                                border: aR,
                                display: "block",
                                cssFloat: "left"
                            });
                            if (ba.scalePhotos) {
                                d = function () {
                                    f.height -= f.height * c;
                                    f.width -= f.width * c
                                };
                                if (ba.mw && f.width > ba.mw) {
                                    c = (f.width - ba.mw) / f.width;
                                    d()
                                }
                                if (ba.mh && f.height > ba.mh) {
                                    c = (f.height - ba.mh) / f.height;
                                    d()
                                }
                            }
                            if (ba.h) {
                                f.style.marginTop = Math.max(ba.h - f.height, 0) / 2 + "px"
                            }
                            a3[1] && (a4 < a3.length - 1 || ba.loop) && a9(f).css({
                                cursor: "pointer"
                            }).click(a7.next);
                            if (aE) {
                                f.style.msInterpolationMode = "bicubic"
                            }
                            setTimeout(function () {
                                e(f)
                            }, 1)
                        };
                        setTimeout(function () {
                            f.src = g
                        }, 1)
                    } else {
                        g && au.load(g, function (i, j, h) {
                            e(j === "error" ? "Request unsuccessful: " + h.statusText : a9(this).children())
                        })
                    }
                }
            }
        }
    };
    a7.next = function () {
        if (!az) {
            a4 = a4 < a3.length - 1 ? a4 + 1 : 0;
            a7.load()
        }
    };
    a7.prev = function () {
        if (!az) {
            a4 = a4 ? a4 - 1 : a3.length - 1;
            a7.load()
        }
    };
    a7.close = function () {
        if (aQ && !ao) {
            ao = a6;
            aQ = a8;
            aO(ap, ba.onCleanup);
            aX.unbind("." + a2 + " ." + an);
            aN.fadeTo("fast", 0);
            a1.stop().fadeTo("fast", 0, function () {
                aO(am);
                a0.remove();
                a1.add(aN).css({
                    opacity: 1,
                    cursor: aU
                }).hide();
                setTimeout(function () {
                    ao = a8;
                    aO(aa, ba.onClosed)
                }, 1)
            })
        }
    };
    a7.element = function () {
        return a9(aZ)
    };
    a7.settings = aG;
    a9(a7.init)
})(jQuery, this);
(function (o, j, l) {
    j.infinitescroll = function z(C, E, D) {
        this.element = j(D);
        this._create(C, E)
    };
    j.infinitescroll.defaults = {
        callback: l,
        debug: false,
        behavior: l,
        binder: j(o),
        nextSelector: "div.navigation a:first",
        loadMsgSelector: null,
        loadingMsgRevealSpeed: "fast",
        loadingImg: "http://www.infinite-scroll.com/loading.gif",
        loadingText: "<em>Loading the next set of posts...</em>",
        loadingStart: l,
        loadingEnd: l,
        donetext: "<em>Congratulations, you've reached the end of the internet.</em>",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: l,
        dataType: "html",
        appendCallback: true,
        bufferPx: 40,
        orientation: "height",
        errorCallback: function () {},
        currPage: 1,
        infid: 0,
        isDuringAjax: false,
        isInvalidPage: false,
        isDestroyed: false,
        isDone: false,
        isPaused: false,
        pixelsFromNavToBottom: l,
        pagesLoaded: null,
        path: l,
        loadingMsg: l
    };
    j.infinitescroll.prototype = {
        _binding: function h(E) {
            var C = this,
                D = C.options;
            if ( !! D.behavior && this["_binding_" + D.behavior] !== l) {
                this["_binding_" + D.behavior].call(this);
                return
            }
            if (E !== "bind" && E !== "unbind") {
                this._debug("Binding value  " + E + " not valid");
                return false
            }
            if (E == "unbind") {
                (this.options.binder).unbind("smartscroll.infscr." + C.options.infid)
            } else {
                (this.options.binder)[E]("smartscroll.infscr." + C.options.infid, function () {
                    C.scroll()
                })
            }
            this._debug("Binding", E)
        },
        _create: function t(C, G) {
            if (!this._validate(C)) {
                return false
            }
            var D = this.options = j.extend({}, j.infinitescroll.defaults, C),
                F = /(.*?\/\/).*?(\/.*)/,
                E = j(D.nextSelector).attr("href");
            D.contentSelector = D.contentSelector || this.element;
            D.loadMsgSelector = D.loadMsgSelector || D.contentSelector;
            if (!E) {
                this._debug("Navigation selector not found");
                return
            }
            D.path = this._determinepath(E);
            D.loadingMsg = j('<div id="infscr-loading"><img alt="Loading..." src="' + D.loadingImg + '" /><div>' + D.loadingText + "</div></div>");
            (new Image()).src = D.loadingImg;
            D.pixelsFromNavToBottom = j(document).height() - j(D.navSelector).offset().top;
            D.loadingStart = D.loadingStart ||
            function () {
                j(D.navSelector).hide();
                D.loadingMsg.appendTo(D.loadMsgSelector).show(D.loadingMsgRevealSpeed, function () {
                    beginAjax(D)
                });
                j("#loading").show()
            };
            D.loadingEnd = D.loadingEnd ||
            function () {
                D.loadingMsg.fadeOut("normal")
            };
            D.callback = D.callback || G ||
            function () {};
            this._setup()
        },
        _debug: function q() {
            if (this.options.debug) {
                return o.console && console.log.call(console, arguments)
            }
        },
        _determinepath: function A(D) {
            var C = this.options;
            if ( !! C.behavior && this["_determinepath_" + C.behavior] !== l) {
                this["_determinepath_" + C.behavior].call(this, D);
                return
            }
            if ( !! C.pathParse) {
                this._debug("pathParse manual");
                return C.pathParse
            } else {
                if (D.match(/^(.*?)\b2\b(.*?$)/)) {
                    D = D.match(/^(.*?)\b2\b(.*?$)/).slice(1)
                } else {
                    if (D.match(/^(.*?)2(.*?$)/)) {
                        if (D.match(/^(.*?page=)2(\/.*|$)/)) {
                            D = D.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                            return D
                        }
                        D = D.match(/^(.*?)2(.*?$)/).slice(1)
                    } else {
                        if (D.match(/^(.*?page=)1(\/.*|$)/)) {
                            D = D.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                            return D
                        } else {
                            this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
                            C.isInvalidPage = true
                        }
                    }
                }
            }
            this._debug("determinePath", D);
            return D
        },
        _error: function v(D) {
            var C = this.options;
            if ( !! C.behavior && this["_error_" + C.behavior] !== l) {
                this["_error_" + C.behavior].call(this, D);
                return
            }
            if (D !== "destroy" && D !== "end") {
                D = "unknown"
            }
            this._debug("Error", D);
            if (D == "end") {
                this._showdonemsg()
            }
            C.isDone = true;
            C.currPage = 1;
            C.isPaused = false;
            this._binding("unbind")
        },
        _loadcallback: function d(G, H) {
            var F = this.options,
                J = this.options.callback,
                C = (F.isDone) ? "done" : (!F.appendCallback) ? "no-append" : "append",
                I;
            if ( !! F.behavior && this["_loadcallback_" + F.behavior] !== l) {
                this["_loadcallback_" + F.behavior].call(this, G, H);
                return
            }
            switch (C) {
            case "done":
                this._showdonemsg();
                return false;
                break;
            case "no-append":
                if (F.dataType == "html") {
                    H = "<div>" + H + "</div>";
                    H = j(H).find(F.itemSelector)
                }
                break;
            case "append":
                var E = G.children();
                if (E.length == 0) {
                    return this._error("end")
                }
                I = document.createDocumentFragment();
                while (G[0].firstChild) {
                    I.appendChild(G[0].firstChild)
                }
                this._debug("contentSelector", j(F.contentSelector)[0]);
                j(F.contentSelector)[0].appendChild(I);
                H = E.get();
                break
            }
            F.loadingEnd.call(j(F.contentSelector)[0], F);
            if (F.animate) {
                var D = j(o).scrollTop() + j("#infscr-loading").height() + F.extraScrollPx + "px";
                j("html,body").animate({
                    scrollTop: D
                }, 800, function () {
                    F.isDuringAjax = false
                })
            }
            if (!F.animate) {
                F.isDuringAjax = false
            }
            J.call(j(F.contentSelector)[0], H)
        },
        _nearbottom: function u() {
            var D = this.options,
                C = 0 + j(document).height() - (D.binder.scrollTop()) - j(o).height();
            if ( !! D.behavior && this["_nearbottom_" + D.behavior] !== l) {
                this["_nearbottom_" + D.behavior].call(this);
                return
            }
            this._debug("math:", C, D.pixelsFromNavToBottom);
            return (C - D.bufferPx < D.pixelsFromNavToBottom)
        },
        _pausing: function m(D) {
            var C = this.options;
            if ( !! C.behavior && this["_pausing_" + C.behavior] !== l) {
                this["_pausing_" + C.behavior].call(this, D);
                return
            }
            if (D !== "pause" && D !== "resume" && D !== null) {
                this._debug("Invalid argument. Toggling pause value instead")
            }
            D = (D && (D == "pause" || D == "resume")) ? D : "toggle";
            switch (D) {
            case "pause":
                C.isPaused = true;
                break;
            case "resume":
                C.isPaused = false;
                break;
            case "toggle":
                C.isPaused = !C.isPaused;
                break
            }
            this._debug("Paused", C.isPaused);
            return false
        },
        _setup: function r() {
            var C = this.options;
            if ( !! C.behavior && this["_setup_" + C.behavior] !== l) {
                this["_setup_" + C.behavior].call(this);
                return
            }
            this._binding("bind");
            return false
        },
        _showdonemsg: function b() {
            var C = this.options;
            if ( !! C.behavior && this["_showdonemsg_" + C.behavior] !== l) {
                this["_showdonemsg_" + C.behavior].call(this);
                return
            }
            C.loadingMsg.find("img").hide().parent().find("div").html(C.donetext).animate({
                opacity: 1
            }, 2000, function () {
                j(this).parent().fadeOut("normal")
            });
            C.errorCallback.call(j(C.contentSelector)[0], "done")
        },
        _validate: function w(D) {
            for (var C in D) {
                if (C.indexOf && C.indexOf("Selector") > -1 && j(D[C]).length === 0) {
                    this._debug("Your " + C + " found no elements.");
                    return false
                }
                return true
            }
        },
        bind: function p() {
            this._binding("bind")
        },
        destroy: function B() {
            this.options.isDestroyed = true;
            return this._error("destroy")
        },
        pause: function f() {
            this._pausing("pause")
        },
        resume: function i() {
            this._pausing("resume")
        },
        retrieve: function c(I) {
            var J = this,
                D = J.options,
                L = D.path,
                F, K, M, C, E, I = I || null,
                H = ( !! I) ? I : D.currPage;
            beginAjax = function G(N) {
                N.currPage++;
                J._debug("heading into ajax", L);
                F = j(N.contentSelector).is("table") ? j("<tbody/>") : j("<div/>");
                M = L.join(N.currPage);
                C = (N.dataType == "html" || N.dataType == "json") ? N.dataType : "html+callback";
                if (N.appendCallback && N.dataType == "html") {
                    C += "+callback"
                }
                switch (C) {
                case "html+callback":
                    J._debug("Using HTML via .load() method");
                    F.load(M + " " + N.itemSelector, null, function O(P) {
                        J._loadcallback(F, P)
                    });
                    break;
                case "html":
                case "json":
                    J._debug("Using " + (C.toUpperCase()) + " via $.ajax() method");
                    j.ajax({
                        url: M,
                        dataType: N.dataType,
                        complete: function O(P, Q) {
                            E = (typeof (P.isResolved) !== "undefined") ? (P.isResolved()) : (Q === "success" || Q === "notmodified");
                            (E) ? J._loadcallback(F, P.responseText) : J._error("end")
                        }
                    });
                    break
                }
            };
            if ( !! D.behavior && this["retrieve_" + D.behavior] !== l) {
                this["retrieve_" + D.behavior].call(this, I);
                return
            }
            if (D.isDestroyed) {
                this._debug("Instance is destroyed");
                return false
            }
            D.isDuringAjax = true;
            D.loadingStart.call(j(D.contentSelector)[0], D)
        },
        scroll: function g() {
            var C = this.options;
            if ( !! C.behavior && this["scroll_" + C.behavior] !== l) {
                this["scroll_" + C.behavior].call(this);
                return
            }
            if (C.isDuringAjax || C.isInvalidPage || C.isDone || C.isDestroyed || C.isPaused) {
                return
            }
            if (!this._nearbottom()) {
                return
            }
            this.retrieve()
        },
        toggle: function y() {
            this._pausing()
        },
        unbind: function n() {
            this._binding("unbind")
        },
        update: function k(C) {
            if (j.isPlainObject(C)) {
                this.options = j.extend(true, this.options, C)
            }
        }
    };
    j.fn.infinitescroll = function e(E, F) {
        var D = typeof E;
        switch (D) {
        case "string":
            var C = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var G = j.data(this, "infinitescroll");
                if (!G) {
                    return false
                }
                if (!j.isFunction(G[E]) || E.charAt(0) === "_") {
                    return false
                }
                G[E].apply(G, C)
            });
            break;
        case "object":
            this.each(function () {
                var G = j.data(this, "infinitescroll");
                if (G) {
                    G.update(E)
                } else {
                    j.data(this, "infinitescroll", new j.infinitescroll(E, F, this))
                }
            });
            break
        }
        return this
    };
    var x = j.event,
        s;
    x.special.smartscroll = {
        setup: function () {
            j(this).bind("scroll", x.special.smartscroll.handler)
        },
        teardown: function () {
            j(this).unbind("scroll", x.special.smartscroll.handler)
        },
        handler: function (F, C) {
            var E = this,
                D = arguments;
            F.type = "smartscroll";
            if (s) {
                clearTimeout(s)
            }
            s = setTimeout(function () {
                jQuery.event.handle.apply(E, D)
            }, C === "execAsap" ? 0 : 100)
        }
    };
    j.fn.smartscroll = function (C) {
        return C ? this.bind("smartscroll", C) : this.trigger("smartscroll", ["execAsap"])
    }
})(window, jQuery);
(function (b) {
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
            var i = b(this);
            var h = this;
            b.getJSON(c, function (j) {
                b.each(j.items, function (n, q) {
                    if (n < e.limit) {
                        if (e.cleanDescription) {
                            var p = /<p>(.*?)<\/p>/g;
                            var k = q.description;
                            if (p.test(k)) {
                                q.description = k.match(p)[2];
                                if (q.description != undefined) {
                                    q.description = q.description.replace("<p>", "").replace("</p>", "")
                                }
                            }
                        }
                        q.image_s = q.media.m.replace("_m", "_s");
                        q.image_t = q.media.m.replace("_m", "_t");
                        q.image_m = q.media.m.replace("_m", "_m");
                        q.image = q.media.m.replace("_m", "");
                        q.image_b = q.media.m.replace("_m", "_b");
                        delete q.media;
                        if (e.useTemplate) {
                            var o = e.itemTemplate;
                            for (var m in q) {
                                var l = new RegExp("{{" + m + "}}", "g");
                                o = o.replace(l, q[m])
                            }
                            i.append(o)
                        }
                        e.itemCallback.call(h, q)
                    }
                });
                if (b.isFunction(g)) {
                    g.call(h, j)
                }
            })
        })
    }
})(jQuery);
$.fn.setupPosts = function () {
    $(this).each(function () {
        if ($(this).is("div.text, div.photo, div.photoset, div.link, div.quote, div.video, div.ask")) {
            $(this).fitVids()
        }
        
    });
    $(this).find("iframe[src^='http://www.youtube.com']").each(function () {
        var c = $(this).attr("src");
        $(this).attr("src", c + "&wmode=transparent")
    });
    $(this).find("embed").attr("wmode", "opaque");
    var b;
    $(this).find("embed").each(function (c) {
        b = $(this).attr("outerHTML");
        if ((b != null) && (b.length > 0)) {
            b = b.replace(/embed /gi, "embed wmode='opaque' ");
            $(this).attr("outerHTML", b)
        } else {
            $(this).wrap("<div></div>")
        }
    });
    $(this).find("ul.tags").each(function () {
        if ($(this).find("li").length == 1) {
            if ($(this).find("li").is(":hidden")) {
                $(this).hide()
            }
        }
    });
    $(this).find(".thumbnail_link").each(function () {
        if ($(this).parent().is("span")) {
            $(this).hide()
        }
    });

    $(this).find("ul.utils li.share").hoverIntent(InspireWell.shareThisConfig);
    if (InspireWell.useLightbox) {
        $(this).find("a.thumbnail_lightbox").colorbox({
            photo: true
        })
    }
    $(this).find("ul.tags li.tt_xs, ul.tags li.tt_xs").remove()
};
window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments))
    }
};
