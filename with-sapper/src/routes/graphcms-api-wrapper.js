import fetch from 'isomorphic-unfetch';

export async function post(req, res, next) {
  const { body } = req;
  const gcmsRes = await fetch(
    'https://serve.onegraph.com/graphql?app_id=4d05e39e-80a8-401b-ab53-3da7b8c6f9a6',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );

  const { data } = await gcmsRes.json();

  if (true) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({ data }));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
