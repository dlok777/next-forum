import {connectDB} from "@/util/database"

export default async function List(req, res) {
  const db = (await connectDB).db("forum");
  let retData = new Array();
  switch(req.method) {
    case "POST":
      let bodyObject = req.body;

      if(bodyObject.title == undefined || bodyObject.content == undefined || bodyObject.title == "" || bodyObject.content == "") {
        res.json({status:400, message:"title or content is undefined"});
        return res;
      }

        
      let myPost = await db.collection("post").insertOne(bodyObject);
      res.json(bodyObject);
      break;
    case "GET":
      let result = await db.collection("post").find().toArray();
      res.json({status:200, data:result});
      
      break;
  }

  return res;
}