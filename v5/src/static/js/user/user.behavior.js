;(function(win){
  try{
    var surl = '//statistic2.liepin.cn/',
        len  = 1,
        data = {
          p: [],
          x: 0
        };

    var func = function(getPoint, remove){
      if(!data.p){
        remove();
        return;
      }
      data.p.push(getPoint());
      if (data.p.length >= len) {
        remove();
        new Image().src = surl + '?p=' + data.p.toString() + '&' + Math.random();
        data.p = null;
      }      
    }

    var touch = function(event){
      func(function(){
        var touches = event.touches ? event.touches[0] : '';
        return [touches.clientX, touches.clientY];
      }, function(){
        win.removeEventListener('touchstart', touch);
      })
    }

    var mousemove = function(event){
      func(function(){
        return [event.clientX, event.clientY];
      }, function(){
        win.removeEventListener('mousemove', mousemove);
      })
    }

    win.addEventListener('mousemove', mousemove);
    win.addEventListener('touchstart', touch);
  }catch(e){}
})(window);
