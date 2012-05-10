$(function () {
    if (!Swell.customizeMode) {
        $.getScript("http://platform.twitter.com/widgets.js");
        var v = document.createElement("script");
        v.type = "text/javascript";
        v.async = true;
        v.src = "https://apis.google.com/js/plusone.js";
        var m = document.getElementsByTagName("script")[0];
        m.parentNode.insertBefore(v, m)
    }
    $.fn.setupTumblrShare = function () {
        return this.each(function () {
            var D = $(this);
            if (D.is(":empty")) {
                var H = D.attr("data-permalink");
                var E = D.closest("#post-view");
                var e = E.find("header img, section.post-full img");
                if (e.length > 0) {
                    var G = true;
                    if (e.first().attr("data-highres")) {
                        var F = e.first().attr("data-highres")
                    } else {
                        var F = e.first().attr("src")
                    }
                } else {
                    var G = false;
                    var F = ""
                }
                if (Swell.twitterUser) {
                    var s = Swell.twitterUser
                } else {
                    var s = ""
                }
                D.tumblrShare({
                    url: H,
                    media: F,
                    via: s,
                    size: "horizontal",
                    pinterest: G,
                    onComplete: function () {
                        try {
                            gapi.plusone.go()
                        } catch (I) {}
                        $.getScript("http://platform.twitter.com/widgets.js");
                        $.getScript("http://assets.pinterest.com/js/pinit.js")
                    }
                })
            }
        })
    };
    var r = $("body");
    var w = $("#about");
    var t = $("#container");
    var c = $("#iso");
    var p = $("#iso-about");
    var C = $("#post-view");
    var h = $("#overlay");
    var g;
    var k;
    var u = false;
    var i = false;
    $("#main article").each(function (s) {
        var e = $(this).attr("data-permalink");
        var D = e.slice(e.indexOf("/", 7));
        $(this).attr("data-permahash", D)
    });
    if ($("html.ie6, html.ie7, html.ie8").length > 0) {
        Swell.infiniteScroll = false
    }
    $("#main article").summarizePost({
        fullPosts: Swell.fullPosts,
        minimalSummary: Swell.minimalSummary,
        stripMedia: Swell.stripMedia,
        len: Swell.truncateLength
    });
    $("body.index-page #main article.video header, body.index-page #main article.audio header").each(function () {
        $(this).prepend('<div class="click-block"></div>')
    });
    $("article.text, article.photo, article.photoset, article.link, article.quote, article.video, article.ask, #likes").fitVids();
    var o = window.Postbox || {};
    o.isOpen = false;
    o.disqusTimer = null;
    var x;
    var q = 0;
    var z = 20;
    var j = false;
    var a = 290;
    var b = null;
    var d = null;
    $.address.change(function (e) {
        o.disqusTimer = null;
        if (e.value.indexOf("/post/") != -1) {
            if (j) {
                closeReveal()
            }
            g = $('article[data-permahash="' + e.value + '"]');
            o.loadArticle(g, e.value)
        } else {
            if (e.value.indexOf("/about") != -1) {
                openReveal()
            } else {
                if (j) {
                    closeReveal();
                    if (o.isOpen) {
                        o.close()
                    }
                }
                o.unloadArticle()
            }
        }
    }).crawlable(true).tracker(true);
    o.loadArticle = function (E) {
        x = E;
        this.postID = x.attr("data-postID");
        C.find(".prev-post, .next-post").addClass("hidden");
        C.find("article header, article section.post-full, .post-details").remove();
        $("#disqus_thread").empty();
        C.find("article").scrollTop();
        if (!o.isOpen) {
            o.open()
        } else {} if (x.length < 1) {
            C.find("article").removeClass("hidden");
            C.find("section.loading").removeClass("hidden");
            window.location = $.address.path()
        } else {
            if (this.postID !== $("#main article").first().attr("data-postID")) {
                C.find(".prev-post").removeClass("hidden")
            }
            if (this.postID !== $("#main article").last().attr("data-postID")) {
                C.find(".next-post").removeClass("hidden")
            }
            C.find("article").removeClass("hidden");
            if (u == false) {
                i = true;
                return true
            }
            C.find("section.loading").addClass("hidden");
            var F = x.attr("class");
            C.find("article").attr("class", F);
            var e = x.find("header").clone();
            var D = x.find("section.post-full").clone();
            var s = x.find(".post-details").clone();
            e.find(".custom-photoset").addClass("visuallyhidden");
            e.find(".audio_player").unwrap();
            C.find("article").prepend(s).prepend(D).prepend(e);
            C.find("p:empty").remove();
            C.find(".post-details:empty").remove();
            o.initExtras()
        }
        C.find("article .post-footer, article header, article .post-full").resize(function (G) {
            o.resize()
        })
    };
    o.unloadArticle = function () {
        if (o.isOpen) {
            o.close();
            window.location.hash = "#!/";
            var D = "en_US";
            if (Swell.lang == "de") {
                D = "de_DE"
            }
            if (Swell.lang == "fr") {
                D = "fr_FR"
            }
            if (Swell.lang == "jp") {
                D = "ja_JP"
            }
            if (Swell.lang == "it") {
                D = "it_IT"
            }
            if (Swell.lang == "tr") {
                D = "tr_TR"
            }
            var s = encodeURIComponent(window.location.href.replace(/#.*/, ""));
            var e = "http://assets.tumblr.com/iframe.html?9&src=" + s + "&lang=" + D + "&name=" + Swell.username;
            $("#tumblr_controls").attr("src", e)
        }
    };
    o.getArticle = function (e) {};
    o.initExtras = function () {
        o.convertMedia();
        if (C.find(".flash-wrapper")) {
            C.find(".flash-wrapper").attr("style", "").removeClass("flash-wrapper")
        }
        o.resize();
        if (typeof (Swell.disqusID) != "undefined") {
            $(".disqus-loading").removeClass("visuallyhidden");
            if ($("body.permalink-page").length <= 0) {
                o.disqusTimer = setTimeout("setupDisqus()", 3000)
            } else {
                setupDisqus()
            }
        }
        $(".short_url_text").val(window.location);
        setupShare(x.attr("data-permalink"), x.attr("data-urlencoded"), x.attr("data-postID"));
        setupNotes(x.attr("data-notes"))
    };
    o.convertMedia = function () {
        var e = C.find("article.photoset header");
        e.imagesLoaded(function () {
            c.delay(200, "isoDelay").queue("isoDelay", function () {
                C.find(".custom-photoset").removeClass("visuallyhidden");
                C.find(".custom-photoset").tumblrPhotoset({
                    width: "620px",
                    highres: true,
                    margin: 0,
                    onInit: function () {},
                    onComplete: function () {
                        customPhotosetComplete = true
                    }
                })
            }).dequeue("isoDelay")
        });
        var D = C.find("article.photo header img");
        if (D.length > 0) {
            var s = D.attr("data-highres");
            D.css({
                width: "620px"
            });
            D.attr("src", s);
            D.parent().imagesLoaded(function () {
                o.resize()
            })
        }
    };
    o.resize = function () {
        var e = C.find("article").offset().top;
        var E = $("#site-footer").offset().top - 20 - 20;
        var D = E - e;
        var s = C.find("article header").outerHeight() + C.find("article section.post-full").outerHeight() + C.find(".post-footer").outerHeight();
        if ($(".permalink-page").length <= 0) {
            C.find("article").css({
                "max-height": D
            });
            if (D > s) {
                C.find("article").css({
                    "overflow-y": "hidden",
                    width: "620px"
                })
            } else {
                C.find("article").css({
                    "overflow-y": "scroll",
                    width: "626px"
                })
            }
        }
    };
    o.prevPost = function () {
        C.find("article header, article section.post-full, .post-details").remove();
        if (typeof (g) != "undefined") {
            var e = g.parent().prev().find("article");
            if (e.length > 0) {
                $.address.value(e.attr("data-permahash"))
            }
        }
    };
    o.nextPost = function () {
        C.find("article header, article section.post-full, .post-details").remove();
        if (typeof (g) != "undefined") {
            var e = g.parent().next().find("article");
            if (e.length > 0) {
                $.address.value(e.attr("data-permahash"))
            }
        }
    };
    o.open = function () {
        C.removeClass("hidden");
        h.removeClass("hidden");
        o.isOpen = true;
        hideFlash()
    };
    o.close = function () {
        C.addClass("hidden");
        h.addClass("hidden");
        o.isOpen = false;
        C.find("header, #disqus_thread, .player").empty();
        C.find(".share-buttons").empty().removeData();
        showFlash()
    };
    window.disqus_config = function () {
        var e = this;
        e.callbacks.onReady.push(function () {});
        e.callbacks.onNewComment.push(function () {});
        e.callbacks.preReset.push(function () {})
    };
    setupDisqus = function () {
        $(".disqus-loading").addClass("visuallyhidden");
        var D = $.address.baseURL() + "/#!" + $.address.path();
        try {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = x.attr("data-postID");
                    this.page.url = D
                }
            })
        } catch (G) {
            var E = Swell.disqusID;
            var F = D;
            var s = x.attr("data-postID");
            (function () {
                var e = document.createElement("script");
                e.type = "text/javascript";
                e.async = true;
                e.src = "http://" + E + ".disqus.com/embed.js";
                (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(e)
            })()
        }
    };
    setupShare = function (s, e, D) {
        $(".share-buttons").empty().removeData().attr("data-permalink", s);
        $(".share-buttons").setupTumblrShare();
        $.ajax({
            url: "/api/read/json?id=" + D,
            dataType: "jsonp",
            timeout: 5000,
            success: function (G) {
                var F = G.posts[0]["reblog-key"];
                var H = "en_US";
                if (Swell.lang == "de") {
                    H = "de_DE"
                }
                if (Swell.lang == "fr") {
                    H = "fr_FR"
                }
                if (Swell.lang == "jp") {
                    H = "ja_JP"
                }
                if (Swell.lang == "it") {
                    H = "it_IT"
                }
                if (Swell.lang == "tr") {
                    H = "tr_TR"
                }
                var E = "http://assets.tumblr.com/iframe.html?9&src=" + e + "&pid=" + D + "&rk=" + F + "&lang=" + H + "&name=" + Swell.username;
                $("#tumblr_controls").attr("src", E)
            }
        })
    };
    setupNotes = function (e) {
        var s = '<img src="http://static.tumblr.com/fftf9xi/xjOllgsjl/loader.gif" height="16" width="16" class="loading-circle"><p>Loading</p>';
        $(".notes-holder").html(s);
        $.ajax({
            url: e,
            timeout: 5000,
            success: function (D) {
                $(".notes-holder").html(D);
                $("ol.notes li.like a").tipsy({
                    opacity: 0.95,
                    title: function () {
                        return "Like - " + this.getAttribute("original-title")
                    }
                });
                $("ol.notes li.reblog a").tipsy({
                    opacity: 0.95,
                    title: function () {
                        return "Reblog - " + this.getAttribute("original-title")
                    }
                })
            }
        })
    };
    getAboutHeight = function (e) {
        q = w.height();
        if (e) {
            q = "-" + q + "px"
        }
        return q
    };
    resizeAbout = function () {
        p.width((b * a));
        if (p.hasClass("isotope")) {
            p.isotope("reLayout")
        }
    };
    resizeContainer = function () {
        c.width((b * a));
        if (c.hasClass("isotope")) {
            c.isotope("reLayout")
        }
    };
    getMetaNumbers = function (D) {
        var s = D.indexOf(" ");
        var e = D.substring(0, s);
        return e
    };
    setPostsOffset = function () {
        var e = $("#site-header").height();
        $("#main").css({
            "padding-top": e + 20 + "px"
        });
        C.css({
            top: e + 20 + "px"
        })
    };
    setNavWidth = function () {
        var E = $("#site-header h1").textWidth();
        var s = "-" + E + "px";
        $("#site-header h1").css({
            "margin-right": s
        });
        var e = $(window).width();
        var D = e - E - 100;
        $("#site-header nav").width(D)
    };
    setPostsOffset();
    setNavWidth();
    hideFlash = function () {};
    showFlash = function () {};
    $("embed").attr("wmode", "transparent");
    var A;
    $("embed").each(function (e) {
        A = $(this).attr("outerHTML");
        if ((A != null) && (A.length > 0)) {
            A = A.replace(/embed /gi, "embed wmode='transparent' ");
            $(this).attr("outerHTML", A)
        } else {
            $(this).wrap("<div></div>")
        }
    });
    if ($("body.permalink-page").length > 0) {
        x = $("article");
        o.initExtras()
    }
    var l = 10;
    if (typeof (Swell.twitterUser) != "undefined") {
        $.ajax({
            url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + Swell.twitterUser + "&count=" + l,
            dataType: "jsonp",
            timeout: 5000,
            success: function (e) {
                $(".twitter_wrap p.tweet").remove();
                $.each(e, function (D, H) {
                    var s = H.text;
                    var F = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g;
                    var K = /(\B)(@)\b([a-zA-Z0-9_\/-]{1,256})/g;
                    var J = /(\B)(#)\b([a-zA-Z0-9_\/-]{1,256})/g;
                    var s = s.replace(F, '<a href="$&">$&</a>');
                    var s = s.replace(K, '<a href="http://twitter.com/#!/$&">$&</a>');
                    var s = s.replace(J, '<a href="http://search.twitter.com/search?q=%23$&">$&</a>');
                    var s = s.replace(/q=%23#/g, "q=%23");
                    var s = s.replace(/http:\/\/twitter.com\/@/g, "http://twitter.com/");
                    var I = jQuery.timeago(new Date(H.created_at));
                    if (I == "NaN years ago") {
                        I = "@" + Swell.twitterUser
                    }
                    var E = ' - <a href="http://twitter.com/#!/' + Swell.twitterUser + "/status/" + H.id_str + '" target="_blank"><span class="timeago">' + I + "</span></a>";
                    var G = "<p>" + s + "<em>" + E + "</em></p>";
                    $(".twitter_wrap").append(G);
                    if (D == (1)) {
                        resizeAbout();
                        return false
                    }
                })
            }
        })
    }
    if (Swell.flickrID) {
        var f = "link";
        var n = "title";
        $("ul.flickrfeed").jflickrfeed({
            limit: 6,
            qstrings: {
                id: Swell.flickrID
            },
            itemTemplate: '<li><a href="{{' + f + '}}"><img src="{{image_s}}" alt="{{' + n + '}}" width="65" height="65" /></a></li>'
        }, function (e) {
            $("#flickr p.loading").remove();
            p.width((b * a));
            if (p.hasClass("isotope")) {
                p.isotope("reLayout")
            }
        })
    }
 
    $(".article-box").click(function (s) {
        s.preventDefault();
        if (!Swell.customizeMode) {
            window.location = "#!" + $(this).find("article").attr("data-permahash")
        }
    });
    $("body.index-page .next-post a").click(function (s) {
        s.preventDefault();
        if (!Swell.customizeMode) {
            o.nextPost()
        }
    });
    $("body.index-page .prev-post a").click(function (s) {
        s.preventDefault();
        if (!Swell.customizeMode) {
            o.prevPost()
        }
    });
    $(".close-post a, #overlay").click(function (s) {
        s.preventDefault();
        if (!Swell.customizeMode) {
            o.unloadArticle()
        }
    });
    $(".short_url_text").click(function () {
        this.select()
    });
    $(window).jkey("j", function () {
        o.nextPost()
    });
    $(window).jkey("k", function () {
        o.prevPost()
    });
    $(window).jkey("esc", function () {
        o.unloadArticle();
        if (j) {
            $.address.value("")
        }
    });
    $(window).smartresize(function () {
        d = Math.floor((r.width() - 40) / a);
        if (d !== b) {
            b = d;
            if (p.hasClass("isotope")) {
                resizeAbout()
            }
            if (c.hasClass("isotope")) {
                resizeContainer()
            }
        }
        setNavWidth();
        setPostsOffset();
        o.resize()
    }).smartresize();
    initReveal = function () {
        openReveal = function () {
            j = !j;
            var e = 300;
            if ($("body").scrollTop() == 0) {
                e = 0
            }
            $("html, body").animate({
                scrollTop: 0
            }, e, "easeInCirc", function () {
                w.removeClass("visuallyhidden").css({
                    "margin-top": getAboutHeight(true)
                });
                $("#header-container").css({
                    position: "absolute"
                });
                $("#site-header").css({
                    position: "relative"
                });
                w.animate({
                    marginTop: 0
                }, 500, "easeInOutCirc", function () {})
            })
        };
        closeReveal = function () {
            j = !j;
            var e = 300;
            if ($("body").scrollTop() == 0) {
                e = 0
            }
            $("html, body").animate({
                scrollTop: 0
            }, e, "easeOutCirc", function () {
                w.animate({
                    marginTop: getAboutHeight(true)
                }, 500, "easeInCirc", function () {
                    $("#header-container").css({
                        position: "fixed"
                    });
                    $("#site-header").css({
                        position: "fixed"
                    });
                    w.addClass("visuallyhidden")
                })
            })
        };
        $(".reveal-about").click(function (s) {
            s.preventDefault();
            if (!Swell.customizeMode) {
                if (!j) {
                    window.location = "#!/about";
                    $.address.value("/about")
                } else {
                    $.address.value("")
                }
            }
        })

    };
    initContainerLayout = function (s) {
        var e = c.find("img");
        $("#iso").imagesLoaded(function () {
            u = true;
            if (i == true) {
                i = false;
                o.loadArticle(g)
            }
            c.delay(200, "isoDelay").queue("isoDelay", function () {
                var D = false;
                c.find(".article-box").css({
                    visibility: "visible"
                });
                if (c.find(".custom-photoset").length > 0) {
                    c.find(".custom-photoset").removeClass("visuallyhidden");
                    c.find(".custom-photoset").tumblrPhotoset({
                        width: "100%",
                        highres: true,
                        margin: 0,
                        onInit: function () {},
                        onComplete: function () {
                            D = true
                        }
                    })
                }
                


                c.isotope({
                    itemSelector: ".article-box",
                    transformsEnabled: false,
                    visibleStyle: {
                        opacity: 1
                    },
                    hiddenStyle: {
                        opacity: 1
                    },
                    resizable: false,
                    masonry: {
                        columnWidth: 263,
                        cornerStampSelector: '.stamp'
                    }
                }, onCompleteContainerLayout())
            }).dequeue("isoDelay")
        })
    };
    onCompleteContainerLayout = function () {
        c.find(".article-box").css({
            visibility: "visible"
        });
        resizeContainer();
        if (c.hasClass("isotope")) {
            c.isotope("reLayout")
        }
        if (Swell.infiniteScroll == true) {
            c.infinitescroll({
                navSelector: ".infinite-pagination ul",
                nextSelector: ".infinite-pagination ul li.next a",
                itemSelector: ".article-box:not(.stamp)",
                loading: {
                    img: "http://static.tumblr.com/fftf9xi/xjOllgsjl/loader.gif",
                    finishedMsg: "No more pages to load."
                },
                bufferPx: 40,
                errorCallback: function () {}
            }, function (e) {
                $(e).find("article").summarizePost({
                    fullPosts: Swell.fullPosts,
                    minimalSummary: Swell.minimalSummary,
                    stripMedia: Swell.stripMedia,
                    len: Swell.truncateLength
                });
                $(e).find("article.video header, article.audio header").each(function () {
                    $(this).prepend('<div class="click-block"></div>');
                    $(this).fitVids()
                });
                $(e).find("article").each(function () {
                    var E = $(this).attr("data-permalink");
                    var G = E.slice(E.indexOf("/", 7));
                    $(this).attr("data-permahash", G);
                    if ($(this).hasClass("audio")) {
                        var D = $(this);
                        var s = D.attr("data-postID");
                        var F = D.find(".player").css({
                            visibility: "hidden"
                        });
                        var I = D.find(".js-dump").html();
                        var H = /\\x3cembed.+\\x3c\/embed\\x3e/;
                        var J = I.match(H)[0].replace(/\\x3cembed/, "\x3cembed wmode=\x22transparent\x22");
                        F.append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + s + "\",'\x3cdiv class=\x22audio_player\x22\x3e" + J + "\x3c/div\x3e')<\/script>");
                        F.css("visibility", "visible")
                    }
                });
                $(e).find("article .post-summary embed").each(function (s) {
                    if ($(this).attr("width") == "100%") {
                        return true
                    }
                    if ($(this).attr("width") == "207") {
                        return true
                    }
                    sizeRatio = $(this).attr("width") / $(this).attr("height");
                    newWidth = 250;
                    newHeight = Math.round(newWidth / sizeRatio);
                    $(this).attr("width", newWidth).attr("height", newHeight).parent().attr("width", newWidth).attr("height", newHeight)
                });
                $(e).imagesLoaded(function () {
                    if ($(e).find(".custom-photoset").length > 0) {
                        $(e).find(".custom-photoset").removeClass("visuallyhidden");
                        $(e).find(".custom-photoset").tumblrPhotoset({
                            width: "100%",
                            highres: true,
                            margin: 0,
                            onInit: function () {},
                            onComplete: function () {
                                customPhotosetComplete = true
                            }
                        })
                    }
                   
                    $(e).click(function (s) {
                        s.preventDefault();
                        window.location = "#!" + $(this).find("article").attr("data-permahash")
                    });
                    if ($(e).find("embed").length > 0) {
                        $(e).find("embed").attr("wmode", "transparent")
                    }
                    if (o.isOpen == true) {
                        hideFlash()
                    }
                    c.isotope("appended", $(e));
                    $(e).css({
                        visibility: "visible"
                    });
                    c.delay(200, "autoPage").queue("autoPage", function () {
                        if ($(window).height() > $("#main").height()) {
                            c.infinitescroll("retrieve")
                        }
                    }).dequeue("autoPage")
                })
            });
            c.delay(200, "autoPage").queue("autoPage", function () {
                if ($(window).height() > $("#main").height()) {
                    c.infinitescroll("retrieve")
                }
            }).dequeue("autoPage")
        }
    };
    initAboutLayout = function (e) {
        p.imagesLoaded(function () {
            p.isotope({
                itemSelector: "section",
                transformsEnabled: false,
                resizable: true,
                masonry: {
                    columnWidth: 20
                }
            }, onCompleteAboutLayout())
        })
    };
    onCompleteAboutLayout = function () {
        p.find("section").css({
            visibility: "visible"
        });
        resizeAbout()
    };
    initContainerLayout();
    initAboutLayout();
    initReveal();
    try {
        Typekit.load({
            active: function () {
                c.width((b * a));
                if (c.hasClass("isotope")) {
                    c.isotope("reLayout")
                }
                p.width((b * a));
                if (p.hasClass("isotope")) {
                    p.isotope("reLayout")
                }
            }
        })
    } catch (y) {}
    if (Swell.customizeMode) {
        $(".audio_player").addClass("customize-audio grey");
        $(".fluid-width-video-wrapper").addClass("customize-embed");
        var B = '<div id="stylehatch-modal"><div class="logo"><a href="http://stylehatch.co" target="_blank"><img src="http://static.tumblr.com/fzgsfsd/Lqcm27cej/style-hatch.png" width="56" height="36"></a></div><div class="theme"><h6>Customization Mode</h6><h2>' + Swell.themeName + '</h2></div><div class="links"><a href="' + Swell.demoSiteURL + '" class="modal-btn demo" target="_blank">Full Demo</a><a href="' + Swell.supportURL + '" class="modal-btn support" target="_blank">Theme Support</a></div></div>';
        $("body").append(B)
    }
});

 
$(window).load(function () {
    setPostsOffset()
});
