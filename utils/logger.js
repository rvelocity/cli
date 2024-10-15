import chalk from "chalk";

export const logger = (message, color) => {
  console.log(chalk[color](message));
};
