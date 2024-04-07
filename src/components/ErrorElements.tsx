import {
  ErrorResponse,
  useRouteError,
  Link,
  isRouteErrorResponse,
} from "react-router-dom";
import "../styles/ErrorElement.scss";
import { useLocation } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError() as ErrorResponse | Error;

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-element">
        <ErrorBody errorCode={error.status} errorText="Resource not found" />
      </div>
    );
  }

  return (
    <div className="error-element">
      {error instanceof Response ? (
        <ErrorBody errorCode={error.status} errorText={error.statusText} />
      ) : (
        <ErrorBody errorCode={500} errorText="Something went wrong" />
      )}
    </div>
  );
}

type ErrorBodyProps = {
  errorCode: number;
  errorText: string;
};

function ErrorBody({ errorCode, errorText }: ErrorBodyProps) {
  return (
    <>
      <div className="error-header">
        <h1>Error</h1>
        <h2>{errorCode}</h2>
      </div>
      <p>{errorText}</p>
      <ErrorButton />
    </>
  );
}

function ErrorButton() {
  const { pathname } = useLocation();

  return pathname === "/" ? (
    <button
      onClick={() => {
        window.location.reload();
      }}
    >
      Refresh the page
    </button>
  ) : (
    <Link to={"/"}>Return to main page</Link>
  );
}
