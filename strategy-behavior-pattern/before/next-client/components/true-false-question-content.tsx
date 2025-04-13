import { useCallback, useState } from "react"
import { toast } from "react-toastify"

import Button from "@/components/common/button"
import SubQuizOptions from "@/features/student/path_dashboard/completed_quiz/completed_quiz_content/sub-quiz-option"
import useCompletedTrueFalseQuestion from "@/features/student/path_dashboard/completed_quiz/completed_true_false_question/use-completed-true-false-question"
import useTrueFalseQuestionDetails from "@/features/student/path_dashboard/completed_quiz/completed_true_false_question/use-true-false-question-details"
import validateTrueFalseQuestionAction from "@/features/student/path_dashboard/completed_quiz/completed_true_false_question/validate-true-false-question-action"
import CompletedQuiz from "@/models/interfaces/completed-quiz"
import SubQuizMetadata from "@/models/interfaces/sub-quiz-metadata"

type TrueFalseQuestionContentProps = {
  completedQuiz: CompletedQuiz
  subQuiz: SubQuizMetadata
}

export default function TrueFalseQuestionContent({
  completedQuiz,
  subQuiz,
}: TrueFalseQuestionContentProps) {
  const [selectedOption, setSelectedOption] = useState<boolean>()
  const [localCompletedQuestion, setLocalCompletedQuestion] = useState<{
    studentResponse: boolean
  } | null>(null)

  const { trueFalseQuestion } = useTrueFalseQuestionDetails({
    pathId: completedQuiz.pathId,
    questionId: subQuiz.questionId,
    quizId: completedQuiz.quizId,
  })

  const { completedTrueFalseQuestion } = useCompletedTrueFalseQuestion({
    pathId: completedQuiz.pathId,
    questionId: subQuiz.questionId,
    quizId: completedQuiz.quizId,
  })

  const isAnswered = !!(completedTrueFalseQuestion || localCompletedQuestion)

  const handleValidate = useCallback(async () => {
    if (selectedOption === undefined) {
      toast.error("Please select an option before validating.", {
        position: "top-right",
      })
      return
    }

    const response = await validateTrueFalseQuestionAction({
      pathId: completedQuiz.pathId,
      questionId: subQuiz.questionId,
      quizId: completedQuiz.quizId,
      studentResponse: selectedOption,
    })

    if (!response.ok) {
      toast.error(response.errors.message, { position: "top-right" })
      return
    }

    // Update local state for instant rendering
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
      setSelectedOption(optionIndex === 0)
    },
    [isAnswered],
  )

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <div className="flex w-full flex-col space-y-5">
        <h2 className="text-xl font-bold leading-tight tracking-[0.01px] text-opus-white">
          {trueFalseQuestion?.headline}
        </h2>

        <div className="flex flex-col">
          <span className="mb-6 text-lg font-semibold text-opus-lightBlue">
            Options
          </span>
          {[true, false].map((option, index) => {
            const isUserAnswer = isAnswered
              ? localCompletedQuestion?.studentResponse === option ||
                completedTrueFalseQuestion?.studentResponse === option
              : selectedOption === option
            const isTheBestAnswer = trueFalseQuestion?.idealOption === option

            return (
              <SubQuizOptions
                clickHandler={handleOptionSelected}
                content={`${option}`}
                isAnswered={isAnswered}
                isTheBestAnswer={isTheBestAnswer}
                isUserAnswer={isUserAnswer}
                key={`${option}`}
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
