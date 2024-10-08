<template>
  <button @click="triggerFileInput" class="upload-button">
    <img src="@/assets/custom_icon/upload.svg" alt="upload" />
  </button>
  <input
    type="file"
    ref="fileInput"
    @change="onFileChange"
    accept=".jpg,.jpeg"
    style="display: none"
  />
</template>

<script setup>
import { ref } from 'vue'
import piexif from 'piexifjs'
import { useCharStore } from '@/stores/char_stores'
import { useSkillStore } from '@/stores/skill_stores'
import { useSliderStore } from '@/stores/slider_stores'

const charStore = useCharStore()
const skillStore = useSkillStore()
const sliderStore = useSliderStore()

const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = async (event) => {
  const file = event.target.files[0]
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const jpegDataUrl = e.target.result

        const exifObj = piexif.load(jpegDataUrl)

        const customData = exifObj['Exif'][piexif.ExifIFD.UserComment] || ''

        if (customData) {
          const decodedBase64 = atob(customData)
          const jsonString = decodeURIComponent(decodedBase64)
          const decodedData = JSON.parse(jsonString)

          charStore.selections = decodedData.char
          skillStore.skills = decodedData.skills
          skillStore.turns = decodedData.turns
          sliderStore.rows = decodedData.rows
        } else {
          console.error('Custom metadata not found')
          alert('Custom metadata not found. Please check the file.')
        }
      } catch (error) {
        console.error('Error reading image or parsing parameters:', error)
        alert(
          'The uploaded JPEG file format is incorrect or parameter parsing failed. Please check if the file is corrupted or if the parameter format is correct.'
        )
      } finally {
        event.target.value = ''
      }
    }

    reader.readAsDataURL(file)
  } else {
    alert('Please upload a JPEG formatted image!')
  }
}
</script>

<style scoped>
.upload-button {
  background-color: transparent;
  padding: 1px;
  border: none;
  box-sizing: border-box;
  height: 32px;
  width: 32px;
  cursor: pointer;
  border-radius: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-button:hover {
  background-color: rgba(78, 69, 69, 0.3);
}
</style>
