import { join } from "path";
import dotenv from "dotenv";

import { run } from "./run";

enum Apps {
  bg = "blog",
  sb = "storybook",
}

enum Actions {
  dev = "development",
  b = "build",
  r = "release",
  s = "serve",
  repl = "repl",
}

enum Branchs {
  DEV = "dev",
  MASTER = "master",
  GHPAGES = "gh-pages",
}

const APP_ENVS = (app: string, action: string) => {
  const result = dotenv.config({
    path: join(__dirname, "../src-app/", app, ".env"),
  });

  const env = { ...result.parsed, APP: app };

  switch (action) {
    case Actions.dev: {
      return {
        ...env,
        BRANCH: Branchs.DEV,
      };
    }
    case Actions.r: {
      return {
        ...env,
        BRANCH: app === Apps.bg ? Branchs.MASTER : Branchs.GHPAGES,
      };
    }
    default: {
      return { ...env };
    }
  }
};

(() => {
  const apps: string[] = [Apps.bg, Apps.sb];
  const actions: string[] = [Actions.dev, Actions.b, Actions.r];

  const app = Apps[process.argv[2] as keyof typeof Apps] || apps[0];
  const action = Actions[process.argv[3] as keyof typeof Actions] || actions[0];

  const envs = APP_ENVS(app, action);
  console.log({ ...envs, ACTION: action });

  run(action, { ...envs });
})();
