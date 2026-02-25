import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Question } from '../types'

export const useQuizStore = defineStore('quiz', () => {
  const questions = ref<Question>[]([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const fetchQuestions = async () => {
    isLoading.value = true
    errorMessage.value = null

    try {
      const response = await fetch('/api/questions')
      if (!response.ok) throw new Error('Failed to load')
      questions.value = await response.json()
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }
})
