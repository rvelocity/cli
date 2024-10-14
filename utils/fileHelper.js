import fs from "fs";
import { logger } from "./logger.js";

/**
 * Utility function to safely create directories
 * @param {string} dirPath - Path to create directory
 */
export function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Utility function to write a file to disk
 * @param {string} filePath - The file path to write to
 * @param {string} content - The content to write to the file
 */
export function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, "utf8");
  } catch (error) {
    logger(`Error writing file at ${filePath}: ${error}`);
    process.exit(1);
  }
}

/**
 * Utility function to read template files
 * @param {string} templatePath - Path to the template file
 * @returns {string} - The template content
 */
export function readTemplate(templatePath) {
  try {
    return fs.readFileSync(templatePath, "utf8");
  } catch (error) {
    logger(`Error reading template at ${templatePath}: ${error}`);
    process.exit(1);
  }
}
