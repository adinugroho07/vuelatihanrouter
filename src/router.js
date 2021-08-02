import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamFooter from './components/teams/TeamFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

/*
di bawah ini adalah contoh untuk menggunakan vue route dan mendaftarkan routes2 yang ada. 
history -> adalah untuk memanage routing history di app ini. jadi ketik user click sesuatu yang mengarahkan ke halaman yang lain
dan ketika new page ini di insert kan ke dalam web history kemudian user melakukan back atau kembali ke halaman sebelum nya maka
router akan mengatahu page terakhir yang di kunjungi apa sehingga tidak terjadi error page not found.
routes -> adalah untuk mendaftarkan list dari route yang akan kita define. di dalam routes kita harus define per object dan di dalam
          object tersebut akan ada beberapa properti yang harus di define.
          1. path -> untuk menentukan url nya, ex -> '/test' maka jika di bukan http://localhost:8000/test akan terbuka halamannya
          2. component -> untuk men set component apa yang akan terbuka jika url tersebut di panggil.
          3. components -> untuk men set multiple components yang akan di render jika url tersebut di panggil. cara nya adalah
                           dengan menggunakan key dan value, jadi nanti di <router-view> di panggil nama key nya yang kemudian value
                           yang ada pada key tersebut akan di render juga beserta key value default nya.
          4. props -> untuk memparsing value parameter dengan props tidak dengan $route tapi nama props nya harus sama dengan nama
                      parameter yang ada di route nya. cth -> props: true. '/teams/:teamid' -> nama prop nya brarti props:['teamid']
          5. redirect -> untuk men redirect link ke link yang di tuju. ex -> redirect: '/alamat tujuan'
          6. alias -> untuk memberikan alias dari url jadi ketika alias tersebut di akses maka yang akan tampil adalah url dan 
                      component yang asli dari alias tersebut. ex -> alias: '/'
          7. name -> untuk membuat nama dari sebuah link. gunanya adalah untuk membuat url link menjadi dinamis, artinya jika kita
                     lakukan perubahan pada url email name yang di gunakan untuk berpindah halaman tidak perlu di ubah.
          8. meta -> untuk menambahkan meta data supaya bisa di panggil menggunakan $router atau $route . cara pemanggilannya adalah
                     seperti berikut , $route.meta.namametadatakita/$router.meta.namametadatakita . 
                     contoh pendefinisiin nya -> meta: { needsAuth: true },
*/

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/teams'
        },
        {
            /* 
            untuk menggunakan nested component seperti contoh yang di bawah ini maka pada component yang merender (TeamList)
            harus di tambahkan <router-view></router-view>.
            dan untuk nested ini bisa lebih dalam lagi, artinya di dalam childern tersebut bisa ada childern lagi.
            */
            name: 'teams',
            path: '/teams',
            //component: TeamsList,
            meta: { needsAuth: true },
            components: {
                default: TeamsList,
                footer: TeamFooter,
            },
            children: [
                {
                    name: 'team-member',
                    path: ':teamid',
                    component: TeamMembers
                },
            ]
        },
        {
            path: '/users',
            //component: UsersList,
            components: {
                default: UsersList,
                footer: UsersFooter,
            },
            //autentikasi ini di panggil sebelum url users ini di panggil.
            beforeEnter: (to, from, next) => {
                console.log(to, from);
                console.log('this is before entering users');
                next();
            }
        },
        {
            /*
            di bawah ini adalah untuk menangkap semua url yang di enter oleh user dan tidak ketemu atau notfound dengan karakter 
            apa pun dan akan di redirect ke url '/teams' atau di munculkan component notfound
            */
            path: '/:notFound(.*)',
            //redirect: '/teams'
            component: NotFound
        },
    ],
    /*
    di bawah ini adalah cara untuk membuat view scroll berada pada posisi atas, set nya adala pada left:0 , top: 0 , ini akan
    membuat ketika kita merender component posisi view nya akan berada pada posisi atas.
    */
    scrollBehavior(to, from, savedPosition) {
        console.log(to, from, savedPosition);
        if (savedPosition) {
            //ini berfungsi jika kita back maka kita akan berada pada posisi scroll sebelum nya.
            return savedPosition;
        }
        return { left: 0, top: 0 };
    }
});

/*
method beforeEach ini adalah fungsi guard yang di provide oleh vue untuk mengecek apakah user ini sudah di autentikasi belum dengan
cara kita bisa perika variable yang ada pada to (berisi url asal dan value param,dll) dan from (berisi url tujuan dan value param,dll).
jika kita next() maka artinya kita berikan akses, tapi jika kita next(false) maka kita tidak izin kan , atau kita juga bisa alihkan
ke url lain seperti ini next('/teams'). contoh seperti if di bawah.
*/
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    console.log(to, from);
    //contoh penggunaan dari meta data
    if (to.meta.needsAuth) {
        console.log('need to be autenticated');
        next();
    } else {
        next();
    }

    // if (to.name === 'team_member') {
    //     next();
    // } else {
    //     next({
    //         name: 'team_member', params: { teamid: 't2' }
    //     })
    // }
    next();
});
//autentikasi ini di jalankan setelah melewati proses validasi pada beforeEach,dll.
router.afterEach((to, from) => {
    // to and from are both route objects.
    // ini bisa di gunakan sebagai log user mengakses apa, dari url mana, kemana dan jam brapa.
    console.log(to, from);
    console.log('this is from afterEach setelah di validasi baru ke panggil');
});

export default router;