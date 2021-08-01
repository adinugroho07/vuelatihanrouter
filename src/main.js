import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import App from './App.vue';

/*
di bawah ini adalah contoh untuk menggunakan vue route dan mendaftarkan routes2 yang ada. 
history -> adalah untuk memanage routing history di app ini. jadi ketik user click sesuatu yang mengarahkan ke halaman yang lain
dan ketika new page ini di insert kan ke dalam web history kemudian user melakukan back atau kembali ke halaman sebelum nya maka
router akan mengatahu page terakhir yang di kunjungi apa sehingga tidak terjadi error page not found.
routes -> adalah untuk mendaftarkan list dari route yang akan kita define. di dalam routes kita harus define per object dan di dalam
          object tersebut akan ada beberapa properti yang harus di define.
          1. path -> untuk menentukan url nya, ex -> '/test' maka jika di bukan http://localhost:8000/test akan terbuka halamannya
          2. component -> untuk men set component apa yang akan terbuka jika url tersebut di panggil.
*/

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/teams',
            component: TeamsList
        },
        {
            path: '/users',
            component: UsersList
        },
        {
            path: '/teams/:teamid',
            component: TeamMembers
        },
    ]
});
const app = createApp(App)
app.use(router);
app.mount('#app');
