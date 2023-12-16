import {connectDB} from "@/util/database"
import {ObjectId} from "mongodb"

export default async function List(req, res) {
  const db = (await connectDB).db("forum");
  let retData = new Array();
  switch(req.method) {
    case "POST":
      try {
        let myPost = await db.collection("post").updateOne(
          {_id : new ObjectId(req.body._id)}, 
          {$set : {title : req.body.title, content : req.body.content}} 
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
    case "DELETE":
      let body = JSON.parse(req.body);
      try {
        let result = await db.collection("post").deleteOne({_id : new ObjectId(body._id)});
        res.status(200).json("success");
      }
      catch(e) {
        console.log("error"+e);
        res.status(500).json("error");
      }
  }

  
}