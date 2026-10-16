import { useGlobalAuthenticationStore } from "@/core/store/data";
import { renderWithProviders } from "@/test/render";

function AuthProbe() {
  const name = useGlobalAuthenticationStore((state) => state.name);
  return <span>{name}</span>;
}

describe("renderWithProviders", () => {
  it("seeds the auth store and restores it when unmounted", () => {
    const originalName = useGlobalAuthenticationStore.getState().name;
    const view = renderWithProviders(<AuthProbe />, {
      authUser: {
        address: "test-wallet",
        name: "Test User",
      },
    });

    expect(view.getByText("Test User")).toBeInTheDocument();

    view.unmount();

    expect(useGlobalAuthenticationStore.getState().name).toBe(originalName);
  });
});
