import {HeaderComponent} from './components/header.component';
import {NavigationComponent} from './components/navigation.component';
import { FavoriteComponent } from './components/favorite.component';
import { PostsComponent } from './components/posts.component';
import { CreateComponent } from './components/create.component';
import { LoaderComponent } from './components/loader.component';

const header = new HeaderComponent('header');
const loader = new LoaderComponent('loader');
const navigation = new NavigationComponent('navigation');

const favorite = new FavoriteComponent('favorite', {loader: loader});
const posts = new PostsComponent('posts', {loader: loader});
const create = new CreateComponent('create');

navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'favorite', component: favorite},
    {name: 'posts', component: posts}
])