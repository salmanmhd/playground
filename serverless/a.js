const c = {
  req: 'request',
  res: 'response',
};

console.log(c.req);

const { req, as } = c;
console.log(req, res);
