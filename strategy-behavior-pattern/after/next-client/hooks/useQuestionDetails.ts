// hooks/use-question-details.ts
import { useEffect, useState } from "react"
import { QuestionType } from "@/types/question-strategy"
import { apiBaseUrl } from "@/utils/constants"
import { headers } from "next/headers"

type QuestionDetails<T> = {
    headline: string
    options: string[]
    idealOptions?: T
}

export function useQuestionDetails<T>({
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
    const [question, setQuestion] = useState<QuestionDetails<T> | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const url = `${apiBaseUrl}/explore/paths/${pathId}/quizzes/${quizId}/${questionType}_questions/${questionId}`
                const authHeader = headers().get("Authorization") ?? ""

                const response = await fetch(url, {
                    headers: {
                        Authorization: authHeader,
                    },
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch ${questionType} question`)
                }

                const data = await response.json()
                setQuestion(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchQuestion()
    }, [pathId, quizId, questionId, questionType])

    return { question, loading, error }
}