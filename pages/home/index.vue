<template>
  <div class="home-page">
    <div class="banner">  
      <div class="container">    
        <h1 class="logo-font">conduit</h1>      
        <p>A place to share your knowledge.</p>    
      </div>
    </div>
    <div class="container page">    
      <div class="row">
        <div class="col-md-9">    
          <div class="feed-toggle">          
            <ul class="nav nav-pills outline-active">  
              <li class="nav-item" v-if="user">          
                <nuxt-link class="nav-link" :class="{active: tab === 'your_feed'}"
                  :to="{name:'home',query:{tab:'your_feed'}}" exact>Your
                  Feed</nuxt-link>
              </li>            
              <li class="nav-item">  
                <nuxt-link class="nav-link" :class="{active: tab === 'global_feed'}"
                  :to="{name:'home',query:{tab:'global_feed'}}" exact>Global Feed</nuxt-link>  
              </li>  
              <li class="nav-item" v-if="tag">  
                <nuxt-link class="nav-link" :class="{active: tab === 'tag'}"
                  :to="{name:'home',query:{tab:'tag',tag:tag}}" exact>#{{tag}}</nuxt-link>  
              </li>         
            </ul>        
          </div>
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">    
              <nuxt-link class="author" :to="`/profile/${article.author.username}`">      
                <img :src="article.author.image" />
              </nuxt-link>    
              <div class="info">      
                <nuxt-link class="author" :to="`/profile/${article.author.username}`">      
                  {{ article.author.username }}      
                </nuxt-link>      
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>    
              </div>    
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }" @click="onFavorite(article)" :disabled="article.favoritedDisabled">
                <i class="ion-heart"></i>{{ article.favoritesCount }}    
              </button>  
            </div>  
            <nuxt-link :to="{ name:'article', params:{ slug:article.slug }}" class="preview-link">
              <h1>{{ article.title }}</h1>    
              <p>{{ article.description }}</p>    
              <span @click="$router.push({ name:'article', params:{ slug: article.slug } })">Read
                more...</span>  
            </nuxt-link>
          </div>
          <div v-if="!articles.length" class="article-preview"> No articles are here... yet. </div>
          <nav>  
            <ul class="pagination">    
              <li class="page-item" :class="{ active: item === page }" v-for="item in totalPage"
                 :key="item">
                <nuxt-link class="page-link"
                  :to="{ name:'home', query:{ page: item ,tag: $route.query.tag ,tab:tab } }">
                  {{ item }}</nuxt-link>
              </li>  
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">  
              <nuxt-link :to="{ name:'home',query:{ tab:'tag',tag:item } }"
                class="tag-pill tag-default" v-for="item in tags.slice(0,19)" :key="item">{{item}}
              </nuxt-link>    
            </div>        
          </div>      
        </div>
      </div>  
    </div>
  </div>
</template>
<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '../../api/article.js'
import { getTags } from '../../api/tag'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const { tag } = query
    const tab = query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit, // 每页大小
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTags(),
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    articles.forEach(element => element.favoritedDisabled = false);
    return {
      limit,
      page,
      articlesCount,
      articles,
      tags,
      tag,
      tab: query.tab || 'global_feed'
    }
  },
  watchQuery: ['page', 'tag', 'tab'],//响应 query 参数的变化
  computed: {
    totalPage () { return Math.ceil(this.articlesCount / this.limit) },
    ...mapState(['user'])
  },
  methods: {
    async onFavorite (article) {
      article.favoritedDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoritedDisabled = false
    },
  }
}
</script>