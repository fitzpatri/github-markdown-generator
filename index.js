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

  const markdownTemplate = (filePath, fileType, content) => {
    let formattedContent = `\n## ${filePath}:\n`;
    formattedContent += '```' + fileType + '\n';
    formattedContent += content;
    formattedContent += '\n```\n';
    return formattedContent;
  };

  for (const file of files) {
    // Skip specific directories
    if (file.type === 'dir' && (file.path === 'node_modules' || file.path === 'dist' || file.path.startsWith('.'))) {
      continue;
    }

    console.log(`Processing file with path "${file.path}" and type "${file.type}"`);

    if (file.type === 'file') {
      const response = await axios.get(file.download_url);
      const fileContent = response.data;
      const fileTypeMappings = {
        'js': 'js',
        'html': 'html',
        'css': 'css',
        'txt': 'txt',
        'md': 'md',
        'json': 'json', // Mapping for JSON files
        // ... add more mappings as needed
      };
      const extension = file.path.split('.').pop().toLowerCase(); // Extract and convert to lower case for case-insensitivity

      console.log(`File extension: ${extension}`);
      console.log(``);

      // Check if the content is JSON
      let isJson = false;
      try {
        JSON.parse(fileContent);
        isJson = true;
      } catch (e) {
        isJson = false;
      }

      // TODO: FILE CONTENT IS NOT JSON

      // Format JSON content
      if (isJson) {
        const formattedJson = JSON.stringify(JSON.parse(fileContent), null, 2);
        console.log('JSON file detected. Formatting content...', formattedJson);
        markdownContent += markdownTemplate(file.path, 'json', formattedJson);
      } else {
        const fileType = fileTypeMappings[extension] || ''; // Default to an empty string if the extension is not in the mappings
        markdownContent += markdownTemplate(file.path, fileType, fileContent);
      }
    }
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