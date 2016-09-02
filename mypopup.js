'use strict';

(function ($) {
    var popshow = false;
    $.fn.mypopup = function (options) {
        var config = $.extend({
            orignal: '.relative',
            target: '.dialog',
            cancel: '.cancel',
            speed: 200
        }, options);

        var setting = $.extend({}, config, options);

        var action = {

            show: function (id) {
                action.position();
                //判断是不是有其他的弹出层
                if (popshow) {
                    return;
                } else {
                    $('#' + id).find(setting.target).fadeIn(setting.speed);
                    popshow = true;
                }

            },
            close: function (id) {

                $('#' + id).find(setting.target).fadeOut(setting.speed);
                popshow = false;
            },
            position: function () {
                var origWidth = $(setting.orignal).width();
                var targetWidth = $(setting.target).width();
                var docHeight = $(document).height();
                var targetHeight = $(setting.target).height();
                var orignalTop=$(setting.orignal).offset().prototype;
                var postionTop = (docHeight - targetHeight) / 2;
                var postionLeft = (origWidth - targetWidth) / 2;
                $(setting.target).css({
                    'left': postionLeft,
                    'top': postionTop
                });
            }
        };
        $(window).resize(action.position);
        return this.each(function () {
            $(this).click(function () {

                var id = 'id' + parseInt(Math.random() * 10000000);
                $(this).parents(setting.orignal).attr('id', id);

                action.show(id);

            });

            $(this).parents(setting.orignal).find(setting.cancel).click(function () {
                var id = $(this).parents(setting.orignal).attr('id');
                //判断是不是和当前的对象在一个层里面
                if ($(this).parents(setting.orignal).children(setting.target).css('display') === 'none') {
                    return;
                } else {
                    action.close(id);
                }

            });


        });

    };

}(jQuery));

$('.edit').mypopup();
$('.edit-one').mypopup();
$('.edit-two').mypopup({
    orignal:'.relative02',
    target:'.dialog02'
});