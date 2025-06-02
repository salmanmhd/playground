const a = {
  name: "salman",
  class: 5,
};

function edit(obj) {
  console.log(obj);
  obj.name = "test";
  obj.class = obj.class + 1;
  console.log(obj);
}

edit(a);
