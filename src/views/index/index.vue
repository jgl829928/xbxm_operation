<template>
    <div v-if="role">
        <marketIndex/>
    </div>
     <div v-else>
        <headerIndex/>
    </div>
</template>

<script>
import headerIndex from "./headerIndex.vue";
import marketIndex from "./marketIndex.vue";
export default {
  data() {
    return {
        role:false,
    };
  },
  components: { headerIndex, marketIndex },
  methods: {
    judegRole() {
      if (this.currentUser.affiliation === 2) {
        this.marketCode = this.currentUser.marketCode;
        this.role = true;
      } else {
        this.role = false;
      }
    }
  },
  created() {
    this.judegRole();
  },
  computed: {
    currentUser: function() {
      return this.$store.state.currentUser;
    }
  }
};
</script>
