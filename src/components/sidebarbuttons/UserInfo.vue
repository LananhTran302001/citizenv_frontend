<template>
    <div class="user-info">
        <h4>{{username}}</h4>
        <h5>{{userid}}</h5>
    </div>
</template>

<script>
export default {
    name: "SidebarUserInfo",
    props: {username: String, userid:String},
}
</script>

<style scoped>
.user-info {
  display: block;
  color: white;
  text-decoration: none;
  padding: 50px 15px 30px 30px;
}
.user-info:hover {
  text-decoration: none;
  outline: none;
  margin-left: 20px;
}


</style>