const COMMENTS_LOADING_SIZE = 5;
let pictureCommentsList = [];
let isCommentsShown = 0;

const bigPicCommentList = document.querySelector('.social__comments');
const bigPicCommentCount = document.querySelector('.social__comment-count');
const bigPicCommentLoader = document.querySelector('.comments-loader');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = comment.avatar;
  avatarImg.alt = comment.name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderCommentsPortion = () => {
  const commentsToShow = pictureCommentsList.slice(isCommentsShown, isCommentsShown + COMMENTS_LOADING_SIZE);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    bigPicCommentList.appendChild(commentElement);
  });

  isCommentsShown += commentsToShow.length;
  bigPicCommentCount.innerHTML = `${isCommentsShown} из <span class="comments-count">${pictureCommentsList.length}</span> комментариев`;

  if (isCommentsShown >= pictureCommentsList.length) {
    bigPicCommentLoader.classList.add('hidden');
  } else {
    bigPicCommentLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

const initComments = (comments) => {
  pictureCommentsList = comments;
  isCommentsShown = 0;
  bigPicCommentList.innerHTML = '';
  if (comments.length > COMMENTS_LOADING_SIZE) {
    bigPicCommentLoader.classList.remove('hidden');
  } else {
    bigPicCommentLoader.classList.add('hidden');
  }

  renderCommentsPortion();
};

const resetComments = () => {
  pictureCommentsList = [];
  isCommentsShown = 0;
  bigPicCommentLoader.removeEventListener('click', onCommentsLoaderClick);
};

export { initComments, onCommentsLoaderClick, resetComments };
