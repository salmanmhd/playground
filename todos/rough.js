// const a = new Date();
// const b = new Date("23 may 2023");
// const c = new Date(" may 23 2023");
// console.log(c.toDateString());
// console.log(a.toDateString());
// console.log(a.toISOString());
// console.log(a.toJSON());
// console.log(a.toLocaleDateString());
// console.log(a.toLocaleTimeString());
// console.log(a.toString());

// console.log(a, " a");
// console.log(b, " b");
// console.log(c, " c");

// console.log(a > c);

const a = [
  {
    name: "salman",
    class: 5,
    id: 2,
  },
  {
    id: 3,
    name: "rahul",
    class: 5,
  },
];

function updateName(id, content) {
  const result = a.map((el) => (el.id === id ? { ...el, ...content } : el));
  console.log(result);
}

const update = { name: "aman" };
updateName(3, update);
