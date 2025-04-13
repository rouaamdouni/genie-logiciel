import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

import Button from "@/components/common/button"
import useCompletedMultipleChoiceQuestion from "@/features/student/path_dashboard/completed_quiz/completed_multiple_choice_question/use-completed-multiple-choice-question"
import useMultipleChoiceQuestionDetails from "@/features/student/path_dashboard/completed_quiz/completed_multiple_choice_question/use-multiple-choice-question-details"
import validateMultipleChoiceQuestionAction from "@/features/student/path_dashboard/completed_quiz/completed_multiple_choice_question/validate-multiple-choice-question-action"
import SubQuizOptions from "@/features/student/path_dashboard/completed_quiz/completed_quiz_content/sub-quiz-option"
import CompletedQuiz from "@/models/interfaces/completed-quiz"
import SubQuizMetadata from "@/models/interfaces/sub-quiz-metadata"

type MultipleChoiceQuestionContentProps = {
  completedQuiz: CompletedQuiz
  subQuiz: SubQuizMetadata
}

export default function MultipleChoiceQuestionContent({
  completedQuiz,
  subQuiz,
}: MultipleChoiceQuestionContentProps) {
  const [selectedOptions, setSelectedOptions] = useState<Array<number>>([])
  const [localCompletedQuestion, setLocalCompletedQuestion] = useState<{
    studentResponse: number[]
  } | null>(null)

  const { multipleChoiceQuestion } = useMultipleChoiceQuestionDetails({
    pathId: completedQuiz.pathId,
    questionId: subQuiz.questionId,
    quizId: completedQuiz.quizId,
  })

  const { completedMultipleChoiceQuestion } =
    useCompletedMultipleChoiceQuestion({
      pathId: completedQuiz.pathId,
      questionId: subQuiz.questionId,
      quizId: completedQuiz.quizId,
    })

  const isAnswered = !!(
    completedMultipleChoiceQuestion || localCompletedQuestion
  )

  useEffect(() => {
    if (isAnswered && completedMultipleChoiceQuestion?.studentResponse) {
      setSelectedOptions(completedMultipleChoiceQuestion.studentResponse)
    }
  }, [isAnswered, completedMultipleChoiceQuestion])

  const handleOptionSelected = useCallback(
    (optionIndex: number) => {
      if (isAnswered) return

      setSelectedOptions((prev) =>
        prev.includes(optionIndex)
          ? prev.filter((current) => current !== optionIndex)
          : [...prev, optionIndex],
      )
    },
    [isAnswered],
  )

  const handleValidate = useCallback(async () => {
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one option before validating.", {
        position: "top-right",
      })
      return
    }

    const response = await validateMultipleChoiceQuestionAction({
      pathId: completedQuiz.pathId,
      questionId: subQuiz.questionId,
      quizId: completedQuiz.quizId,
      studentResponse: selectedOptions,
    })

    if (!response.ok) {
      return toast.error(response.errors.message, { position: "top-right" })
    }

    setLocalCompletedQuestion({
      studentResponse: selectedOptions,
    })

    toast.success("Sub quiz validated successfully", { position: "top-right" })
  }, [
    completedQuiz.pathId,
    completedQuiz.quizId,
    subQuiz.questionId,
    selectedOptions,
  ])

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <div className="flex w-full flex-col space-y-5">
        <h2 className="text-xl font-bold leading-tight tracking-[0.01px] text-opus-white">
          {multipleChoiceQuestion?.headline ?? "Untitled Question"}
        </h2>

        <div className="flex w-full flex-col">
          <span className="mb-6 text-lg font-semibold text-opus-lightBlue">
            Options
          </span>
          {multipleChoiceQuestion?.options.map((option, index) => {
            const isUserAnswer = isAnswered
              ? (completedMultipleChoiceQuestion?.studentResponse?.includes(
                  index,
                ) ?? false)
              : selectedOptions.includes(index)

            const isTheBestAnswer = isAnswered
              ? (multipleChoiceQuestion?.idealOptions?.includes(index) ?? false)
              : false

            return (
              <SubQuizOptions
                clickHandler={handleOptionSelected}
                content={option}
                isAnswered={isAnswered}
                isTheBestAnswer={isTheBestAnswer}
                isUserAnswer={isUserAnswer}
                key={option}
                optionIndex={index}
              />
            )
          })}
        </div>
      </div>

      {!isAnswered && (
        <Button
          className="bg-opus-purple"
          onClick={handleValidate}
          type="button"
        >
          <span className="text-sm font-bold capitalize tracking-wider text-opus-white">
            Validate Response
          </span>
        </Button>
      )}
    </div>
  )
}
