import yargs from "yargs";

import { init, createPost, listPosts } from "./postbook";

export const cli = () => {
  const y = yargs
    .scriptName("pb")
    .usage("$0 <cmd> [args]")
    .help()
    .alias("h", "help")
    .epilog("copyright 2019");

  y.command({
    command: "init",
    describe: "Cli Init",
    handler: () => {
      init();
    },
  });

  y.command({
    command: "create [title]",
    describe: "Create Post",
    aliases: "add",
    builder: (yargs: any) =>
      yargs.options({
        t: {
          alias: "template",
          type: "string",
          describe: `Add template`,
        },
      }),
    handler: (argv: any) => {
      createPost({
        title: argv.title,
        template: argv.template,
      });
    },
  });

  const argv = y.argv;
  const cmd = argv._[0];

  if (!cmd) {
    listPosts();
  }
};