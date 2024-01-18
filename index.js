const axios = require('axios');
const fs = require('fs').promises;

async function fetchFilesFromRepo(owner, repo) {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/`;
    const response = await axios.get(url);
    console.log('Repository data fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Error fetching repository data', error);
    return [];
  }
}

async function generateMarkdown(files) {
  let markdownContent = '';

  for (const file of files) {
    if (file.type === 'dir' && file.path === 'node_modules') {
      continue;
    }

    if (file.type === 'dir' && file.path === 'dist') {
      continue;
    }

    if (file.type === 'dir' && file.path.startsWith('.')) {
      continue;
    }

    console.log(`Processing file with path ${file.path} and type ${file.type}`);

    if (file.type === 'file' && file.path.endsWith('.js')) {
      const fileContent = await axios.get(file.download_url);
      markdownContent += `\n## ${file.path}:\n`;
      markdownContent += '```js\n'; // Assuming JavaScript files; adjust accordingly
      markdownContent += fileContent.data;
      markdownContent += '\n```\n';markdownContent += ``
    }

    // if (file.type === 'dir') {
    //   const subFiles = await fetchFilesFromRepo('geins-io', 'ralph-module-gtm');
    //   markdownContent += await generateMarkdown(subFiles);
    // }
  }

  return markdownContent;
}

async function writeToFile(filename, content) {
    try {
        console.log(`Writing to file: ${filename}`);
        await fs.writeFile(filename, content);
        console.log(`Markdown file ${filename} has been created.`);
    } catch (error) {
        console.error(`Error writing to file ${filename}:`, error);
    }
}

fetchFilesFromRepo('geins-io', 'ralph-module-gtm')
  .then(files => generateMarkdown(files))
  .then(markdown => writeToFile('output.md', markdown));