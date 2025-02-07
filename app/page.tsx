import SandwichRater from "./components/SandwichRater";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        No Bland Sandos Allowed
      </h1>
      <SandwichRater />
    </main>
  );
}
