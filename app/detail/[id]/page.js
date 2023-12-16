import {connectDB} from "@/util/database"
import { ObjectId } from "mongodb"
import Comment from "./Comment"

export default async function Detail(props) {

  const db = (await connectDB).db("forum");
  let res = await db.collection("post").findOne({ _id : new ObjectId(props.params.id) })
  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{res.title}</h4>
      <p>{res.content}</p>
      <Comment parent={props.params.id}/>
    </div>
  )
}