export function renderPost(post, options = {}) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const tag = post.type === 'news'
    ? '<li class="tag tag-blue tag-rounded">Новость</li>'
    : '<li class="tag tag-rounded tag-rounded">Заметка</li>';

    const button = (favorites.some(item => item.id === post.id))
    ? `<button class="button-round button-small button-primary button-danger btn-active" 
    data-id="${post.id}" data-post-title="${post.title}"> Удалить </button>`
    : `<button class="button-round button-small button-primary  btn-active" 
    data-id="${post.id}" data-post-title="${post.title}"> Сохранить </button>`;

    return `
    <div class="panel js-item-post">
    <div class="panel-head">
      <p class="panel-title">${post.title}</p>
      <ul class="tags">
        ${tag}
      </ul>
    </div>
    <div class="panel-body">
      <p class="multi-line">${post.fulltext}</p>
    </div>
    <div class="panel-footer w-panel-footer">
      <small>${post.data}</small>
      ${options.withButton ? button : ''}
    </div>
    </div>`
}