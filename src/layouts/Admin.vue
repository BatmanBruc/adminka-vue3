<template>
  <a-layout>
    <a-drawer v-model:visible="collapsed"  placement="left" :headerStyle="{ display: 'none' }" :bodyStyle="{ padding: 0 }" width="auto" v-if="width < 576">
      <a-layout-sider :collapsedWidth="0" :style="{ height: '100%' }">
        <div class="logo"><img src="/umnoe_logos005.png" /><span class="title">{{ domain }}</span></div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="/orders" @click="toLink('/orders')">
            <appstore-outlined />
            <span>Заказы</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
    </a-drawer>
    <a-layout-sider v-else :collapsedWidth="0" v-model:collapsed="collapsed">
        <div class="logo"><img src="/umnoe_logos005.png" /><span class="title">{{ domain }}</span></div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="/orders" @click="toLink('/orders')">
            <appstore-outlined />
            <span>Заказы</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger icon-menu-collaps"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger icon-menu-collaps" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', }"
      >
        <slot/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { AppstoreOutlined , MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useWindowSize } from 'vue-window-size'
import { watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { domain } from '@/config';


const { width, height } = useWindowSize()
watch(width, ()=>{
  if(width.value < 576)
    collapsed.value = true
  else 
    collapsed.value = false
})
const router = useRouter()
const route = useRoute()
const currentUrl = ref([route.path])
const toLink = (url: any)=>{
  currentUrl.value = url
  router.push(url)
}
const collapsed = ref<boolean>(false)
const selectedKeys = currentUrl
</script>
<style>
.icon-menu-collaps {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
      display: initial;
}

.icon-menu-collaps:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
section.ant-layout.ant-layout-has-sider {
    height: 100%;
}
.logo{
  margin: 10px;
  border-radius: 5px;
  width: 180px;
}
.logo img{
  margin: 10px;
  width: 30px;
}
.logo .title{
  font-size: 12px;
  font-weight: bold;
  color: #009688;
}
  </style>