export default function Time(request, response) {
  const date = Date();
  let retData = new Array();
  
  if(request.method == "GET") {
    retData['json'] = date;
    retData['status'] = 200;
  }
  else if(request.method == "POST") {
    retData['json'] = false;
    retData['status'] = 500;
  }

  return response.status(retData['status']).json(retData['json']);
}