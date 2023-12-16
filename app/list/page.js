import {connectDB} from "@/util/database"
import Link from "next/link"

export default async function List() {
  const db = (await connectDB).db("forum");
  let res = await db.collection("post").find().toArray()

  return (
    <div className="list-bg">
      {
        res.map((row, i) => 
          <div className="list-item" key={i}>
            <Link key={i} href={`/detail/${row._id}`} style={ { textDecoration:"none" } }>
              <h4>{row.title}</h4>
            </Link>
            <Link key={i} href={`edit/${row._id}`} style={{textDecoration:"none"}}>(수정)</Link>
            <p>1월 1일</p>
          </div>
          )
      }
      
    </div>
  )
}