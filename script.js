const photos = [...document.querySelectorAll('.photo')];
const viewer = document.querySelector('#viewer');
const fullPhoto = document.querySelector('#full-photo');
const caption = document.querySelector('#caption');
let visiblePhotos = photos;
let current = 0;
let opener;
function showPhoto(index) {
  current = (index + visiblePhotos.length) % visiblePhotos.length;
  const photo = visiblePhotos[current];
  fullPhoto.src = photo.querySelector('img').getAttribute('src');
  fullPhoto.alt = photo.querySelector('img').alt;
  caption.textContent = `${current + 1} / ${visiblePhotos.length} · ${fullPhoto.alt}`;
}
photos.forEach(photo => photo.addEventListener('click', () => {
  opener = photo;
  showPhoto(visiblePhotos.indexOf(photo));
  viewer.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  photos.forEach(photo => { photo.hidden = button.dataset.filter !== 'all' && photo.dataset.month !== button.dataset.filter; });
  visiblePhotos = photos.filter(photo => !photo.hidden);
  document.querySelector('#count').textContent = `${visiblePhotos.length} recuerdos`;
}));
viewer.querySelector('.close').addEventListener('click', () => viewer.close());
viewer.querySelector('.previous').addEventListener('click', () => showPhoto(current - 1));
viewer.querySelector('.next').addEventListener('click', () => showPhoto(current + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
});
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus(); });
