import { useCallback, useState } from "react"
import { toast } from "react-toastify"

import Button from "@/components/common/button"
import SubQuizOptions from "@/features/student/path_dashboard/completed_quiz/completed_quiz_content/sub-quiz-option"
import useCompletedUniqueChoiceQuestion from "@/features/student/path_dashboard/completed_quiz/completed_unique_choice_question/use-completed-unique-choice-question"
import useUniqueChoiceQuestionDetails from "@/features/student/path_dashboard/completed_quiz/completed_unique_choice_question/use-unique-choice-question-details"
import validateUniqueChoiceQuestionAction from "@/features/student/path_dashboard/completed_quiz/completed_unique_choice_question/validate-unique-choice-question-action"
import CompletedQuiz from "@/models/interfaces/completed-quiz"
import SubQuizMetadata from "@/models/interfaces/sub-quiz-metadata"

type UniqueChoiceQuestionContentProps = {
  completedQuiz: CompletedQuiz
  subQuiz: SubQuizMetadata
}

export default function UniqueChoiceQuestionContent({
  completedQuiz,
  subQuiz,
}: UniqueChoiceQuestionContentProps) {
  const [selectedOption, setSelectedOption] = useState<number>(-1)
  const [localCompletedQuestion, setLocalCompletedQuestion] = useState<{
    studentResponse: number
  } | null>(null)

  const { uniqueChoiceQuestion } = useUniqueChoiceQuestionDetails({
    pathId: completedQuiz.pathId,
    questionId: subQuiz.questionId,
    quizId: completedQuiz.quizId,
  })

  const { completedUniqueChoiceQuestion } = useCompletedUniqueChoiceQuestion({
    pathId: completedQuiz.pathId,
    questionId: subQuiz.questionId,
    quizId: completedQuiz.quizId,
  })

  const isAnswered = !!(completedUniqueChoiceQuestion || localCompletedQuestion)

  const handleValidate = useCallback(async () => {
    if (selectedOption === -1) {
      toast.error("Please select an option before validating.", {
        position: "top-right",
      })
      return
    }

    const response = await validateUniqueChoiceQuestionAction({
      pathId: completedQuiz.pathId,
      questionId: subQuiz.questionId,
      quizId: completedQuiz.quizId,
      studentResponse: selectedOption,
    })

    if (!response.ok) {
      return toast.error(response.errors.message, { position: "top-right" })
    }
    setLocalCompletedQuestion({ studentResponse: selectedOption })

    toast.success("Sub quiz validated successfully", { position: "top-right" })
  }, [
    completedQuiz.pathId,
    completedQuiz.quizId,
    subQuiz.questionId,
    selectedOption,
  ])

  const handleOptionSelected = useCallback(
    (optionIndex: number) => {
      if (isAnswered) return
      setSelectedOption(optionIndex)
    },
    [isAnswered],
  )

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <div className="flex w-full flex-col space-y-5">
        <h2 className="text-xl font-bold leading-tight tracking-[0.01px] text-opus-white">
          {uniqueChoiceQuestion?.headline}
        </h2>

        <div className="flex w-full flex-col">
          <span className="mb-6 text-lg font-semibold text-opus-lightBlue">
            Options
          </span>
          {uniqueChoiceQuestion?.options.map((option, index) => {
            const isUserAnswer = isAnswered
              ? localCompletedQuestion?.studentResponse === index ||
                completedUniqueChoiceQuestion?.studentResponse === index
              : selectedOption === index
            const isTheBestAnswer = uniqueChoiceQuestion.idealOption === index

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
            validate Sub Quiz
          </span>
        </Button>
      )}
    </div>
  )
}
