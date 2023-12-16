import { MongoClient } from "mongodb"
import { connectDB } from "@/util/database"
export default async function Home() {
  
  const db = (await connectDB).db("forum");
  let res = await db.collection("post").find().toArray()
  // console.log(res);  

  return (
    <div>
      안녕
    </div>
  )
}
