import { fireEvent, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import * as taskService from "../../services/task.service";
import { render } from "../../test-utils";
import { taskType } from "../../types/task.type";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  const mockTask: taskType = {
    title: "Test Task",
    body: "This is a test task.",
    done: false,
    createdAt: new Date().toISOString(),
    scheduledAt: new Date().toISOString(),
    _id: "test_id",
  };

  afterEach(() => {
    vitest.clearAllMocks();
  });

  test("should render the form for adding a task", () => {
    render(<TaskForm mode="add" />);

    expect(screen.getByLabelText("title")).toBeInTheDocument();
    expect(screen.getByLabelText("scheduledAt")).toBeInTheDocument();
    expect(screen.getByLabelText("body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "add" })).toBeInTheDocument();
  });

  test("should render the form for editing a task", () => {
    render(<TaskForm mode="edit" task={mockTask} />);

    expect(screen.getByLabelText("title")).toHaveValue(mockTask.title);
    expect(screen.getByLabelText("body")).toHaveValue(mockTask.body);
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  test("should call addTaskApi when form is submitted to add a task", async () => {
    user.setup();
    vitest.spyOn(taskService, "addTask").mockResolvedValue({} as any);

    render(<TaskForm mode="add" />);

    const titleElement = screen.getByLabelText("title");
    const bodyElement = screen.getByLabelText("body");
    const scheduledAtElement: HTMLInputElement =
      screen.getByLabelText("scheduledAt");

    await user.type(titleElement, "New Task");
    await user.type(bodyElement, "Task body");
    fireEvent.change(scheduledAtElement, {
      target: {
        value: new Date("2025-10-28T09:09:02.142Z").toISOString().slice(0, 16),
      },
    });

    console.log(scheduledAtElement.value);

    const submitButton = screen.getByRole("button", { name: "add" });
    expect(submitButton).toBeInTheDocument();
    expect(titleElement).toHaveValue("New Task");
    expect(bodyElement).toHaveValue("Task body");
    expect(scheduledAtElement).toHaveValue(
      new Date("2025-10-28T09:09:02.142Z").toISOString().slice(0, 16)
    );
    expect(submitButton).not.toBeDisabled();

    // i want to check why form is disable here
    await user.click(submitButton);

    expect(taskService.addTask).toHaveBeenCalled();
  });
});
