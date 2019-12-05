import { Component } from './../core/component';
import { apiService } from './../services/api.service';
import { renderPost } from './../templetes/post.template';


export class FavoriteComponent extends Component {
    constructor(id, options) {
        super(id);
        this.loader = options.loader;
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const html = renderList(favorites);
        this.$el.insertAdjacentHTML('afterbegin', html);
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

function renderList(list = []) {
    if(list && list.length) {
        return `
            <ul class="js-list">
                ${list.map(i => `<li><a href="#" data-post-id="${i.id}" class="js-link">${i.name}</a></li>`).join(' ')}
            </ul>
        `
    }

    return `<p class="center"> Вы пока еще не добавили посты. </p>`;
}

async function linkClickHandler(event) {
    event.preventDefault(); 

    if(event.target.classList.contains('js-link')) {
        const $prevPost = document.querySelector('.js-item-post');        
        if($prevPost) {
            $prevPost.remove();
        }
        const $list = document.querySelector('.js-list'); 
        const postId = event.target.dataset.postId;        
        this.loader.show();
        const post = await apiService.fetchPostById(postId);
        this.loader.hide();
        $list.insertAdjacentHTML('beforebegin', renderPost(post, {withButton: false}));
    }
}