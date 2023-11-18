'use client';
import LoadingDots from '@/components/LoadingDot';
import { SessionContextValue, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { TodoItem } from 'types';

const TodoList = () => {
  const [toDos, setToDos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { data: session } = useSession() as SessionContextValue;
  const [userId, setUserId] = useState<number | string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      setUserId(userId);
      fetch(`/api/todo?userId=${userId}`, { method: 'GET' }).then(
        async (res) => {
          const todo = (await res.json()) as TodoItem[];
          console.log('todo:', todo);
          setToDos(todo);
        }
      );
    }
  }, [session]);

  const handleDeleteTodo = async (index: number) => {
    const newToDos = toDos.filter((_, i) => i !== index);
    setToDos(newToDos);
    await fetch(`/api/todo?id=${toDos[index].id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast.success('删除成功');
  };
  const handleAddTodo = async () => {
    if (loading) return;
    if (toDos.length > 4) {
      toast.error('The number of todos exceeds five');
      return;
    }

    if (inputValue.trim() !== '') {
      setLoading(true);
      const result: any = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputValue, userId }),
      });
      const item = (await result.json()) as TodoItem;
      const todoItem = { id: item.id, content: inputValue, complete: false };
      setToDos([...toDos, todoItem]);
      setInputValue('');
      setLoading(false);
      toast.success('新增成功');
    } else {
      toast.error('Please enter a valid todo.');
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleAddTodo();
    }
  };
  const checkTodo = async (index: number, complete: boolean) => {
    const updatedToDos = toDos.map((todo, i) => {
      if (i === index) {
        return { ...todo, complete };
      }
      return todo;
    });
    setToDos(updatedToDos);
    await fetch('/api/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: toDos[index].id, complete }),
    });
  };

  return (
    <div className="container mx-auto p-4 min-h-[400px] w-[400px]">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo"
          className="border border-gray-300 rounded-lg px-4 py-2 mr-2 flex-grow text-gray-600"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center w-[80px]"
        >
          {loading ? <LoadingDots color="#fff" /> : 'Add'}
        </button>
      </div>
      {toDos.length > 0 ? (
        <ul className="h-[300px] overflow-y-auto">
          {toDos.map((todo, index) => (
            <li key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={toDos[index].complete}
                onChange={(event) => {
                  checkTodo(index, event.target.checked);
                }}
              />
              <span
                className={
                  todo.complete
                    ? 'flex-grow px-1 text-gray-500 line-through'
                    : 'flex-grow px-1 text-gray-500'
                }
              >
                {todo.content}
              </span>
              <button
                onClick={() => handleDeleteTodo(index)}
                className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                删除
                {/* <TrashIcon className="h-5 w-5" /> */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No toDos yet.</p>
      )}
    </div>
  );
};

export default TodoList;
