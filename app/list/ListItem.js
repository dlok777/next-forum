'use client'
import Link from "next/link"

export default function ListItem({res}) {
  return (
    <div>
      {
        res.map((row, i) => 
          <div className="list-item" key={i}>
            <Link key={i} href={`/detail/${row._id}`} style={ { textDecoration:"none" } }>
              <h4>{row.title}</h4>
            </Link>
            <Link key={i} href={`edit/${row._id}`} style={{textDecoration:"none"}}>(수정)</Link>
            <span onClick={(e) => {
              fetch("api/edit", {
                method: "DELETE",
                body: JSON.stringify({_id: row._id})
              }).then((r) => {
                if(r.status == 200) {
                  return r.json()
                }
                else {
                  return "error"
                }
                
              })
              .then((r) => {
                if(r == "success") {
                  alert(r);
                  e.target.parentNode.remove()
                }
              })
            }}>(삭제)</span>
            <p>1월 1일</p>
          </div>
          )
      }
    </div>
  )
}

