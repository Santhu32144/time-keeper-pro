import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProjectAsync, deleteProjectAsync } from '@/store/actions';
import { Project } from '@/store/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Plus, FolderKanban, CalendarIcon, Loader2, Trash2, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { projects, isLoading } = useAppSelector((state) => state.projects);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  const handleCreateProject = async () => {
    if (!projectName || !projectCode || !startDate) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const result = await dispatch(
      createProjectAsync({
        name: projectName,
        code: projectCode.toUpperCase(),
        startDate: startDate.toISOString(),
        createdBy: currentUser?.id || '',
      })
    );

    if (createProjectAsync.fulfilled.match(result)) {
      toast({
        title: 'Project Created',
        description: `${projectName} has been created successfully.`,
      });
      setIsOpen(false);
      setProjectName('');
      setProjectCode('');
      setStartDate(new Date());
    }
  };

  const handleDeleteProject = async (project: Project) => {
    const result = await dispatch(deleteProjectAsync(project.id));
    if (deleteProjectAsync.fulfilled.match(result)) {
      toast({
        title: 'Project Deleted',
        description: `${project.name} has been deleted.`,
      });
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    const variants = {
      active: 'bg-success/10 text-success hover:bg-success/20',
      completed: 'bg-muted text-muted-foreground hover:bg-muted/80',
      'on-hold': 'bg-warning/10 text-warning hover:bg-warning/20',
    };
    return variants[status];
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and track time across them</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Add a new project to start tracking time</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Project Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., PRJ-001"
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  className="uppercase"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Save Project'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Total Projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Active Projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {projects.filter((p) => p.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Completed Projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              {projects.filter((p) => p.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>A list of all your projects</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FolderKanban className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No projects yet</p>
              <p className="text-sm">Create your first project to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <code className="px-2 py-1 bg-muted rounded text-sm">{project.code}</code>
                    </TableCell>
                    <TableCell>{format(new Date(project.startDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusBadge(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDeleteProject(project)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
