;
(function ($) {
  $(function () {
    $('#navbar li a').addClass('rad').each(function (v) {
      $(this).attr('title', $(this).attr('href').replace('#', ''))
    });

    $('.links_all p a').each(function (v) {
      $(this).attr('title', $(this).text())
    })
    // 初始化 vue
    var vue_data = new Vue({
      el: '#vue_control',
      data: {
        data_all: null,
        detail: null,
        // click 选择 默认 第一个是开的
        click_index: 0
      },
      created: function () {
        var current_hash = window.location.hash.replace('#', '');
        if (!current_hash || current_hash === 'company') {
          return
        } else {
          $.getJSON('../store/' + current_hash + '.json', function (data) {
            vue_data.data_all = data;
            vue_data.detail = vue_data.data_all.data_main[0];
            $('.navbar-inverse .navbar-nav>li').filter(function (v) {
              return $(this).find('a').attr('href') === '#' + current_hash
            }).addClass('active').siblings('.active').removeClass('active')
            $('.replacer').hide()
            $('#vue_control').removeClass('hide')
          })
        }
      },
      methods: {
        click_init: function(){
          this.click_index = 0;
        },
        get_detail: function (index) {
          this.detail = this.data_all.data_main[index];
        },
        changeTab: function(index){
          if(this.click_index === index){ return }
          this.click_index = index;
        },
        scale: function(el){
          var $eTargrt = $(el.target);
          $eTargrt.toggleClass('big');
          $('#mask').toggleClass('maskall')
        }
      }
    })

    $('.navbar-inverse .navbar-nav>li').on('click', function () {
      $(this).addClass('active').siblings('.active').removeClass('active')
    })

    var mySwiper = new Swiper('.swiper-container', {
      // direction: 'vertical',
      loop: true,
      autoplay: 5000,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        // el: '.swiper-scrollbar',
      },
    })

    // 顶端链接点击
    $('#navbar li:not(".static") a').on('click', function (e) {
      $('.replacer').hide();
      $('#vue_control').removeClass('hide')
      var aLink = $(this).attr('href').replace('#', '')
      $.getJSON('./store/' + aLink + '.json', function (data) {
        vue_data.data_all = data;
        vue_data.detail = vue_data.data_all.data_main[0];
        vue_data.click_init();
      })
    })

    $('#navbar li.static').on('click', function (e) {
      $('.replacer').show();
      $('#vue_control').addClass('hide')
    })

    var $link = $('#navbar li a');
    var $toper = $('.navbar.navbar-inverse.navbar-fixed-top');
    var $swiper_tag = $('.swiper_tag');
    var $top_height = $('.container.full').height();
    var $logo_width = $('#logo span').width();
    var top;
    $('img#ppg').css({
      height: $top_height * 0.8 + 'px',
      left: (30 + $logo_width - $top_height * 0.8) / 2 + 'px',
      top: $top_height * 0.1 + 'px',
    })
    // 滚动触发
    $(document).on('scroll', function () {
      top = $(document).scrollTop()
      if (top > $top_height) {
        $link.removeClass('rad');
        $toper.addClass('top_fixed')
        $swiper_tag.addClass('top_marginer')
      } else {
        $link.addClass('rad');
        $toper.removeClass('top_fixed')
        $swiper_tag.removeClass('top_marginer')
      }
    })
    var my_wall = new Wall('.staff-container')
    my_wall.render();

    // 员工风采切换相关
    // $('#staff main .side li').on('click', function(v){
    //   $(this).addClass('active').siblings('.active').removeClass('active')
    //   console.log($(this))
    // })

    $('#staff main .side li').each(function (i, v) {
      $(this).on('click', function () {
        $(this).addClass('active').siblings('.active').removeClass('active')
        $(this).parents('.side').siblings('.staff-container')
          .find('img').each(function (fi, fv) {
            $(fv).attr('src', $(fv).attr('src').replace(/(\/)\d+(\/)/, '$1' + i + '$2'))
          })
      })
    })

    // 遮盖层
    $('#mask').on('click', function(){
      $(this).toggleClass('maskall')
      $('img.scale').toggleClass('big')
    })
  })
})(jQuery);