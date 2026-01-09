const galleryTemplate = document.querySelector('#picture').content.querySelector('.picture');
let galleries = [];

const galleryList = document.querySelector('.pictures');

export const getPictures = () => galleries;

export const renderPictures = (data) => {
  galleries = data;

  const existingPictures = galleryList.querySelectorAll('.picture:not(.img-upload__form .picture)');
  existingPictures.forEach((picture) => picture.remove());

  const pictureListFragment = document.createDocumentFragment();

  galleries.forEach(({url, description, likes, comments}, index) => {
    const pictureElement = galleryTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.index = index;
    pictureListFragment.append(pictureElement);
  });

  galleryList.append(pictureListFragment);
};
