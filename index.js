const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "sakshi",
    content: "Lovely Day",
  },
  {
    id: uuidv4(),
    username: "pushpendra",
    content: "Nice Working with you",
  },
  {
    id: uuidv4(),
    username: "Raghvendra",
    content: "Work Hard for achieving Success",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/");
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req,res)=> {
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/");
})

app.delete("/posts/:id", (req,res)=>{
  let {id}=req.params;
  posts=posts.filter(val=> val.id!==id);
  res.redirect('/');
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
