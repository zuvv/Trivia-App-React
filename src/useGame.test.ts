import { renderHook, act } from "@testing-library/react";
import { useGame } from "./useGame";

describe("useGame", () => {
  it("starts with a question loaded", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.state.question).not.toBe("");
  });

  it("advances to the next question on nextQuestion()", () => {
    const { result } = renderHook(() => useGame());
    const first = result.current.state.question;
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.state.question).not.toBe(first);
  });

  it("toggles a category off and removes its questions", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.state.activeCategories).toContain("H");
    act(() => {
      result.current.toggleCategory("H", true);
    });
    expect(result.current.state.activeCategories).not.toContain("H");
  });

  it("sets gameOver when all questions are exhausted", () => {
    const { result } = renderHook(() => useGame());
    // Turn off all categories → no questions left
    act(() => {
      result.current.toggleCategory("H", true);
    });
    expect(result.current.state.gameOver).toBe(true);
  });

  it("toggles a category back on", () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.toggleCategory("H", true);
    });
    act(() => {
      result.current.toggleCategory("ST", false);
    });
    expect(result.current.state.activeCategories).toContain("ST");
    expect(result.current.state.gameOver).toBe(false);
  });
});
