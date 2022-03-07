
$(function() {
    
    var hash = '';
    var url = new URL(window.location.href);
    if(url.hash) {
        setTimeout(function() {
            $('[data-id=' + url.hash.replace(/#/, '') + ']').click()
        })
    }
    

  // $('.header-mob__close').click(function() {
  //   $('.header-mob').removeClass('on');
  //   $('body').removeClass('on')
  // })

  // if($(window).width() <= 767) {
  //   $('.header-menu a').click(function() {
  //     if($(this).next('.hidden').get(0)) $(this).next('.hidden').slideToggle()
  //   })
  // }

  if($(window).width() <= 575) {
    $('.table__col1').click(function() {
      $(this).toggleClass('on');
      $(this).closest('.table__row').find('.table__col2').slideToggle()
    })
  }

  $('body').click(function(e) {
    if($(".ks-select.opened").get(0)) {
      var parent = e.target;
      if(!$(parent).hasClass("opened")) {
        while(!$(parent).hasClass("opened")) {
          if($(parent).hasClass("opened") || parent.tagName == 'BODY') break;
          parent = parent.parentNode;
        }
        if(!$(parent).hasClass("opened")) {
          $(".ks-select.opened").find(".ks-select__block").toggle();
          $(".ks-select.opened").removeClass("opened");
        }
      }
      
    }

    if($(e.target).hasClass('ks-select__current') || $(e.target).closest('.ks-select__current').get(0)) {
      if(!$(e.target).hasClass('ks-select__clear')) {
        var el = $(e.target);
        var parent = $(e.target).closest('.select');
        if($(e.target).closest('.ks-select__current').get(0)) el = $(el).closest('.ks-select__current');
        if($(".ks-select.opened").get(0) && $(".ks-select.opened").get(0) !== $(el).closest(".ks-select").get(0)) {
          $(parent).find(".ks-select__block").toggle();
          $(parent).toggleClass("opened");
        }
        $(el).next(".ks-select__block").toggle();
        $(el).closest(".ks-select").toggleClass("opened");
      }
      
    }

    else if($(e.target).hasClass('ks-select__item') || $(e.target).closest('.ks-select__item').get(0)) {
      var parent = '';
      parent = $(e.target).closest('.select');
      var el = $(e.target);
      if($(e.target).closest('.ks-select__item').get(0)) el = $(e.target).closest('.ks-select__item');
      if($(parent).get(0) && $(parent).attr('data-multi') == 'yes') {
        $(e.target).toggleClass("active");
        if(!$(e.target).closest(".ks-select__block").find(".ks-select__item.active").get(0)) {
          $(parent).find(".ks-select__current span").text('Не выбрано');
        } else {
           $(parent).find(".ks-select__current span").text($(e.target).closest(".ks-select__block").find(".ks-select__item.active").text());
        }
        
      } else {
        $(parent).find(".ks-select__current span").html($(el).html());
        $(el).closest(".ks-select__block").find(".ks-select__item.active").removeClass("active");
        $(el).addClass("active");
        
        $(el).closest(".ks-select__block").toggle();
        $(el).closest(".ks-select").removeClass("opened");
      }
      
      setTimeout(function() {
        $('.sert__img[data-id=' + $(el).attr('data-id') + ']').click()
      })
    }
    
    
  })

  $('.tag').click(function() {
      $('.tag.on').removeClass('on');
      $(this).addClass('on');
      var that = $(this);
      setTimeout(function() {
        $('.sert__img[data-id=' + $(that).attr('data-id') + ']').click()
      })
  })

  $('.faq__ask').click(function() {
    $(this).closest('.faq__line').find('.faq__answer').slideToggle();
    $(this).toggleClass('on')
  })

  $('.sert__img').click(function() {
    $('.sert__big-img').css('background-image', $(this).css('background-image'));
    var that = $(this);
    if($('.tags').get(0)) {
        $('.tag.on').removeClass('on');
        $('.tag[data-id=' + $(that).attr('data-id') + ']').addClass('on')
        
    } else {
        $('.ks-select__item.active').removeClass('active');
        var el = $('.ks-select__item[data-id=' + $(that).attr('data-id') + ']');
        var parent = $(el).closest('.select');
        $(parent).find(".ks-select__current span").html($(el).html());
        $(el).closest(".ks-select__block").find(".ks-select__item.active").removeClass("active");
        $(el).addClass("active");
        
    }
    
  })
  
  $('.ba-slider').each(function() {
      $(this).beforeAfter();
  })

  

  lightbox.option({
      'albumLabel': "Фото %1 из %2"
    })

  $('[data-tab]').click(function() {
    $(this).closest('[data-tabs-parent]').find('[data-tab].active').removeClass('active');
    $(this).addClass('active');
    $(this).closest('[data-tabs-parent]').find('[data-tab-content].active').removeClass('active');
    $(this).closest('[data-tabs-parent]').find('[data-tab-content][data-id=' + $(this).attr('data-id') + ']').addClass('active');
  })

  $("[data-href]").each(function() {
    $(this).click(function() {
      $('html, body').animate({ scrollTop: $($(this).attr("data-href")).offset().top }, 500);
      return false
    })
  })

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {}



// SCROLL ON PAGE
  $(".scroll").click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 300);
  });


  var cur_scroll;
  var ai_scroll = $(".scroll");
  var w_cur_scroll = $(window).scrollTop();

  $(window).scroll(function() {
    if($(window).scrollTop() < w_cur_scroll) {
      if($(ai_scroll).hasClass("active")) {
        clearTimeout(cur_scroll);
        cur_scroll = setTimeout(function() {$(ai_scroll).removeClass("active");}, 3000)
      }
      if(!$(ai_scroll).hasClass("active")) {
        $(ai_scroll).addClass("active");
        cur_scroll = setTimeout(function() {$(ai_scroll).removeClass("active");}, 3000)
      }
    
    }
    w_cur_scroll = $(window).scrollTop();


  });


// MOBILE_MENU
  $(".toggle-menu").click(function() {
    $('body').addClass('on');
    $(".header-mob").toggleClass("on");
    return false;
  });

  var width = $(window).width();
  $(window).resize(function(){
    if($(window).width() != width){
      heightses();
      width = $(window).width();
    }
  });


  // SLICK


  if($(".main-slider").get(0)) {
    if($(window).width() <= 575) {
      $('.main-slider__slide:not(.mob)').remove();
    } else $('.main-slider__slide.mob').remove();
    $(".main-slider").animate({opacity:1})

    $(".main-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true
    })

  }


  if($(".gallery-slider").get(0)) {
    $(".gallery-slider").animate({opacity:1})

    $(".gallery-slider").slick({
      lazyLoad: 'ondemand',
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
       responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }
      ]
    })

  }
  
  
  if($("#actions").get(0)) {
    $("#actions").animate({opacity:1})

    $("#actions").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      rows:0,
       responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:1
        }
      }
      ]
    })

  }
  
  

  window.addEventListener("orientationchange", function() {
    heightses();
  }, false);


  heightses();


  function heightses() {
     
  }

})