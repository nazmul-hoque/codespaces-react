import { Box, Typography, Paper, TextField, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { async } from "@firebase/util";

function TodoItem({ todo, key }) {
  return <p key={key}> {todo.todo}</p>;
}

export default function Todos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [curEditTodo, setCurEditTodo] = useState({});
  const [editedTodo, setEditedTodo] = useState("");

  const handleClickOpen = (todo) => {
    setOpen(true);
    setCurEditTodo(todo);
  };

  const handleClose = () => {
    setOpen(false);

    if (curEditTodo !== {}) {
      updateTodo();
    } else {
      alert(`curEditTodo is empty!`);
    }
  };

  const updateTodo = async () => {
    const newTodo = { ...curEditTodo, todo: editedTodo };

    try {
      await updateDoc(doc(db, "todos", curEditTodo.id), newTodo);
    } catch (e) {
      alert(e);
    }
  };

  // firebase load collection
  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));

      setTodos(newData);
      //alert(todos, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, [todos]);

  const addTodo = async (e) => {
    e.preventDefault();

    //alert(db);

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo
      });
      //alert("Document written with ID: ", docRef.id);
    } catch (e) {
      alert(`error adding document ${e}`);
    }
  };

  const onDeleteTodo = async (todo) => {
    alert(`${JSON.stringify(todo)}`);

    try {
      await deleteDoc(doc(db, "todos", todo.id));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Grid textAlign="center">
      <h1>Todo [{todos.length}]</h1>

      <input
        type="text"
        placeholder="What do you have to do today?"
        onChange={(e) => setTodo(e.target.value)}
      />

      <div className="btn-container">
        <Button variant="contained" type="submit" onClick={addTodo}>
          Submit
        </Button>
      </div>

      <Box
        sx={{ display: "flex", gap: 2, flexDirection: "column" }}
        className="todo-content"
      >
        {todos?.map((todo, i) => (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <TodoItem key={i} todo={todo} />{" "}
              <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                <HighlightOffIcon
                  className="pointer"
                  onClick={(e) => onDeleteTodo(todo)}
                  color="success"
                />
                <ModeEditIcon
                  className="pointer"
                  onClick={(e) => handleClickOpen(todo)}
                  color="error"
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit todo</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Edit todo"
            type="text"
            fullWidth
            variant="standard"
            value={editedTodo}
            onChange={(e) => {
              setEditedTodo(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>SAVE</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
