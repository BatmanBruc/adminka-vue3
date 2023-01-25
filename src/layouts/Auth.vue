<template>
    <div>
        <div :style="{'text-align': 'center'}">Beta</div>
        <a-row>
            <a-col class="block-auth" >
                <slot/>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
export default {
  name: 'Auth'
}
</script>

<style>
.block-auth {
    margin: auto;
    margin-top: 30vh;
    border-radius: 7px;
    color: #000000d9;
}
</style>
