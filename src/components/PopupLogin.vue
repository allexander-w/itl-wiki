<template>
    <div class="popup-login">
        <p class='popup-message'>Что-то пошло не так, проверьте введенные данные!</p>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
    .popup-login {
        min-width: 180px;
        height: 70px;
        background-color: #0f5bc5;
        display: flex;
        align-items: center;
        border-radius: 5px;
        justify-content: center;
        position: absolute;
        top: 50px;
        right: 50px;
        transition: all ease .5s;
    }

    .popup-message {
        font-size: 18px;
        color: #fff;
        font-weight: 300;
        padding: 0 10px;
    }
</style>