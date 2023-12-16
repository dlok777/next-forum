'use client'
import React, { useState, useEffect } from 'react'

export default function Comment({parent}) {
  let [comment, setComment] = useState([]); 
  let [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/comment?parent=" + parent, {method:'GET'})
    .then(r=>r.json())
    .then((result) => {
      setList(result);
    })
  }, [])

  const data = {
    comment: comment,
    parent: parent
  }
  return (
    <div>
      <div>댓글 목록</div>
      <hr></hr>
      {
        list.map((a, i) => {
          return (
            <p key={i}>{a.comment}</p>
          )
        })
      }
      <input onChange={(e) => { setComment(e.target.value) }}/>
      <button onClick={() => {
        fetch("/api/comment", {method:'POST', body:JSON.stringify(data)})
        .then(r=>r.json())
        .then((result) => {
          setList(result);
        })
      }}>댓글 전송</button>
    </div>
  )
}

