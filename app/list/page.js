import { connectDB } from "@/util/database";

export default async function List() {
  const db = (await connectDB).db("forum");
  let res = await db.collection("post").find().toArray();
  
  return (
    <div className="list-bg">
      
      {
        res.map((post) => {
          return (
            <div className="list-item">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          )
        })
      }
    </div>
  )
}