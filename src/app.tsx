import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "./components/header";
import { TaskContent } from "./components/task-content";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { useTaskOrganizer } from "./contexts/task-organizer";
import { ETaskStatus } from "./enums";

export function App() {
  const { tasks } = useTaskOrganizer();

  const pendingTasks = tasks.filter((task) => task.status === ETaskStatus.PENDING);
  const completedTasks = tasks.filter((task) => task.status === ETaskStatus.COMPLETED);

  return (
    <ThemeProvider defaultTheme="light" storageKey="task-organizer-theme">
      <Toaster />
      <div className="h-screen flex flex-col">
        <Header />

        <main className="p-10 bg-secondary flex-1 space-y-12">
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-2 bg-primary/10">
              <TabsTrigger value="pending" className="uppercase">
                Pendentes
              </TabsTrigger>
              <TabsTrigger value="completed" className="uppercase">
                Concluídos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <TaskContent
                title="Pendentes"
                description={`Você tem (${pendingTasks.length}) tarefas pendentes.`}
                tasks={pendingTasks}
              />
            </TabsContent>
            <TabsContent value="completed">
              <TaskContent
                title="Concluídos"
                description={`Você concluiu (${completedTasks.length}) tarefas de um total de (${tasks.length}).`}
                tasks={completedTasks}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ThemeProvider>
  );
}
