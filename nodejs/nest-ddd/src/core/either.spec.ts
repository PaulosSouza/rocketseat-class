import { Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  }

  return left("error");
}

test("success result", () => {
  const result = doSomething(true);

  expect(result.isRight()).toBeTruthy();
  expect(result.isLeft()).toBeFalsy();
});

test("error result", () => {
  const failureResult = doSomething(false);

  expect(failureResult.isLeft()).toBeTruthy();
  expect(failureResult.isRight()).toBeFalsy();
});
