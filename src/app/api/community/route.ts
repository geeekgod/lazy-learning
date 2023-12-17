import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {

  const session = await getServerSession(authOptions);

  let sessionUser = null;
  if (session) {
    sessionUser = session.user;
  } else {
    return new Response(JSON.stringify({ error: "not signed in" }), {
      status: 401,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }
  const { data: posts, error } = await supabase.from("posts").select("*").eq('email', sessionUser.email);

  return new Response(JSON.stringify(posts), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });

}


// POST /api/community
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  let sessionUser = null;
  if (session) {
    sessionUser = session.user;
  } else {
    // Not Signed in
    return new Response(JSON.stringify({ error: "not signed in" }), {
      status: 401,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  const body = await req.json();

  // validate body to have title and content and email
  if (!body.title || !body.content || !body.email) {
    return new Response(JSON.stringify({ error: "missing fields" }), {
      status: 400,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  if (!sessionUser) {
    return new Response(JSON.stringify({ error: "user not found" }), {
      status: 404,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }


  // create a new post
  const post = {
    title: body.title,
    content: body.content,
    email: sessionUser.email,
    image: sessionUser.image,
    name: sessionUser.name,
  };

  const { data, error } = await supabase.from("posts").insert(post);

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  return new Response(JSON.stringify({
    message: "post created",
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
