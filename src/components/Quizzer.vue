<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuizStore } from '../stores/quizStore';

const quizStore = useQuizStore();

onMounted(() => {
  quizStore.fetchQuestions();
});
</script>

<template>
</template>
