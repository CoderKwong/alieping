
//左侧导航栏
$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var links = this.el.find('.link');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');
        $this.find('.click-before').toggleClass("false");
        $this.find('.click-after').toggleClass("false");
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
            $el.find('.submenu').not($next).slideUp().prev().find('.click-before').removeClass('false');
            $el.find('.submenu').not($next).slideUp().prev().find('.click-after').addClass('false');
        }
    };

    var accordion = new Accordion($('#accordion'), false);
});

//左边导航栏
function cartscroll() {
    let cart=function () {
        if($(document).scrollTop()<=48){
            $(".main .aside").css({"top":48-$(document).scrollTop()});
        }
        if($(document).scrollTop()>=48){
            $(".main .aside").css({"top":0});
        }
    };
    $(window).on("scroll",cart);
}
cartscroll();
