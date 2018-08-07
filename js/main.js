$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  infinite: false,
  arrows: false,
  loader: false
});
$('.main-slider').slick();