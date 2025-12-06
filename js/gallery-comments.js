import { COMMENTS_LOADING_SIZE } from './constants.js';

let postCommentsList = [];
let isCommentsShown = 0;

const postViewerCommentList = document.querySelector('.social__comments');
const postViewerCommentCount = document.querySelector('.social__comment-count');
const postViewerCommentLoader = document.querySelector('.comments-loader');

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
  const commentsToShow = postCommentsList.slice(isCommentsShown, isCommentsShown + COMMENTS_LOADING_SIZE);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    postViewerCommentList.appendChild(commentElement);
  });

  isCommentsShown += commentsToShow.length;
  postViewerCommentCount.innerHTML = `${isCommentsShown} из <span class="comments-count">${postCommentsList.length}</span> комментариев`;

  if (isCommentsShown >= postCommentsList.length) {
    postViewerCommentLoader.classList.add('hidden');
  } else {
    postViewerCommentLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

const initComments = (comments) => {
  postCommentsList = comments;
  isCommentsShown = 0;
  postViewerCommentList.innerHTML = '';
  renderCommentsPortion();
};

const resetComments = () => {
  postCommentsList = [];
  isCommentsShown = 0;
  postViewerCommentLoader.removeEventListener('click', onCommentsLoaderClick);
};

export { initComments, onCommentsLoaderClick, resetComments };
