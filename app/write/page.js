// import { useEffect } from 'react';
// import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"


export default async function Write() {
  // const router = useRouter();

  // useEffect(async () => {
  //   const checkSession = async () => {
  //     let session = await getServerSession(authOptions);

  //     if(!session) {
  //       router.push("/list");
  //     }
  //   }

  //   await checkSession();
  // }, []);
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