<template>
  <the-navigation></the-navigation>
  <main>
    <!-- <component :is="activePage"></component> -->
    <!-- 
    router-view di bawah adalah untuk menampilkan halaman yang sudah kita define pada vue router di main.js 
    dan route-view ini seperti <component> bisa berganti2 sesui url yang di akses.
    -->
    <router-view></router-view>
  </main>
  <footer>
    <!-- 
    pada attriubute name ini adalah contoh dari implementasi penggunaan dari multiple component pada 1 url. jadi
    component yang akan di render adalah component dengan key footer dan default, bisa di lihat pada main.js.  
     -->
    <router-view name="footer"></router-view>
  </footer>
</template>

<script>
// import TeamsList from './components/teams/TeamsList.vue';
// import UsersList from './components/users/UsersList.vue';
import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    TheNavigation,
  },
  data() {
    return {
      activePage: 'teams-list',
      teams: [
        { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
        { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
        { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
      ],
      users: [
        { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
        { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
        { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
        { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
        { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' },
      ],
    };
  },
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>