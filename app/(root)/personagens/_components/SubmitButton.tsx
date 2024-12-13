import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const SubmitButton = ({
  isLoading,
  title,
  submitting,
}: {
  isLoading: boolean
  title: string
  submitting: string
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        type="submit"
        className="text-[16px] font-semibold text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            &nbsp; {submitting}
          </>
        ) : (
          <span>{title}</span>
        )}
      </Button>
    </div>
  )
}

export default SubmitButton
