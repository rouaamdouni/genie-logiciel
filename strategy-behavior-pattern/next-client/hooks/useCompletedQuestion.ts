// hooks/use-completed-question.ts
import { useEffect, useState } from "react"
import { QuestionType } from "@/types/question-strategy"
import { apiBaseUrl } from "@/utils/constants"
import { headers } from "next/headers"

type CompletedQuestion<T> = {
    studentResponse: T
    score: number
    createdAt: string
}

export function useCompletedQuestion<T>({
    pathId,
    quizId,
    questionId,
    questionType,
}: {
    pathId: string
    quizId: string
    questionId: string
    questionType: QuestionType
}) {
    const [completedQuestion, setCompletedQuestion] = useState<CompletedQuestion<T> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCompletedQuestion = async () => {
            try {
                const url = `${apiBaseUrl}/explore/paths/${pathId}/quizzes/${quizId}/completed_${questionType}_questions/${questionId}`
                const authHeader = headers().get("Authorization") ?? ""

                const response = await fetch(url, {
                    headers: {
                        Authorization: authHeader,
                    },
                })

                // Return null if not found (404) rather than throwing error
                if (response.status === 404) {
                    setCompletedQuestion(null)
                    setLoading(false)
                    return
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch completed ${questionType} question`)
                }

                const data = await response.json()
                setCompletedQuestion(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchCompletedQuestion()
    }, [pathId, quizId, questionId, questionType])

    return {
        completedQuestion, loading, error, refetch: () => {
            setLoading(true)
            setError(null)
            fetchCompletedQuestion()
        }
    }
}