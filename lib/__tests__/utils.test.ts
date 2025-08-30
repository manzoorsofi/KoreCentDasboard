import { cn, formatDate, debounce } from "../utils";

describe("Utils", () => {
  describe("cn", () => {
    it("should combine class names", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });
  });

  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2024-01-15");
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Jan 15, 2024/);
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", done => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      setTimeout(() => {
        expect(callCount).toBe(1);
        done();
      }, 150);
    });
  });
});
