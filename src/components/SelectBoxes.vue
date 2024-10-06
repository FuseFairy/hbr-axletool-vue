<script setup>
import { ref } from 'vue'
import { useCharStore } from '@/stores/char_stores'
import { useSettingStore } from '@/stores/setting_stores'
import { useSliderStore } from '@/stores/slider_stores'
import SelectChar from '@/components/SelectChar.vue'
import { getAssetsFile } from '@/api/util'

const charStore = useCharStore()
const settingStore = useSettingStore()
const sliderStore = useSliderStore()

const buttons = ref([
  { key: 1, label: 'Button 1' },
  { key: 2, label: 'Button 2' },
  { key: 3, label: 'Button 3' },
  { key: 4, label: 'Button 4' },
  { key: 5, label: 'Button 5' },
  { key: 6, label: 'Button 6' }
])

const activeComponent = ref(null)
const handleBoxClick = (key) => {
  activeComponent.value = key
}

const closeContainer = () => {
  activeComponent.value = null
}

function updateFightInitSp(key, value) {
  if (value === '' || value === null || value === undefined) {
    charStore.setSelection(key, 'fightInitSp', 0);
  } else {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      charStore.setSelection(key, 'fightInitSp', numericValue);
    } else {
      charStore.setSelection(key, 'fightInitSp', 0);
    }
  }
}
</script>

<template>
  <div class="container">
    <div v-for="button in buttons" class="button-container">
      <button
        :key="button.key"
        @click="handleBoxClick(button.key)"
        :class="{
          'circle-button selected-button': charStore.selections[button.key].img !== null,
          'circle-button add-button': charStore.selections[button.key].img === null
        }"
      >
        <img
          v-if="charStore.selections[button.key].img !== null"
          class="char-img"
          :src="getAssetsFile(charStore.selections[button.key].img)"
          :alt="charStore.selections[button.key].style"
        />
        <img v-else class="icon-img" src="@/assets/custom_icon/add.svg" alt="Add" />
      </button>

      <span v-if="settingStore.calSP" class="input-group">
        <label class="input-label">戰鬥開始SP</label>
        <input
          :id="'fightInit_' + button.key"
          :disabled="sliderStore.rows > 0"
          v-model="charStore.selections[button.key].fightInitSp"
          class="input-style"
          type="number"
          @change="updateFightInitSp(button.key, $event.target.value)" />
      </span>
    </div>
  </div>
  <SelectChar
    v-if="activeComponent !== null"
    :buttonKey="activeComponent"
    @close="closeContainer"
  />
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input-label {
  font-size: 100%;
  color: #a09b9b;
}
.input-style {
  padding: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  outline: none;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  gap: 1rem;
}
.button-container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.circle-button {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  aspect-ratio: 1 / 1;
  font-size: 16px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(79, 74, 74, 0.5);
}
.selected-button {
  border: none;
  transition: transform 0.3s ease;
  box-shadow: 0 0 10px rgba(188, 115, 194, 0.8);
}
.selected-button:hover {
  box-shadow: 0 0 15px rgba(188, 115, 194, 0.8);
}
.selected-button:hover .char-img {
  transform: scale(1.1);
}
.char-img {
  transition: transform 0.3s ease;
  width: 100%;
  height: 100%;
}
.add-button {
  border: none;
  transition: background-color 0.3s ease;
}
.add-button:hover {
  background-color: rgba(204, 201, 201, 0.5);
}
.add-button:hover .icon-img {
  filter: invert(1);
}
.icon-img {
  width: 50px;
  height: 50px;
}
@media (max-width: 800px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
  .circle-button {
    width: 100px;
    height: 100px;
    font-size: 14px;
  }
}
@media (max-width: 390px) {
  .circle-button {
    width: 80px;
    height: 80px;
    font-size: 12px;
  }
}
</style>
