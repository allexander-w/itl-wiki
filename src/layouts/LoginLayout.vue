<template>
  <div class="login-layout">
    <section class="main-header">
      <div class="container">
        <header class="login-header">
          <div class="l-header-logo">
            <img src="../assets/img/login/logo.png" alt="lamp" />
            <p class="l-header-logo-text">ITL Wiki</p>
          </div>
          <div class="l-login">
            <router-link to="/sign-in">
              <p class="l-login-value">Войти</p>
            </router-link>
          </div>
        </header>
        <div class="main-login-info">
            <h2 class="login-info-title">Вовлекайте сотрудников в процесс и создавайте культуру непрерывного обмена знаниями и опытом</h2>
            <p class="login-info-desc">Постоянное развитие достигается за счет правильного управления информацией и знаниями.</p>
            <button class="login-info-btn" @click='$router.push("/login")'>
                Создать бесплатно
            </button>
        </div>
      </div>
    </section>

    <section class="about-wiki">
        <div class="container">
            <h2 class="about-title">
                Что из себя представляет ITL Wiki 
            </h2>
            <p class="about-description">
                Альпийская складчатость непосредственно совершает закрытый аквапарк. Геологическое строение абсурдно выбирает очаг многовекового орошаемого земледелия. Южное полушарие, при том, что королевские полномочия находятся в руках исполнительной власти - кабинета министров, отталкивает крестьянский коралловый риф.
            </p>
            <div class="about-img-wiki">
            </div>

            <div class="about-cards-wrapper">
                <div class="card-item"
                    v-for = '(card, index) in aboutCards'
                    :key = 'index'
                >
                    <div class="about-card">
                    </div>
                    <p class="about-card-desc">
                        {{card.desc}}
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section class="get-started">
        <div class="container">
            <h3 class="gs-title">
                Начните пользоваться сервисом в несколько шагов
            </h3>
        </div>
    </section>
  </div>
</template>

<script>
export default {
    data(){
        return {
            aboutCards: [
                {desc: 'Создавайте активность и следите за активностью коллег', icon: ''},
                {desc: 'Создавайте контент сами и делитесь им с другими', icon: ''},
                {desc: 'Храните бибилиотеку полезных знаний в одном месте', icon: ''},
            ]
        }
    }
}
</script>

<style lang="scss">
.gs-title {
    max-width: 800px;
    font-size: 38px;
    font-weight: 300;
    line-height: 1.26;
    text-align: center;
    color: #0e65dd;
    margin: 125px auto;

}
.about-cards-wrapper {
    display: flex;
    width: 1100px;
    justify-content: space-between;
    margin: 0 auto;
}
.card-item {
    display: flex;
    align-items: center;
}
.about-card {
    margin-right: 30px;
    width: 100px;
    height: 100px;
    border-radius: 30px;
    box-shadow: 0 0 85px 0 rgba(10, 76, 166, 0.3);
    background-color: var(--white-two);
    &-desc{
        max-width: 200px;
    }
}
.about-description {
    max-width: 1000px;
    font-size: 19px;
    line-height: 1.58;
    text-align: center;
    color: #6b6b6b;
    margin: 0 auto;
    padding-top: 50px;
}
.about-title {
    padding-top: 130px;
    text-align: center;
    font-size: 38px;
    font-weight: 300;
    color: #383838;
}
.about-img-wiki {
    margin: 100px auto;
    background-color: rgb(226, 226, 226);
    width: 1100px;
    height: 700px;
    box-shadow: 0 1px 30px rgba(0,0,0, .5);
}
.login-info-btn {
    width: 190px;
    height: 50px;
    border-radius: 2px;
    background-color: #ffcf1a;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 80px;

    font-size: 14px;
    color: #383838;
    
}
.main-login-info {
    margin-top: 200px;
}
.login-info-title {
    width: 600px;
    font-size: 43px;
    font-weight: 300;
    line-height: 1.21;
    color: #fff;
    padding-bottom: 50px;
}
.login-info-desc {
    width: 600px;
    font-size: 20px;
    line-height: 1.5;
    color: #fff;
}
.l-login-value {
    color: #fff;

    &::before {
        content: 'icon';
        margin-right: 10px;
    }
}
.l-header-logo {
    display: flex;
    align-items: center;
    &-text {
        color: #fff;
    }
    img {
        margin-right: 20px;
    }
}
.login-header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.main-header {
    background:  url("../assets/img/login/bg.png"), linear-gradient(138deg, #0ea3fa -8%, #d606f2 114%);
    min-height: 1000px;
}
</style>