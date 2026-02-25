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

  <div v-if="quizStore.isLoading">Loading...</div>

  <div v-else-if="quizStore.errorMessage">
    {{ quizStore.errorMessage }}
  </div>

  <ul v-else-if="quizStore.questions.length">
    <li v-for="q in quizStore.questions" :key="q.question">
      <p>{{ q.question }}</p>
      <p><strong>Answer:</strong> {{ q.answer }}</p>
    </li>
  </ul>
</template>