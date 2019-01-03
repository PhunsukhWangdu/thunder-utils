var supportPassive = false;

try{
  var opts = Object.defineProperties({}, 'passive', {
    get: function() {
      supportPassive = true;
    }
  })
  window.addEventListener("test", null, opts);
} catch(e) {}

//使用

document.body.addEventListener('touchstart', function(){}, supportPassive ? { passive: true } : {passive: false})