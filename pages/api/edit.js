import {connectDB} from "@/util/database"
import {ObjectId} from "mongodb"

export default async function List(req, res) {
  const db = (await connectDB).db("forum");
  let retData = new Array();

  switch(req.method) {
    case "POST":
      let bodyObject = req.body;

      try {
        let myPost = await db.collection("post").updateOne(
          {_id : new ObjectId(bodyObject._id)}, 
          {$set : {title : bodyObject.title, content : bodyObject.content}} 
        );

        res.redirect(302, "/list");
      }
      catch(e) {
        console.log(e);
      }
      
      break;
    case "GET":
      let result = await db.collection("post").find().toArray();
      res.json({status:200, data:result});
      
      break;
  }

  
}