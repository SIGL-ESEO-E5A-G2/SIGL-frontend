export default function Error({
  error,
  message = "Une erreur est survenue"
}) {
  return <>
    L'application a rencontré un problème : {error?.message || message}
  </>;
}
