import ErrorMessage from "@/app/components/ErrorMessage";
import { ErrorData } from "@/app/hooks/auth/useCreateUser";

interface Props {
  error: Error | null;
  errorData: ErrorData | null;
}
const SignupError = ({ error, errorData }: Props) => {
  if (errorData) {
    return (
      <div>
        {Object.values(errorData).map(
          (errorValue, index) =>
            Array.isArray(errorValue) && (
              <ul className="mb-5" key={index}>
                {errorValue.map((errorMessage, innerIndex) => (
                  <ErrorMessage>
                    <li key={innerIndex}>{errorMessage}</li>
                  </ErrorMessage>
                ))}
              </ul>
            ),
        )}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage>An unexpected error occurred.</ErrorMessage>;
  }
};

export default SignupError;
