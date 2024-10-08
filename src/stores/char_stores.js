import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharStore = defineStore(
  'character_select',
  () => {
    const selections = ref(
      Object.fromEntries(
        Array.from({ length: 6 }, (_, i) => [
          i + 1,
          {
            character: null,
            style: null,
            rank: null,
            flower: false,
            passiveSkill: [],
            earring: null,
            skill: [],
            img: null
          }
        ])
      )
    )

    const setSelection = (buttonKey, type, value) => {
      if (!selections.value[buttonKey]) {
        selections.value[buttonKey] = {
          character: null,
          style: null,
          rank: null,
          flower: false,
          passiveSkill: [],
          earring: null,
          skill: [],
          img: null
        }
      }
      selections.value[buttonKey][type] = value === undefined ? null : value
    }

    const getSelection = (buttonKey, type) => {
      return selections.value[buttonKey]?.[type] || null
    }

    return {
      selections,
      setSelection,
      getSelection
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
