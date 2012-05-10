$(function () {
    if (!InspireWell.customizeMode) {
        $.getScript("http://platform.twitter.com/widgets.js");
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.async = true;
        b.src = "https://apis.google.com/js/plusone.js";
        var k = document.getElementsByTagName("script")[0];
        k.parentNode.insertBefore(b, k)
    }
    $("#likes li:gt(" + (InspireWell.likesCount - 1) + ")").remove();
    if ((!$("body").hasClass("index_page")) && (!$("body").hasClass("permalink_page"))) {
        $("body").addClass("permalink_page")
    }
    if (InspireWell.overallColumn) {
        $isotopeColumn = $("#overall_inner");
        $isotopeColumn.addClass("overall_col")
    } else {
        $isotopeColumn = $("#overall");
        $isotopeColumn.css({
            "padding-bottom": "60px"
        })
    }
    $("li.page_top a").click(function () {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false
    });
    var a = navigator.userAgent.match(/iPhone/i) != null;
    if (!a) {
        $isotopeColumn.isotope({
            itemSelector: ".brick",
            transformsEnabled: false,
            animationEngine: "css",
            visibleStyle: {
                opacity: 1
            },
            hiddenStyle: {
                opacity: 0
            },
            masonry: {
                columnWidth: 260
            }
        });
        $("#overall .post").css({
            visibility: "visible"
        });
        $("div.box img").load(function () {
            $isotopeColumn.isotope("reLayout")
        });
        $("#overall").resize(function () {
            $isotopeColumn.isotope("reLayout")
        })
    }
    $.fn.setupTumblrShare = function (l) {
        return this.each(function () {
            var o = $(this);
            if (l == "vertical") {
                var p = "vertical"
            } else {
                var p = "horizontal"
            }
            if (o.is(":empty")) {
                var t = o.attr("data-permalink");
                var q = o.closest("div.post");
                var m = q.find("div.thumbnail img, div.content_wrap img, div.post_caption img");
                if (m.length > 0) {
                    var s = true;
                    if (m.first().attr("data-highres")) {
                        var r = m.first().attr("data-highres")
                    } else {
                        var r = m.first().attr("src")
                    }
                } else {
                    var s = false;
                    var r = ""
                }
                if (InspireWell.twitterUser) {
                    var n = InspireWell.twitterUser
                } else {
                    var n = ""
                }
                o.tumblrShare({
                    url: t,
                    media: r,
                    via: n,
                    size: p,
                    pinterest: s,
                    onComplete: function () {
                        try {
                            gapi.plusone.go()
                        } catch (u) {}
                        $.getScript("http://platform.twitter.com/widgets.js");
                        $.getScript("http://assets.pinterest.com/js/pinit.js")
                    }
                })
            }
        })
    };

    function f() {
        $(this).find(".share_links_wrapper").show();
        $(this).find(".share_this_over").hide();
        $(this).find("input").focus();
        var l = $(this).find(".share-buttons");
        l.setupTumblrShare()
    }
    function d() {
        $(this).find(".share_links_wrapper").hide()
    }
    InspireWell.shareThisConfig = {
        sensitivity: 2,
        interval: 0,
        over: f,
        timeout: 500,
        out: d
    };
    InspireWell.triggerResize = 500;
    $(".share_links_bar .share-buttons").setupTumblrShare();
    var j = false;
    $(".custom-photoset").imagesLoaded(function () {
        $(".custom-photoset").removeClass("visuallyhidden");
        $(".custom-photoset").tumblrPhotoset({
            width: "100%",
            highres: true,
            margin: 2,
            onInit: function () {},
            onComplete: function () {
                $(".custom-photoset").removeClass("visuallyhidden");
                j = true;
                $(".custom-photoset a").colorbox({
                    photo: true,
                    maxHeight: "85%",
                    maxWidth: "85%"
                });
                setTimeout(function () {
                    $(".custom-photoset").resize(function () {
                        $(this).data("tumblrPhotoset").resizePhotoset()
                    })
                }, 400)
            },
            onResizeComplete: function () {
                $isotopeColumn.isotope("reLayout")
            }
        })
    }, function () {
        log("Error: Unable to render photoset due to one or more 404/403 image load errors");
        $(".custom-photoset").removeClass("visuallyhidden")
    });
    $(".post").setupPosts();
    var h = InspireWell.tweetCount * 3;
    if (InspireWell.twitterUser) {
        $.ajax({
            url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + InspireWell.twitterUser + "&count=" + h,
            dataType: "jsonp",
            timeout: 5000,
            success: function (l) {
                $(".twitter_wrap p.tweet").remove();
                $.each(l, function (n, r) {
                    var m = r.text;
                    var p = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g;
                    var u = /(\B)(@)\b([a-zA-Z0-9_\/-]{1,256})/g;
                    var t = /(\B)(#)\b([a-zA-Z0-9_\/-]{1,256})/g;
                    var m = m.replace(p, '<a href="$&">$&</a>');
                    var m = m.replace(u, '<a href="http://twitter.com/#!/$&">$&</a>');
                    var m = m.replace(t, '<a href="http://search.twitter.com/search?q=%23$&">$&</a>');
                    var m = m.replace(/q=%23#/g, "q=%23");
                    var m = m.replace(/http:\/\/twitter.com\/@/g, "http://twitter.com/");
                    var s = jQuery.timeago(new Date(r.created_at));
                    if (s == "NaN years ago") {
                        s = "@" + InspireWell.twitterUser
                    }
                    var o = '<a href="http://twitter.com/#!/' + InspireWell.twitterUser + "/status/" + r.id_str + '" target="_blank"><span class="timeago"> - ' + s + "</span></a>";
                    var q = "<p>" + m + "<br /><em>" + o + "</em></p>";
                    $(".twitter_wrap").append(q);
                    if (!a) {
                        $isotopeColumn.isotope("reLayout")
                    }
                    if (n == (InspireWell.tweetCount - 1)) {
                        return false
                    }
                })
            }
        })
    }
    if (InspireWell.flickrID) {
        var e = "link";
        var g = "title";
        $("ul.flickrfeed").jflickrfeed({
            limit: 4,
            qstrings: {
                id: InspireWell.flickrID
            },
            itemTemplate: '<li><a href="{{' + e + '}}"><img src="{{image_s}}" alt="{{' + g + '}}" /></a></li>'
        }, function (l) {
            $(".info .flickr p.loading").remove()
        })
    }
    if (InspireWell.infiniteScrolling && InspireWell.indexPage) {
        $("li.page_next, li.page_previous").css({
            display: "none"
        })
    }
    var c = false;
    if (InspireWell.infiniteScrolling && InspireWell.indexPage) {
        $isotopeColumn.infinitescroll({
            navSelector: "ul.page_nav_infscroll",
            nextSelector: "ul.page_nav_infscroll li.page_next a",
            itemSelector: ".post",
            loadingImg: "",
            bufferPx: 40,
            errorCallback: function () {
                log("Infinite scroll error");
                $("#loading").hide()
            }
        }, function (l) {
            $isotopeColumn.infinitescroll("pause");
            c = false;
            $(l).css({
                visibility: "hidden"
            });
            $(l).each(function () {
                if ($(this).hasClass("audio")) {
                    var q = $(this);
                    var p = q.attr("data-postID");
                    var r = q.find(".player span").css({
                        visibility: "hidden"
                    });
                    var t = q.find(".js-dump").html();
                    var s = /\\x3cembed.+\\x3c\/embed\\x3e/;
                    var u = t.match(s)[0].replace(/\\x3cembed/, "\x3cembed wmode=\x22opaque\x22");
                    r.append('<script type="text/javascript">replaceIfFlash(9,"audio_player_' + p + "\",'\x3cdiv class=\x22audio_player\x22\x3e" + u + "\x3c/div\x3e')<\/script>");
                    r.css("visibility", "visible")
                }
            });
            $isotopeColumn.delay(200, "autoPage").queue("autoPage", function () {
                if ($(window).height() > $("#overall").height()) {
                    $isotopeColumn.infinitescroll("resume");
                    log("resume")
                }
            }).dequeue("autoPage");
            $(l).setupPosts();
            if (InspireWell.disqusUsername) {
                var n = InspireWell.disqusUsername;
                (function () {
                    var p = document.createElement("script");
                    p.async = true;
                    p.type = "text/javascript";
                    p.src = "http://" + n + ".disqus.com/count.js";
                    (document.getElementsByTagName("HEAD")[0] || document.getElementsByTagName("BODY")[0]).appendChild(p)
                }())
            }
            var o = $(l).find("img");
            if (o.length >= 1) {
                $(l).imagesLoaded(function () {
                    if (c == false) {
                        $isotopeColumn.delay(200, "autoPage").queue("autoPage", function () {
                            if ($(window).height() > $("#overall").height()) {
                                $isotopeColumn.infinitescroll("resume");
                                log("resume")
                            }
                        }).dequeue("autoPage");
                        $(l).css({
                            visibility: "visible"
                        });
                        var q = false;
                        $(l).find(".custom-photoset").removeClass("visuallyhidden");
                        $(l).find(".custom-photoset").tumblrPhotoset({
                            width: "100%",
                            highres: true,
                            margin: 2,
                            onInit: function () {},
                            onComplete: function () {
                                $(l).find(".custom-photoset").removeClass("visuallyhidden");
                                q = true;
                                $(l).find(".custom-photoset a").colorbox({
                                    photo: true,
                                    maxHeight: "90%",
                                    maxWidth: "90%"
                                })
                            }
                        });
                        $isotopeColumn.isotope("appended", $(l));
                        $("#loading").hide();
                        $isotopeColumn.infinitescroll("resume");
                        c = true;
                        if ($(l).find("embed").length > 0) {
                            $(l).find("embed").attr("wmode", "transparent");
                            var p;
                            $(l).find("embed").each(function (r) {
                                p = $(this).attr("outerHTML");
                                if ((p != null) && (p.length > 0)) {
                                    p = p.replace(/embed /gi, "embed wmode='transparent' ");
                                    $(this).attr("outerHTML", p)
                                } else {
                                    $(this).wrap("<div></div>")
                                }
                            })
                        }
                    }
                })
            } else {
                if (c == false) {
                    $isotopeColumn.isotope("appended", $(l));
                    $(l).css({
                        visibility: "visible"
                    });
                    $("#loading").hide();
                    $isotopeColumn.infinitescroll("resume");
                    c = true;
                    if ($(l).find("embed").length > 0) {
                        $(l).find("embed").attr("wmode", "transparent");
                        var m;
                        $(l).find("embed").each(function (p) {
                            m = $(this).attr("outerHTML");
                            if ((m != null) && (m.length > 0)) {
                                m = m.replace(/embed /gi, "embed wmode='transparent' ");
                                $(this).attr("outerHTML", m)
                            } else {
                                $(this).wrap("<div></div>")
                            }
                        })
                    }
                }
            }
            $isotopeColumn.delay(200, "autoPage").queue("autoPage", function () {
                if ($(window).height() > $("#overall").height()) {
                    $isotopeColumn.infinitescroll("retrieve");
                    log("resume")
                }
            }).dequeue("autoPage")
        });
        $isotopeColumn.delay(200, "autoPage").queue("autoPage", function () {
            if ($(window).height() > $("#overall").height()) {
                $isotopeColumn.infinitescroll("retrieve");
                log("resume")
            }
        }).dequeue("autoPage")
    }
    if (InspireWell.customizeMode) {
        $(".audio_player").addClass("customize-audio white");
        $(".fluid-width-video-wrapper").addClass("customize-embed");
        var i = '<div id="stylehatch-modal"><div class="logo"><a href="http://stylehatch.co" target="_blank"><img src="http://static.tumblr.com/fzgsfsd/Lqcm27cej/style-hatch.png" width="56" height="36"></a></div><div class="theme"><h6>Customization Mode</h6><h2>' + InspireWell.themeName + '</h2></div><div class="links"><a href="' + InspireWell.demoSiteURL + '" class="modal-btn demo" target="_blank">Full Demo</a><a href="' + InspireWell.supportURL + '" class="modal-btn support" target="_blank">Theme Support</a></div></div>';
        $("body").append(i)
    }
});
$(window).load(function () {
    $("#loading").fadeOut(250);
    if (!InspireWell.progressiveLoad) {
        $("#overall .post").css({
            visibility: "visible"
        })
    }
    var a = navigator.userAgent.match(/iPhone/i) != null;
    if (!a) {
        $isotopeColumn.isotope("reLayout")
    }
});
