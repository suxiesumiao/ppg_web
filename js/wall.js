;
(function (global, $) {
  // 照片墙相关
  global.Wall = function (tag) {
    this.$wall_main = $(tag),
      this.$image = this.$wall_main.find('img');
    if (!tag || this.$image[0] || !this.$wall_main[0]) {
      return
    }
    this.$wall_width = this.$wall_main.width(),
      this.$wall_height = this.$wall_main.height()
  }
  Wall.prototype = {
    constructor: Wall,
    init: function () {
    },
    getRandom: function (min, max) {
      min = min || 0;
      max = max || 600;
      return parseInt(Math.random() * (max - min)) + min
    },
    render: function () {
      var that = this;
      var $slip = $(this).siblings('img').length + 1;
      var $width = that.getRandom(180, 200);

      this.$image.each(function (i, v) {
        var $top = that.getRandom(20, 200);
        var $left = that.getRandom(0, 50) + 150 * i
        // 含抗锯齿 z
        $(this).css({
          width: $width,
          top: $top,
          left: $left,
          transform: 'rotate(' + that.getRandom(-10, 10) + 'deg) translateZ(0)'
        })
        var $tempLeft = parseInt($left)
        var $tempTop = parseInt($top)
        var $adderImage = $('<img src= "./icons/pin.png" />').css({
          left: $tempLeft + 90 + 'px',
          top: $tempTop - 20 + 'px',
          position: 'absolute',
          transform: 'rotate(' + that.getRandom(-30, 10) + 'deg)'
        })
        that.$wall_main.after($adderImage)
      })
    }
  }
})(window, jQuery)