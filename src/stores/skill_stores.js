import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSkillStore = defineStore('skill', () => {
	const skills = ref([]);
	const turns =ref([]);

	function adjustSkills(rows) {
		const difference = rows - skills.value.length;
	
		if (difference > 0) {
			const newSkills = Array.from({ length: difference }, () => [
				{ style: null, style_img: null, skill: null, target: null },
				{ style: null, style_img: null, skill: null, target: null },
				{ style: null, style_img: null, skill: null, target: null }
			]);
			skills.value.push(...newSkills);
	
			const newTurns = Array.from({ length: difference }, () => (
				{ turn: null, od: null }
			));
			turns.value.push(...newTurns);
		} 
		else if (difference < 0) {
			skills.value.splice(rows);
			turns.value.splice(rows);
		}
	}	

	return {
		skills,
		turns,
		adjustSkills
	}}, {
	  persist: true,
	}
);
