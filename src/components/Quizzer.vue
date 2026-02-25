<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuizStore } from '../stores/quizStore';

const quizStore = useQuizStore();
const selectedTopic = ref('');

watch(selectedTopic, (newTopic) => {
  if (newTopic) {
    quizStore.fetchQuestions(newTopic);
  }
});
</script>

<template>
  <label for="topic">Select a topic:</label>
  <select id="topic" v-model="selectedTopic">
    <option value="">-- Please choose an option --</option>
    <option value="general">General Knowledge</option>
    <option value="math">Math</option>
    <option value="science">Science</option>
    <option value="history">History</option>
  </select>
</template>