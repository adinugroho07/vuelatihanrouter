<template>
  <button @click="confirminput()">Button</button>
  <button @click="confirmChange">Confirm Changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changeSaved: false,
    };
  },
  inject: ['users'],
  methods: {
    confirminput() {
      // untuk menambahkan route ke history dan berpindah halaman.
      this.$router.push('/teams');
    },
    confirmChange() {
      this.changeSaved = true;
    },
  },
  //authentication ini akan di panggil sebelum component ini di render
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    console.log('sesaat sebelum component userslist di render');
    next();
  },
  //authentication ini akan di panggil sebelum user leave dari component ini
  beforeRouteLeave(to, from, next) {
    /**
     ini bisa berguna untuk mencegah user dan memastikan user apakah memang benar2 ingin meninggalkan halaman tersebut, ataukah
     hanya karena ke pencet saja namun sebenarnya masih menggunakan halaman tersebut.
     */
    console.log(to, from);
    console.log('sesaat sebelum meninggalkan component userslist');
    if (this.changeSaved) {
      next();
    } else {
      const change = confirm('Are You Sure ?? You Got Unsave Changes');
      next(change);
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>