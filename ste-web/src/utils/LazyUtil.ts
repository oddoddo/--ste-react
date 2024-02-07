import { lazy, ComponentType } from "react";

export const retryLazy = <T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) =>
  lazy(async () => {
    const pageAlreadyRefreshed = JSON.parse(
      window.localStorage.getItem("pageRefreshed") || "false"
    );
    try {
      const module = await componentImport();
      const component = module.default;
      window.localStorage.setItem("pageRefreshed", "false");
      return { default: component };
    } catch (error) {
      if (!pageAlreadyRefreshed) {
        window.localStorage.setItem("pageRefreshed", "true");
        window.location.reload();
      }
      throw error;
    }
  });
