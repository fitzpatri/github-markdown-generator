const fs = require('fs').promises;
const path = require('path');

async function readMarkdownFilesFromDirectory(directory) {
  try {
    const files = await fs.readdir(directory);
    const markdownFiles = files.filter(file => file.endsWith('.md') && file.toLowerCase() !== 'readme.md');
    return markdownFiles;
  } catch (error) {
    console.error('Error reading directory', error);
    return [];
  }
}

async function concatenateMarkdownFiles(directory, files) {
  let concatenatedContent = '';

  for (const file of files) {
    try {
      const filePath = path.join(directory, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      concatenatedContent += `# ${file}\n\n${fileContent}\n\n`;
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return concatenatedContent;
}

async function writeToFile(filename, content) {
  try {
    await fs.writeFile(filename, content);
    console.log(`Combined Markdown file ${filename} has been created.`);
  } catch (error) {
    console.error(`Error writing to file ${filename}:`, error);
  }
}

async function concatenateLocalMarkdownFiles() {
  const directory = './output'; // Replace with your directory path
  const files = await readMarkdownFilesFromDirectory(directory);
  const concatenatedContent = await concatenateMarkdownFiles(directory, files);
  await writeToFile('./output-combined/combined-markdown.md', concatenatedContent);
}

concatenateLocalMarkdownFiles().catch(error => console.error('Error running script:', error));
