import {connectDB} from "@/util/database"
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function List(req, res) {
  const db = (await connectDB).db("forum");
  let retData = new Array();
  let session = await getServerSession(req, res, authOptions);
  
  switch(req.method) {
    case "POST":
      let bodyObject = req.body;
      if(!session) {
        res.json({status:400, message:"not login"});
        return res;
      }
      else {
        bodyObject.author = session.user.email;
      }

      if(bodyObject.title == undefined || bodyObject.content == undefined || bodyObject.title == "" || bodyObject.content == "") {
        res.json({status:400, message:"title or content is undefined"});
        return res;
      }

      try {
        let myPost = await db.collection("post").insertOne(bodyObject);
        res.redirect(302, "/list");
      }
      catch(e) {
        console.log(e);
      }
      
      res.json(bodyObject);
      break;
    case "GET":
      let result = await db.collection("post").find().toArray();
      res.json({status:200, data:result});
      
      break;
  }

  return res;
}