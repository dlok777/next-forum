import {connectDB} from "@/util/database"
import { ObjectId } from "mongodb"

export default async function Detail(props) {
  console.log(props);

  const db = (await connectDB).db("forum");
  let res = await db.collection("post").findOne({ _id : new ObjectId(props.params.id) })
  return (
    <div>
      <div>아이디 : {res._id.toString()}</div>
      <form action="/api/edit" method="POST">
        <input name="title" defaultValue={res.title}/>
        <input name="content" defaultValue={res.content}/>
        <input name="_id" defaultValue={res._id.toString()}/>
        <button type="submit">전송</button>
      </form>
      
    </div>
  )
}