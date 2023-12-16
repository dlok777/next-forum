import {connectDB} from "@/util/database"

export default async function Detai2l() {
  const db = (await connectDB).db("forum");
  let res = await db.collection("post").find().toArray()
}