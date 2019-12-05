import { Component } from './../core/component';
import { apiService } from './../services/api.service';
import { TransformService } from './../services/transform.service';
import { renderPost } from './../templetes/post.template';




export class PostsComponent extends Component {
    constructor(id, {loader: loader}) {
        super(id);
        this.loader = loader;       
    }

    init() {      
      this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    onHide() {
        this.$el.innerHTML = '';
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        const posts = TransformService.fbObjectToArray(fbData);        
        const html = posts.map(post => renderPost(post, {withButton: true}));
        this.loader.hide();

        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));

    };
}

function buttonHandler(event) {
  const $el = event.target;
  const id = $el.dataset.id;
  const postName = $el.dataset.postTitle;

  if(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
   
    if(favorites.some(item => item.id === id)) {
      $el.textContent = 'Сохранить';
      $el.classList.remove('button-danger');
      favorites = favorites.filter(fId => fId.id !== id)
    } else {
      $el.textContent = 'Удалить';
      $el.classList.add('button-danger');
      favorites.push(
       {
         'id': id,
         'name': postName
       }
      );
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
  }
  
}