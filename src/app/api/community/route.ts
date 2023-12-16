import { faker } from '@faker-js/faker';

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
