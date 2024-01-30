import { connectDB } from "@/util/database";

export default async function Home() {
  const db = (await connectDB).db("forum");
  let res = await db.collection("post").find().toArray();
  
  return (
    <div>das</div>
  );
}
