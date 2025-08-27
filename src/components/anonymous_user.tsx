import AnonUserProvider from "@/components/AnonUserProvider";

export default function TestPage() {
  return (
    <AnonUserProvider>
      <div className="p-6">
        <h1 className="text-xl font-bold">Anonymous User Test</h1>
        <p>Open the console → you should see either an existing session or a new anon user ID.</p>
      </div>
    </AnonUserProvider>
  );
}
