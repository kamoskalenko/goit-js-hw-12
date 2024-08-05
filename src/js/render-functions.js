const gallery = document.querySelector('.gallery');

export default function renderImageCard(images) {
  const markup = images.hits
    .map(
      image => `
          <div class="image-card">
              <a href="${image.largeImageURL}" class="link">
                  <img src="${image.webformatURL}" alt="${image.tags}" width=640 height=360>
              </a>
              <div class="info">
                  <p><span>Likes</span> ${image.likes}</p>
                  <p><span>Views</span> ${image.views}</p>
                  <p><span>Comments</span> ${image.comments}</p>
                  <p><span>Downloads</span> ${image.downloads}</p>
              </div>
          </div>
      `
    )
    .join('');
  gallery.innerHTML = markup;
}
