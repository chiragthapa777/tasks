import { screen } from "@testing-library/react";
import { render } from "../../test-utils";
import TaskCard from "./TaskCard";

describe("TaskCard", () => {
  const task = {
    title: "Test Task",
    body: "This is a test task.",
    done: false,
    createdAt: new Date().toISOString(),
    scheduledAt: new Date().toISOString(),
    _id: "test_id",
  };

  const invalidateMock = vitest.fn();
  const setErrorMock = vitest.fn();

  afterEach(() => {
    vitest.clearAllMocks();
  });

  test("should render task details", () => {
    render(<TaskCard task={task} setError={setErrorMock} />);

    expect(screen.getByText(task.title)).toBeInTheDocument();
    expect(screen.getByText(task.body)).toBeInTheDocument();
    expect(screen.getByText(/created at/i)).toBeInTheDocument();
    expect(screen.getByText(/scheduled at/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });
});
