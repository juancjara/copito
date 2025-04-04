import { AudioEditor } from "./components/AudioEditor";
import { client } from "../lib/hono-client";

export default async function Home() {
  // Fetch recordings using Hono RPC
  const response = await client.recordings.$get();
  const text = await response.text();
  console.log("response", text);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recordings</h1>
      <div className="space-y-4">
        
      </div>
    </div>
  );
}
