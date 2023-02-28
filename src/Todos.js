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

function TodoItem({ todo }) {
  return <Typography variant="body1">{todo.todo}</Typography>;
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
    setEditedTodo(todo.todo);
  };

  const handleClose = () => {
    setOpen(false);
    setCurEditTodo({});
    setEditedTodo("");
  };

  const updateTodo = async () => {
    const newTodo = { ...curEditTodo, todo: editedTodo };

    try {
      await updateDoc(doc(db, "todos", curEditTodo.id), newTodo);
      fetchTodos();
      handleClose();
    } catch (e) {
      alert(e);
    }
  };

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setTodos(newData);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "todos"), {
        todo: todo
      });
      setTodo("");
      fetchTodos();
    } catch (e) {
      alert(`error adding document ${e}`);
    }
  };

  const onDeleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
      fetchTodos();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h4" component="h1">Todo List ({todos.length})</Typography>
      </Grid>
      <Grid item>
        <form onSubmit={addTodo}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <TextField
              variant="outlined"
              placeholder="What do you have to do today?"
              size="small"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Box ml={1}>
              <Button variant="contained" color="primary" type="submit">Add</Button>
            </Box>
          </Box>
        </form>
      </Grid>
      <Grid item>
        <Box width='100%'>
          {todos?.map((todo,i) => (
            <Box key={todo.id} my={1}>
            
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TodoItem key={i} todo={todo} />
            <Box sx={{ display: "flex", gap: 2 }}>
              <HighlightOffIcon
                className="pointer"
                onClick={() => onDeleteTodo(todo)}
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
        </Box>
      
        ))}
        </Box>
      </Grid>
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
