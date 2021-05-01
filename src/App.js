import React from "react";
import { Button, Card, Col, Divider, Input, Row, Space, Typography, } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;


function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [todos2, setTodos2] = React.useState([]);
  const [todo2, setTodo2] = React.useState("");



  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);


  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
  function handleSubmitSub(e) {
    e.preventDefault();
    console.log(JSON.stringify(todos2.text));
    const newTodo2 = {
      id: new Date().getTime(),
      text: todo2,
      completed: false,
    };
    setTodos2([...todos2].concat(newTodo2));
    setTodo2("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function deleteTodo2(id) {
    let updatedTodos2 = [...todos2].filter((todo2) => todo2.id !== id);
    setTodos2(updatedTodos2);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function toggleComplete2(id) {
    console.log(JSON.stringify(todo))
    let updatedTodos2 = [...todos2].map((todo2) => {
      if (todo2.id === id) {
        todo2.completed = !todo2.completed;
      }
      return todo2;
    });
    setTodos2(updatedTodos2);
  }

  // function submitEdits(id) {
  //   const updatedTodos = [...todos].map((todo) => {
  //     if (todo.id === id) {
  //       todo.text = editingText;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  //   setTodoEditing(null);
  // }


    function done(){

      todos2.completed == !todos2.completed
  }

  return (
    <Container>
    <Space>
    <form onSubmit={handleSubmit}>
        <Input
          style={{ width: 400 }} placeholder="Enter Task Name" 
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit" style={{ backgroundColor:"#1890ff" ,color:"#fff" ,borderRadius:"2px",border:"0px" ,paddingLeft:"10px",paddingRight:"10px", paddingTop:"5px" ,paddingBottom:"5px" }}>Add Todo</button>
      </form>

    </Space>
    {todos.map((todo) => (
       <Space direction="vertical" style={{ marginTop: 24 }}>
       <Card
         title={todo.text}
         style={{ width: 600 }}
         extra={
           <>
            {/* ยังไม่ได้ทำduplicate เพราะยังไม่เข้าใจ */}
             {/* <Button type="primary">Duplicate</Button>{" "}  */}
             {/* เข้าใจว่าลบทั้งหมด */}
             <Button type="primary" danger onClick={() => deleteTodo(todo.id)}>
               Delete
             </Button>
           </>
         }
       >
         <Space direction="vertical" style={{ width: "100%" }}>
           <Space>
           <form onSubmit={handleSubmitSub}>
        <Input
          style={{ width: 400 }} placeholder="Enter Subtask Name" 
          type="text"
          onChange={(e) => setTodo2(e.target.value)}
          value={todo2}
        />
        <button type="submit" style={{ backgroundColor:"#1890ff" ,color:"#fff" ,borderRadius:"2px",border:"0px" ,paddingLeft:"10px",paddingRight:"10px", paddingTop:"5px" ,paddingBottom:"5px" }}>Add subtask</button>
      </form>
         
           
           </Space>
           <Divider />

           {todos2.map((todo2) =>(
           <Row key={todo2.id}>
             <Col span={16}>
               <Typography.Text disabled={todos2.completed ? "disabled" : ""}>{todo2.text}</Typography.Text>
             </Col>
             <Col span={8}>
               <Button type="primary" id="completed"
                checked={todo2.completed}

                
                onClick={() => done()}>Done</Button>{" "}
               <Button type="danger" onClick={() => deleteTodo2(todo2.id)}>Delete</Button>
             </Col>
           </Row>
           ))}
         </Space>
    

        </Card>
     </Space>
      ))}


   



     




</Container>
  );
};

export default App;