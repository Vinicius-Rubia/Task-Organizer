import { useTaskOrganizer } from "@/contexts/task-organizer";
import { ETaskStatus } from "@/enums";
import { Task } from "@/interfaces";
import { toastInformation } from "@/utils/toast-information";
import { Check, Edit, RotateCcw, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const {
    removeTask,
    toggleTaskStatus,
    updateTaskTitle,
    updateTaskDescription,
  } = useTaskOrganizer();

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [titleValue, setTitleValue] = useState(task.title);
  const [descriptionValue, setDescriptionValue] = useState(task.description);

  const handleUpdateTitle = () => {
    if (editTitle) {
      updateTaskTitle(task.id, titleValue);
      toastInformation(
        "😁 Título atualizado com sucesso!",
        "O título desta tarefa foi atualizada."
      );
    }
    setEditTitle((prev) => !prev);
  };

  const handleUpdateDescription = () => {
    if (editDescription) {
      updateTaskDescription(task.id, descriptionValue);
      toastInformation(
        "😁 Descrição atualizada com sucesso!",
        "A descrição desta tarefa foi atualizada."
      );
    }
    setEditDescription((prev) => !prev);
  };

  const handleRemoveTask = () => {
    removeTask(task.id);
    toastInformation(
      "🗑️ Tarefa excluída com sucesso!",
      "Sua tarefa foi excluída. Você não poderá mais vê-la."
    );
  };

  const handleToggleTaskStatus = () => {
    toggleTaskStatus(task.id);
    const forwardTaskText =
      task.status === ETaskStatus.PENDING ? "concluídos" : "pendentes";
    toastInformation(
      "✅ Tarefa movida com sucesso!",
      `Sua tarefa foi movida para aba "${forwardTaskText}". Acesse para vê-la.`
    );
  };

  return (
    <div className="border rounded-md bg-muted p-px">
      <div className="flex items-center justify-between pr-3">
        <input
          className={`w-full font-semibold outline-none border disabled:border-transparent ${
            !titleValue.trim() ? "border-red-500" : "border-primary"
          } px-3 rounded-md h-10 mr-3`}
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          disabled={!editTitle}
          tabIndex={-1}
        />
        <div className="flex items-center gap-2">
          {task.status === ETaskStatus.PENDING ? (
            <>
              <Button
                size="icon"
                className="size-7 bg-emerald-600 hover:bg-emerald-500"
                onClick={handleToggleTaskStatus}
              >
                <Check />
              </Button>
              <Button
                size="icon"
                className="size-7 bg-blue-600 hover:bg-blue-500"
                onClick={handleUpdateTitle}
                disabled={!titleValue.trim()}
              >
                {editTitle ? <Save /> : <Edit />}
              </Button>
            </>
          ) : (
            <Button
              size="icon"
              className="size-7 bg-blue-600 hover:bg-blue-500"
              onClick={handleToggleTaskStatus}
            >
              <RotateCcw />
            </Button>
          )}
          <Button
            variant="destructive"
            size="icon"
            className="size-7"
            onClick={handleRemoveTask}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
      <div className="relative">
        {task.status === ETaskStatus.PENDING && (
          <Button
            size="icon"
            variant="ghost"
            className="size-4 absolute right-3 top-3"
            onClick={handleUpdateDescription}
          >
            {editDescription ? <Save /> : <Edit />}
          </Button>
        )}
        {editDescription ? (
          <input
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            className={`w-full outline-none border ${
              !descriptionValue.trim() ? "border-red-500" : "border-primary"
            } pl-3 pr-10 rounded-md h-10 text-sm`}
          />
        ) : (
          <p className="p-3 text-sm bg-background rounded-sm m-px pr-20">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
}
