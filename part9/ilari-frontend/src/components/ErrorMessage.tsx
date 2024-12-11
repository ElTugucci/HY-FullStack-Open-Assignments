const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <div style={{ color: "red" }}>
      <h1>{errorMessage}</h1>
    </div>
  );
};

export default ErrorMessage;
