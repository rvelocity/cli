import fs from "fs";
import { createRequire } from "module";
import fetch from "node-fetch";
// import path from "path";
import { logger } from "./logger.js";

// Dynamically import package.json using createRequire
const require = createRequire(import.meta.url);

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
    logger(`Error writing file at ${filePath}: ${error}`, "red");
    process.exit(1);
  }
}

/**
 * Utility function to move a file from one location to another
 * @param {string} sourcePath - The current file path
 * @param {string} destinationPath - The new file path
 */
export function moveFile(sourcePath, destinationPath) {
  try {
    // Ensure the destination directory exists
    const destinationDir = require("path").dirname(destinationPath);
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    // Move the file
    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    logger(
      `Error moving file from ${sourcePath} to ${destinationPath}: ${error}`,
      "red"
    );
    process.exit(1); // Exit the process if there is an error
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
    logger(`Error reading template at ${templatePath}: ${error}`, "red");
    process.exit(1); // Exit the process if there is an error
  }
}

/**
 * Utility function to download files
 * @param {string} url - Url to fetch file
 * @param {string} destination - Path to write downloaded file
 */
export async function downloadFile(url, destination) {
  const response = await fetch(url);
  const data = await response.text();
  writeFile(destination, data);
}

// Locally copy folder from source to destination
/*
export function copyFolderRecursiveSync(source, target) {
  const targetFolder = target;
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    let files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      const curTarget = path.join(targetFolder, file);

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}
*/
