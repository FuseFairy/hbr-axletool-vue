import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore(
  'setting',
  () => {
    const calSP = ref(false)

    function setCalSP() {
      calSP.value = !calSP.value
    }

    return {
      calSP,
      setCalSP
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
