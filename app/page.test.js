import {
  findByTestId,
  fireEvent,
  getByPlaceholderText,
  render,
} from "@testing-library/react";
import Home from "./page";

import axios from "axios";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "vivi" },
    }),
  },
}));

describe(Home, () => {
  test("username должен изменяться по onChange методу", () => {
    const { getByPlaceholderText } = render(<Home />);
    const usernameInput = getByPlaceholderText(/type login/i);
    const testValue = "vicky";
    fireEvent.change(usernameInput, { target: { value: testValue } });
    expect(usernameInput.value).toBe(testValue);
  });

  test("пустой username при нажатии должен выдавать ошибку", () => {
    const { getByPlaceholderText, findByText, getByRole } = render(<Home />);
    let usernameInput = getByPlaceholderText(/type login/i);
    const searchBtn = getByRole("button", { name: "Search" });
    usernameInput = "";

    fireEvent.click(searchBtn);
    expect(findByText("fill in the input"));
  });

  test("fake api call с добавлением нового компонента", async () => {
    const { getByRole, getByPlaceholderText, findByText } = render(<Home />);
    const usernameInput = getByPlaceholderText(/type login/i);
    const testValue = "test";
    const searchBtn = getByRole("button", { name: "Search" });
    fireEvent.change(usernameInput, { target: { value: testValue } });
    fireEvent.click(searchBtn);
    expect(findByText("repos"));
  });
});
