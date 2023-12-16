import {connectDB} from "@/util/database"
import {ObjectId} from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function List(req, res) {
  const db = (await connectDB).db("forum");

  

  switch(req.method) {
    case "POST":
      
      const body = JSON.parse(req.body);
      body.parent = new ObjectId(body.parent);
      let data = await db.collection("post").findOne({_id : body.parent});
      if(!data) {
        res.status(404).json("no data");
        return res;
      }
      let session = await getServerSession(req, res, authOptions);
      
      
      if(!session) {
        res.json({status:400, message:"not login"});
        return res;
      }
      else {
        body.author = session.user.email;
      }

      try {
        let myPost = await db.collection("comment").insertOne(body);
        let comments = await db.collection("comment").find({parent : body.parent}).toArray();
        return res.json(comments);
      }
      catch(e) {
        console.log("error" + e);
      }
      
      break;

    case "GET":
      
      let parent = await db.collection("post").findOne({_id : new ObjectId(req.query.parent)});
      if(!parent) {
        res.status(404).json("no data");
        return res;
      }

      let result = await db.collection("comment").find({parent : new ObjectId(req.query.parent)}).toArray();
      
      return res.status(200).json(result);
  }

  
}
