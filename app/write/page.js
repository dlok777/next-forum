export default function Write() {
  return (
    <div>
      <form method="POST" action="/api/list">
        제목<input type="text" name="title" ></input>
        타이틀<input type="text" name="content" ></input>
        <button type="submit">보내기</button>
      </form>
    </div>
  )
}