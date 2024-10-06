<script setup>
import Toggle from '@vueform/toggle'
import { useSettingStore } from '@/stores/setting_stores';
import { useSliderStore } from '@/stores/slider_stores';

const settingStore = useSettingStore()
const sliderStore = useSliderStore()

const emit = defineEmits(['close'])
const closeTable = () => {
  emit('close')
}
</script>

<template>
  <div @click="closeTable" class="overlay">
    <div @click.stop class="container">
      <div class="button-group">
          <button @click="closeTable" class="close">
            <img src="@/assets/custom_icon/close.svg" alt="Close" />
          </button>
      </div>
      <div class="table scrollbar-style-1">
        <div class="option">
          <label>SP自動計算</label>
          <Toggle
            :disabled="sliderStore.rows > 0"
            id="calculate-sp-toggle"
            v-model="settingStore.calSP"
            on-label="On"
            off-label="Off"
            @onclick="settingStore.setCalSP"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1100;
  backdrop-filter: blur(5px);
}
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(19, 18, 18);
  height: auto;
  width: 15%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.button-group {
  display: flex;
  justify-content: right;
  align-items: center;
}
.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
}
.close {
  background-color: transparent;
  padding: 1px;
  border: none;
  box-sizing: border-box;
  height: 32px;
  width: 32px;
  cursor: pointer;
}
.close img {
  height: 100%;
  width: 100%;
}
.table {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 0 1rem 0 0;
}
.scrollbar-style-1 {
  overflow-x: auto;
}
.scrollbar-style-1::-webkit-scrollbar {
  width: 5px;
  height: 0;
}
.scrollbar-style-1::-webkit-scrollbar-track,
.scrollbar-style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.scrollbar-style-1::-webkit-scrollbar-thumb {
  background-color: #555;
}
:deep(.toggle-container:focus) {
  box-shadow: none;
}
:deep(.toggle-on-disabled) {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
  opacity: 0.8;
}
@media (max-width: 800px) {
  .container {
    width: 60%;
  }
}
</style>