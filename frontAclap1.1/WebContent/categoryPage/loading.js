const Transitions = (() => {

  const pages = Array.from(document.querySelectorAll('.page'));
  const btn = document.querySelector('.btn');
  let pageIndex = 0;
  let animationIndex = 0;
  let isAnimating = false;
  let currentPageEnded = false;
  let nextPageEnded = false;

  function init() {
    if (pages.length < 2) {
      throw new Error('Must be at least 2 pages to transition between.');
    }
    // store current classNames.
    pages.forEach(page => page.data = { classList: page.getAttribute('class') });
    pages[pageIndex].classList.add('page--current');

    btn.addEventListener('click', function () {
      if (isAnimating) return false;
      if (animationIndex === animations.length) {
        animationIndex = 0;
      }
      transitionPage(animationIndex);
      ++animationIndex;
    });

  }

  function transitionPage(index) {
    if (isAnimating) {
      return false;
    }
    isAnimating = true;

    // update currents value and add className to nextPage.
    const currentPage = pages[pageIndex];
    pageIndex = pageIndex < pages.length - 1 ? ++pageIndex : 0;
    const nextPage = pages[pageIndex];
    nextPage.classList.add('page--current');

    // Search through animations and get related classNames for anim at animation index.
    const transitionType = animations[animationIndex];
    const key = Object.keys(transitionType);
    console.log(transitionType, key);
    const { [key]: { inClass, outClass } } = transitionType;

    // add eventListeners for page transitions
    currentPage.addEventListener('animationend', function _() {
      currentPage.removeEventListener('animationend', _);
      currentPageEnded = true;

      if (nextPageEnded) {
        endAnimation(currentPage, nextPage);
      }
    });
    currentPage.classList.add(...outClass);

    nextPage.addEventListener('animationend', function _() {
      nextPage.removeEventListener('animationend', _);
      nextPageEnded = true;

      if (currentPageEnded) {
        endAnimation(currentPage, nextPage);
      }
    });
    nextPage.classList.add(...inClass);
  }

  function endAnimation(outPage, inPage) {
    currentPageEnded = false;
    nextPageEnded = false;
    isAnimating = false;
    outPage.setAttribute(`class`, `${outPage.data.classList}`);
    inPage.setAttribute(`class`, `${inPage.data.classList} page--current`);
  }

  const animations = [
  {
    fromRight: {
      inClass: ['fromRight'],
      outClass: ['toLeft'] } },


  {
    fromLeft: {
      inClass: ['fromLeft'],
      outClass: ['toRight'] } },


  {
    fromBottom: {
      inClass: ['fromBottom'],
      outClass: ['toTop'] } },


  {
    fromTop: {
      inClass: ['fromTop'],
      outClass: ['toBottom'] } },


  {
    fromRightFade: {
      inClass: ['fromRightFade'],
      outClass: ['toLeftFade'] } },


  {
    fromLeftFade: {
      inClass: ['fromLeftFade'],
      outClass: ['toRightFade'] } },


  {
    fromBottomFade: {
      inClass: ['fromBottomFade'],
      outClass: ['toTopFade'] } },


  {
    fromTopFade: {
      inClass: ['fromTopFade'],
      outClass: ['toBottomFade'] } }];




  init();

})();