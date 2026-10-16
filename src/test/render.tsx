import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import {
  render,
  type RenderOptions,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useGlobalAuthenticationStore } from "@/core/store/data";

type AuthUser = {
  address: string;
  name: string;
  token?: string;
};

type Options = Omit<RenderOptions, "wrapper"> & {
  authUser?: AuthUser;
};

export function renderWithProviders(
  ui: ReactElement,
  { authUser, ...options }: Options = {},
) {
  const authenticationStore = useGlobalAuthenticationStore;
  const previousAuth = authenticationStore.getState();

  if (authUser) {
    authenticationStore.setState({
      address: authUser.address,
      name: authUser.name,
      token: authUser.token ?? "",
    });
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  function Wrapper({ children }: { children: ReactNode }) {
    useEffect(
      () => () => {
        if (authUser) {
          authenticationStore.setState({
            address: previousAuth.address,
            name: previousAuth.name,
            token: previousAuth.token,
          });
        }
        queryClient.clear();
      },
      [],
    );

    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    );
  }

  try {
    return render(ui, { wrapper: Wrapper, ...options });
  } catch (error) {
    queryClient.clear();
    if (authUser) {
      authenticationStore.setState({
        address: previousAuth.address,
        name: previousAuth.name,
        token: previousAuth.token,
      });
    }
    throw error;
  }
}
