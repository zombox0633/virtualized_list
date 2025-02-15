import axios, { CancelTokenSource } from "axios";

export const createCancellableSource = (
  signal: AbortSignal,
  actionName: string,
): CancelTokenSource => {
  const source = axios.CancelToken.source();

  signal.addEventListener("abort", () => {
    source.cancel(generateCancelMessage(actionName));
  });

  return source;
};

export const generateCancelMessage = (serviceName: string): string => {
  return `${serviceName} request canceled by Redux.`;
};
