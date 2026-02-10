import Header from "../src/components/Header";

export default function ErrorPage() {
  return (
    <>
      <Header />
      <main className="error-page">
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
};
