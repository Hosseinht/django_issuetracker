"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import PersistAuth from "@/app/utils/PersistAuth";

const queryClient = new QueryClient();
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <PersistAuth /> {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
