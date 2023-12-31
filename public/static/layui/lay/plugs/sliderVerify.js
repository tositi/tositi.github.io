layui.define(["jquery", "layer", "form"], function(s) {
    var d = layui.jquery
      , b = layui.form
      , r = layui.layer
      , k = layui.device()
      , h = {
        read: (function() {
            var u = ".slider-item{height:38px;line-height:38px;background-color:#d0d0d0;position:relative;border: 1px solid white;}.slider-bg{position:absolute;width:40px;height:100%;z-index:100}.slider-btn{width:40px;height:96%;position:absolute;border:1px solid #ccc;cursor:move;text-align:center;background-color:#fff;user-select:none;color:#666;z-index:120}.slider-btn-success{font-size:26px}.slider-text{position:absolute;text-align:center;width:100%;height:100%;user-select:none;font-size:14px;color:#fff;z-index:120}.slider-error{animation:glow 800ms ease-out infinite alternate;}@keyframes glow{0%{border-color:#e6e6e6}100%{border-color:#ff5722}}"
              , v = document.createElement("style");
            v.innerHTML = u;
            v.type = "text/css";
            (d("head link:last")[0] && d("head link:last").after(v)) || d("head").append(v)
        }
        )()
    }
      , m = function(u) {
        return u[0]
    }
      , o = function() {
        var u = this;
        return {
            isOk: function() {
                return u.isOk.call(u)
            },
            reset: function() {
                return u.reset.call(u)
            },
            version: "1.6"
        }
    }
      , g = "sliderVerify"
      , i = "slider-btn"
      , j = "slider-bg"
      , q = "slider-text"
      , a = "layui-icon-next"
      , t = "layui-icon-ok-circle"
      , f = "slider-btn-success"
      , n = "layui-bg-green"
      , c = "slider-error"
      , p = "请拖动滑块验证"
      , e = "验证通过"
      , l = function(u) {
        var v = this;
        v.config = d.extend({}, v.config, u);
        v.render()
    };
    l.prototype.config = {
        elem: "",
        onOk: null,
        isOk: false,
        isAutoVerify: true,
        bg: n,
        text: p
    };
    l.prototype.render = function() {
        var w = this
          , u = w.config
          , v = d(u.elem);
        if (!v[0]) {
            return
        }
        if (u.domid) {
            u.domid.remove()
        }
        u.domid = w.createIdNum();
        var x = d(['<div id="' + u.domid + '"' + (u.isAutoVerify ? 'lay-verify="sliderVerify"' : "") + 'class="slider-item">', '<div class="' + j + " " + u.bg + '"></div>', '<div class="' + q + '">' + u.text + "</div>", '<div class="' + i + ' layui-icon layui-icon-next"></div>'].join(""));
        v.hide().after(x);
        u.domid = d("#" + u.domid);
        w.events();
        if (u.isAutoVerify) {
            b.verify({
                sliderVerify: function(y, z) {
                    if (!y) {
                        z.classList.add(c);
                        return u.text
                    }
                }
            })
        }
    }
    ;
    l.prototype.isMobile = function() {
        return (k.os == "ios" || k.os == "android" || k.android || k.ios) || (k.weixin && typeof k.weixin === Boolean)
    }
    ;
    l.prototype.createIdNum = function() {
        return (g + (+new Date()).toString() + Math.random().toString().substr(2, 7))
    }
    ;
    l.prototype.isOk = function() {
        return this.config.isOk
    }
    ;
    l.prototype.error = function(u) {
        return r.msg(u, {
            icon: 5
        })
    }
    ;
    l.prototype.distance = function() {
        var u = this.config.container;
        return u.box.offsetWidth - u.btn.offsetWidth
    }
    ;
    l.prototype.reset = function() {
        this.config.isOk = false;
        return this.render()
    }
    ;
    l.prototype.resize = function(w) {
        var v = this
          , u = v.config.container;
        var w = w || v.distance();
        u.btn.style.left = w + "px";
        u.bg.style.width = w + "px"
    }
    ;
    l.prototype.cancelTransition = function() {
        var u = this.config.container;
        this.config.domid[0].classList.remove(c);
        u.btn.style.transition = "";
        u.bg.style.transition = ""
    }
    ;
    l.prototype.down = function(y) {
        var x = this
          , w = x.config
          , v = w.container
          , y = y || window.event
          , z = y.clientX || y.touches[0].clientX;
        x.cancelTransition();
        var u = function(A) {
            x.move(z, A)
        };
        x.events.move = u;
        if (x.isMobile()) {
            document.addEventListener("touchmove", x.events.move)
        } else {
            document.onmousemove = u
        }
        if (navigator.userAgent.indexOf("UCBrowser") > -1) {
            y.preventDefault()
        }
    }
    ;
    l.prototype.move = function(B, z) {
        var y = this
          , x = y.config
          , v = x.container;
        var z = z || window.event;
        let moveX = z.clientX || z.touches[0].clientX;
        var u = moveX - B;
        if (u > v.distance) {
            u = v.distance
        } else {
            if (u < 0) {
                u = 0
            }
        }
        v.btn.style.left = u + "px";
        v.bg.style.width = u + "px";
        if (u == v.distance) {
            v.text.innerHTML = e;
            var w = window.getComputedStyle ? window.getComputedStyle(v.bg, null) : v.bg.currentStyle;
            v.btn.style.border = "1px solid " + w.backgroundColor;
            v.btn.style.color = w.backgroundColor;
            v.btn.classList.remove(a);
            v.btn.classList.add(t, f);
            x.isOk = true;
            v.box.value = true;
            if (y.isMobile()) {
                v.btn.removeEventListener("touchstart", y.events.down, false);
                document.removeEventListener("touchmove", y.events.move, false)
            } else {
                v.btn.onmousedown = null;
                document.onmousemove = null
            }
            x.onOk && typeof x.onOk == "function" && x.onOk();
            return
        }
        var A = function(C) {
            y.stop(C)
        };
        y.events.seup = A;
        if (y.isMobile()) {
            document.addEventListener("touchend", A)
        } else {
            document.onmouseup = A
        }
    }
    ;
    l.prototype.stop = function(x) {
        var w = this
          , v = w.config
          , u = v.container;
        if (w.isOk()) {
            return
        } else {
            u.btn.style.left = 0;
            u.bg.style.width = 0;
            u.btn.style.transition = "left 1s";
            u.bg.style.transition = "width 1s"
        }
        document.onmousemove = null;
        document.onmouseup = null;
        if (w.isMobile()) {
            document.removeEventListener("touchmove", w.events.move, false);
            document.removeEventListener("touchend", w.events.seup, false)
        }
    }
    ;
    l.prototype.events = function() {
        var z = this
          , y = z.config;
        if (!y.domid) {
            return z.error("创建滑块验证失败")
        }
        var x = y.domid.find("." + i)
          , w = y.domid.find("." + j)
          , A = y.domid.find("." + q)
          , v = {
            box: m(y.domid),
            btn: m(x),
            bg: m(w),
            text: m(A)
        };
        y.container = v;
        v.distance = z.distance();
        var B = function(C) {
            z.down(C)
        };
        z.events.down = B;
        if (z.isMobile()) {
            v.btn.addEventListener("touchstart", z.events.down)
        } else {
            v.btn.onmousedown = B
        }
        var u = d(window);
        u.on("resize", y.domid, function() {
            if (z.config.isOk) {
                z.resize()
            }
        })
    }
    ;
    h.render = function(u) {
        var v = new l(u);
        return o.call(v)
    }
    ;
    s(g, h)
});
