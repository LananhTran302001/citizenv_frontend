<template>
    <nav id="navbar" class="navbar flex-row navbar-style justify-content-around navbar-expand-md">
        <a href="" class="logo nav">
            <img src="../assets/img/logo.png" alt="logo" class="logo-img">
            <label class="logo-text">CitizenV</label>
        </a>
        <ul class="nav flex-row nav-pills justify-content-around">
            <li class="nav-item"><a href="" class="nav-link">Trang chủ</a></li>
            <li class="nav-item"><a href="" class="nav-link">Giới thiệu</a></li>
            <li class="nav-item"><a href="" class="nav-link">Liên hệ</a></li>
        </ul>
        <div class="nav flex-row justify-content-around" id="user-nav">
            <div class="nav flex-row justify-content-center">
                <label class="nav">Xin chào,</label>
                <label class="nav" id="user-name-label"> 19020209 </label>
            </div>
            <button class="nav" id="log-out-btn">Đăng xuất</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style scope>
#navbar {
    z-index: 100;
    background-color: white;
}
.navbar-style {
    justify-content: space-around;
    padding: 10px 50px 10px 20px;
}
#navbar a {
    text-decoration: none;
}
#navbar .logo {
    display: flex;
    flex-direction: row;
}
#navbar .logo-img {
    height: 40px;
    padding: 0;
    margin: 0 5px 0 0;
}
#navbar .logo-text {
    font-size: 28px;
    margin: 0;
    padding: 0;
    font-weight: 700;
    letter-spacing: 2px;
    color: green;
    text-decoration: none;
}
#navbar .nav-link {
    font-size: 18px;
    color: #413e66;
    font-weight: 500;
}
#navbar label {
    font-size: 18px;
    color: black;
    text-align: center;
    align-items: center;
}
#navbar #log-out-btn {
    padding: 5px 10px 5px 10px;
    margin-left: 15px;
    margin-right: 15px;
    background-color: transparent;
    border: solid 1px gainsboro;
    border-radius: 10px;
    color: mediumorchid;
}
@media (max-width: 800px) {
    #navbar .logo-img {
        height: 25px;
        padding: 0;
        margin: 0 5px 0 0;
    }
    
    #navbar .logo-text {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1px;
    }
    
    #navbar .nav-link {
        font-size: 12px;
        color: #413e66;
        font-weight: 500;
    }
    
    #navbar label {
        font-size: 12px;
        color: black;
        text-align: center;
        align-items: center;
    }
}
</style>