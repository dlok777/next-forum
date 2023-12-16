import {connectDB} from "@/util/database"
import {ObjectId} from "mongodb"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function List(req, res) {
  const db = (await connectDB).db("forum");
  let session = await getServerSession(req, res, authOptions);
  let id = "";

  if(req.method == "POST") id = req.body._id;
  else if(req.method == "DELETE") id = JSON.parse(req.body)._id;
  else id = req.query.id;

  let data = await db.collection("post").findOne({_id : new ObjectId(id)});

  if(checkPermission(data, session) == false) {
    return res.status(403).json("no permission"); 
  }

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

const checkPermission = (data, session) => {
  if(data.author != session.user.email) {
    return false;
  }
  else {
    return true;
  }
}