<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">team t2</router-link>
    <router-link to="/teams">Back</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users', 'teams'],
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(route) {
      const teamid = route.params.teamid;
      const selectedTeam = this.teams.find((t) => t.id == teamid);
      const selectedMembers = [];
      for (const team of selectedTeam.members) {
        const selecteduser = this.users.find((u) => u.id == team);
        selectedMembers.push(selecteduser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },
  created() {
    this.loadTeamMembers(this.$route);
  },
  //authentication ini akan di panggil sebelum component ini di reuse kembali dengan data yang berbeda
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    console.log(
      'sesaat sebelum component teammembers di render dengan data yang berbeda'
    );
    next();
  },
  watch: {
    $route(newRoute) {
      this.loadTeamMembers(newRoute);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #11005c;
}

a:hover,
a:active {
  background-color: #220a8d;
}
</style>