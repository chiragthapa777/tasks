import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { render } from "../../test-utils";
import Pagination from "./Pagination";

describe("Pagination", () => {
  const setPaginationMock = vitest.fn();

  afterEach(() => {
    vitest.clearAllMocks();
  });

  test("should render the correct number of page buttons", () => {
    const totalPages = 5;
    const currentPage = 1;

    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPagination={setPaginationMock}
      />
    );
    const previousButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });
    const pageButtons = screen.getAllByTestId(/pagination-pageButton/i);

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(pageButtons[0]).toBeInTheDocument();

    expect(pageButtons).toHaveLength(totalPages);
  });

  test("should disable the Previous button on the first page", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={1}
        setPagination={setPaginationMock}
      />
    );

    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  test("should disable the Next button on the last page", () => {
    render(
      <Pagination
        totalPages={5}
        currentPage={5}
        setPagination={setPaginationMock}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test.only("should call setPagination with the correct page when clicking a page button", async () => {
    user.setup();
    const totalPages = 5;
    const currentPage = 1;

    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPagination={setPaginationMock}
      />
    );

    const pageButton = screen.getByTestId("pagination-pageButton-2");
    await user.click(pageButton);

    expect(setPaginationMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("should call setPagination with the next page when clicking the Next button", async () => {
    const totalPages = 5;
    const currentPage = 1;

    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPagination={setPaginationMock}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    await user.click(nextButton);

    expect(setPaginationMock).toHaveBeenCalled();
    expect(screen.getByTestId("pagination-pageButton-2")).toHaveClass(
      "currentPage"
    );
  });

  test("should call setPagination with the previous page when clicking the Previous button", async () => {
    const totalPages = 5;
    const currentPage = 2;

    render(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setPagination={setPaginationMock}
      />
    );

    const previousButton = screen.getByRole("button", { name: /previous/i });
    await user.click(previousButton);

    expect(setPaginationMock).toHaveBeenCalled();
    expect(screen.getByTestId("pagination-pageButton-1")).toHaveClass(
      "currentPage"
    );
  });
});
