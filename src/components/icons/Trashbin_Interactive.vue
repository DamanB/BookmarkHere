<template>
<div class="trash-container default" :class="{ dark: theme==='dark', light: theme==='light'}" v-on:click="clicked" >
    <div class="trash-handle"></div>
    <div class="trash-lid"></div>
    <div class="trash-spacer"></div>
    <div class="trash-box">
        <div class="trash-line"></div>
        <div class="trash-line"></div>
        <div class="trash-line"></div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['theme'], 
    setup(props, context)
    {
        const clicked = () => {
            context.emit('clicked');
        }
        return {clicked}
    }
};
</script>

<style scoped>
.default{
    --trashColor1: rgb(50, 69, 248);
    --trashColor2: rgb(255, 255, 255);
}
.light {
    --trashColor1: white;
    --trashColor2: black;
}

.dark {
    --trashColor1: black;
    --trashColor2: white;
}

.trash-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
}
.trash-container:hover .trash-spacer{
    height: 10%;
}
.trash-handle{
    background-color: var(--trashColor1);
    width: 25%;
    height: 10%;
    border-radius: 40% 40% 0 0;
}
.trash-lid{
    background-color: var(--trashColor1);
    width: 100%;
    height: 12%;
    border-radius: 15%;
}
.trash-spacer{
    width: 100%;
    height: 1%;
}
.trash-box{
    background-color: var(--trashColor1);
    width: 80%;
    height: 65%;
    border-radius: 0 0 10% 10%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.trash-line{
    background-color: var(--trashColor2);
    width: 1px;
    min-height: 70%;
}


</style>