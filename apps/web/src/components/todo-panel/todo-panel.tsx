import { useMutation, useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { createTodo, readTodos } from "@/services"
import {useForm} from "@tanstack/react-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

export const TodoPanel = () => {

  const createTodoForm = useForm({
    defaultValues: {
      "todoTitle": "",
      "todoDescription": "",
    },
    onSubmit: (form) => {
      console.log("Submitting form:", form.value)
      createTodoMutation.mutate({
        title: form.value.todoTitle,
        description: form.value.todoDescription
      })
    }
  })


  const readTodosQuery = useQuery({
    queryKey: ["readTodosQuery"],
    queryFn: readTodos
  })

  const createTodoMutation = useMutation({
    mutationKey: ["createTodoMutation"],
    mutationFn: createTodo,
    onSuccess: () => {
      readTodosQuery.refetch();
    },
  })

  return (
    <Card className="min-w-1/2">
        <CardHeader>
          <CardTitle>Manage Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <createTodoForm.Field name="todoTitle" children={(field) => {
              return (
                <Input 
                  type="text" 
                  placeholder="Title of your task?" 
                  value={field.state.value} 
                  onChange={(e) => field.handleChange(e.target.value)} 
                />
              )
            }} />
            <createTodoForm.Field name="todoDescription" children={(field) => {
              return (
                <Textarea 
                  placeholder="Describe your task?" 
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}/>
            
            <Button type="button" onClick={(e) => {
              e.preventDefault()
              createTodoForm.handleSubmit()
            }}>Add Todo</Button>
          </form>
          <hr className="my-4"/>
          {readTodosQuery.data ? readTodosQuery.data.map(todo => {
            return (
              <div key={todo.id} className="mb-4 p-4 border rounded">
                <h3 className="text-xl font-bold">{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Status: {todo.isCompleted ? "Completed" : "Pending"}</p>
              </div>
            )
          }) : <p>Loading todos...</p>}
        </CardContent>
    </Card>
  )
}
