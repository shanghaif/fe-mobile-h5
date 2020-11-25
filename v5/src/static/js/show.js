/**
 * Created by panyanming on 15/6/29.
 */
function clearAllanimate(className){
    $(className)
        .css("display","none")
        .css('transform-origin',"")
        .css('animation-name',"")
        .css('animation-duration',"")
        .css('animation-timing-function',"")
        .css('animation-delay',"")
        .css('animation-iteration-count',"")
        .css("animation-fill-mode", "");
}
function animatePlay(animate,elm){
    if(animate.length){
        ~function _animatePlay(animate,elm,m){
            var amt= [],amt = animate[m];
            if(amt && amt.animationName){
                setTimeout(function(){
                    elm.css('transform-origin',amt.transformOrigin);
                    elm.css('animation-name',amt.animationName);
                    elm.css('animation-duration',amt.animationDuration+'s');
                    elm.css('animation-timing-function',amt.animationTimingFunction);
                    elm.css('animation-delay',amt.animationDelay+'s');
                    elm.css('animation-iteration-count', (amt.isInfinite ? 'infinite' : (amt.animationIterationCount||0)+''));
                    elm.css("animation-fill-mode", "both");
                    elm.css('-webkit-transform-origin',amt.transformOrigin);
                    elm.css('-webkit-animation-name',amt.animationName);
                    elm.css('-webkit-animation-duration',amt.animationDuration+'s');
                    elm.css('-webkit-animation-timing-function',amt.animationTimingFunction);
                    elm.css('-webkit-animation-delay',amt.animationDelay+'s');
                    elm.css('-webkit-animation-iteration-count', (amt.isInfinite ? 'infinite' : (amt.animationIterationCount||0)+''));
                    elm.css("-webkit-animation-fill-mode", "both");
                    elm.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        _animatePlay(animate,elm,++m);
                    });
                    elm.css("display","inline-block");
                },10);
            }
        }(animate,elm,0);
    }else{
        elm.css("display","inline-block");
    }
}
$('.panel-content').on('click','[data-link]',function(){
    var link = $(this).data('link');
    if(link && !/^http[s]?:\/\/$/.test(link)){
        window.location.href = link;
    }
});
function swiperPlayLoop(data,swiper){
    var len = data.length,index = 0;
    clearAllanimate('.panel-node-animate');
    if(swiper.activeIndex < 0){
        index = swiper.activeIndex+len;
    }else if(swiper.activeIndex == 0){
        index = len-1;
    }else if(swiper.activeIndex > len){
        index = swiper.activeIndex % len -1
    }else{
        index = swiper.activeIndex-1
    }
    data[index] && data[index].nodes.forEach(function(node){
        animatePlay(node.animate,$('.nodeAnnimate-'+node.nodeId))
    });
};
function swiperPlay(data,swiper){
    clearAllanimate('.panel-node-animate');
    data[swiper.activeIndex] && data[swiper.activeIndex].nodes.forEach(function(node){
        animatePlay(node.animate,$('.nodeAnnimate-'+node.nodeId))
    });
};
$(window).on('load',function(){
    var scaleW=$(window).width()/320,
        scaleH=$(window).height()/486,
        finalScale = scaleW > scaleH ? scaleH :scaleW,
        viewArr = ["width=320", "initial-scale="+finalScale, "maximum-scale="+finalScale, "user-scalable=no"];
    var effect;
    var audio = document.getElementById("audio");
    if (audio) {
        audio.play();
        $('#music').bind('click',function(){
            if(audio.paused){
                audio.play();
                $(this).removeClass('stop');
            }else{
                audio.pause();
                $(this).addClass('stop');
            }
        });
    };
    $('#viewport').attr('content',viewArr.join());
    $('#loading').remove();
    effect = [
        {
            direction : 'vertical',
            loop:false,
            onInit: function(swiper){
                swiperPlay(CONFIG.dataPage,swiper)
            },
            onSlideChangeEnd: function(swiper){
                swiperPlay(CONFIG.dataPage,swiper)
            }
        },
        {
            direction : 'horizontal',
            loop:false,
            onInit: function(swiper){
                swiperPlay(CONFIG.dataPage,swiper)
            },
            onSlideChangeEnd: function(swiper){
                swiperPlay(CONFIG.dataPage,swiper)
            }
        },
        {
            direction : 'vertical',
            loop:true,
            onInit: function(swiper){
                swiperPlayLoop(CONFIG.dataPage,swiper)
            },
            onSlideChangeEnd: function(swiper){
                swiperPlayLoop(CONFIG.dataPage,swiper)
            }
        },
        {},
        {
            direction : 'horizontal',
            loop:true,
            onInit: function(swiper){
                swiperPlayLoop(CONFIG.dataPage,swiper)
            },
            onSlideChangeEnd: function(swiper){
                swiperPlayLoop(CONFIG.dataPage,swiper)
            }
        }
    ];
    CONFIG.effect-=0;
    if(CONFIG.effect<2){
        $('.up').last().remove();
    }
    if(CONFIG.effect==1 || CONFIG.effect==4){
        $('.up').addClass('left');
    }
    new Swiper('.swiper-container', effect[CONFIG.effect]);
});
