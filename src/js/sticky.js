const header = document.querySelector('.header');
const sticky = header.offsetTop;

const onScroll = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add('header--sticky');
  } else {
    header.classList.remove('header--sticky');
  }
};

window.addEventListener('scroll', onScroll);
