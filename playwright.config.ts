import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

if (process.env.ENVIRONMENT) {
  console.log("Environment: ", process.env.ENVIRONMENT);
  config({
    path: `.env.${process.env.ENVIRONMENT}`,
    override: true,
  });
} else {
  config({ override: true });
}

export default defineConfig({
  testDir: "./e2e/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    video: "off",
  },

  projects: [
    {
      name: "chrome-tests",
      use: {
        ...devices["Desktop Chrome"],
        video: "retain-on-failure",
        viewport: null,
        deviceScaleFactor: undefined, // Elimina el factor de escala del dispositivo
        isMobile: undefined, // Elimina la configuración de dispositivo móvil si existe
        hasTouch: undefined, // Eliminala configuración de dispositivo táctil si existe
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
  ],
});
