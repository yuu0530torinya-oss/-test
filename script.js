document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion__item');

  accordions.forEach(item => {
    item.addEventListener('click', () => {
      const expanded = item.getAttribute('aria-expanded') === 'true';
      accordions.forEach(el => el.setAttribute('aria-expanded', 'false'));
      item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
});
