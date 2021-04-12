<template>
  <v-app>
    <v-container>
      <search-bar />
      <movie-list />
      <!-- 검색바 -->
      <!-- 영화 목록 -->
    </v-container>
  </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import MovieList from '@/components/MovieList'
export default {
  components:{
    SearchBar,
    MovieList
  }
};
</script>
