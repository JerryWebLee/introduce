(function ($) {
  $.extend({
    firstPage: function (ele) {

      // 阻止.up的子元素span的事件冒泡
      $('.up span').one('animationend', function (event) {
        event = event || window.event
        event.stopPropagation()
      })
      //  调用事件生成器
      const iter = animationendListener(ele)
      //  对生成器里面的回调函数进行调用
      iter.next()
      iter.next()

    },
    secondPage: function (ele) { }
  })

  // 创建动画结束事件的监听器生成器函数，避免回调地狱，采用生成器
  function* animationendListener(ele) {
    // 监听line元素动画结束事件
    $('.line').one('animationend', function () {
      // 给up和down页面增加动画类
      $('.up').addClass('animationUpToZero')
      $('.down').addClass('animationDownToZero')
    })
    yield
    // 监听up上动画结束事件
    $('.up').one('animationend', function () {
      $(ele).hide()
    })
    return
  }

})(jQuery)