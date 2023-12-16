import {connectDB} from "@/util/database"
import ListItem from "./ListItem"

export const dynamic = "force-dynamic"

export default async function List() {
  const db = (await connectDB).db("forum");
  let res = await db.collection("post").find().toArray()
  res = res.map((a) => {
    a._id = a._id.toString()
    return a
  })

  return (
    <div className="list-bg">
      <ListItem res={res}/>
    </div>
  )
}