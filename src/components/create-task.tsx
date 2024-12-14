import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTaskOrganizer } from "@/contexts/task-organizer";
import { CreateTaskSchema } from "@/schemas/create-task-schema";
import { CreateTaskSchemaType } from "@/types";
import { toastInformation } from "@/utils/toast-information";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

export function CreateTask() {
  const { createTask } = useTaskOrganizer();
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleCreateTaskSubmit = (data: CreateTaskSchemaType) => {
    createTask(data.title, data.description);
    handleOpenDialog(false);
    toastInformation("✅ Tarefa criada com sucesso!", 'Sua nova tarefa foi criada, Você pode vê lá aba "Pendentes".');
  };

  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
    form.reset();
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus />
          Adicionar novo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTaskSubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Crie uma tarefa nova</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar sua tarefa.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da tarefa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={6}
                      placeholder="Descrição da tarefa"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Criar tarefa</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
