import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { faker } from '@faker-js/faker';
import { getServerSession } from 'next-auth';

type Post = {
  id: string;
  title: string;
  content: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
};

function createRandomPost(): Post {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
    },
  };
}

// random count between 20 - 40
const count = faker.number.int(20) + 30;

const posts: Post[] = faker.helpers.multiple(createRandomPost, {
  count: 25,
});

export async function GET(req: Request) {
  return new Response(JSON.stringify(posts), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });

}


// POST /api/community
export async function POST(req: Request, res: Response) {
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
