require('dotenv').config();

const axios = require('axios');
const fs = require('fs').promises;
const githubToken = process.env.GITHUB_TOKEN;
const fetchConfig = require('./fetch-config.js');

async function fetchFilesFromDirectory(owner, repo, path = '', branch = 'main') {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const headers = {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  };

  try {
    const response = await axios.get(url, headers);
    console.log('Repository data fetched successfully');

    let files = [];
    for (const file of response.data) {
      if (file.type === 'dir' && (file.path === 'node_modules' || file.path === 'dist' || file.path.startsWith('.'))) {
        continue;
      }

      extension = file.path.split('.').pop().toLowerCase(); // Extract and convert to lower case for case-insensitivity
      if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'svg' || extension === 'ico') {
        continue;
      }

      if (extension === 'ttf' || extension === 'woff' || extension === 'woff2' || extension === 'eot') {
        continue;
      }

      console.log(`Processing file with path "${file.path}" and type "${file.type}"`);

      if (file.type === 'dir') {
        console.log(`Entering directory: ${file.path}`);
        const subDirectoryFiles = await fetchFilesFromDirectory(owner, repo, file.path, branch);
        files = files.concat(subDirectoryFiles);
      } else {
        files.push(file);
      }
    }

    return files;
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

      // TODO: Handle file content that's an object (e.g. JSON)
      // Current output renders as: [object Object]
      if (extension === 'json') {
        // Convert object to formatted JSON string
        fileContent = JSON.stringify(fileContent, null, 2);
      }

      const fileType = fileTypeMappings[extension] || ''; // Default to an empty string if the extension is not in the mappings
      markdownContent += markdownTemplate(file.path, fileType, fileContent);
    }
  }

  return markdownContent;
}

async function generateFileList(files) {
  let fileList = '';

  for (const file of files) {
    fileList += `${file.path}\n`;
  }

  return fileList;
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

fetchFilesFromDirectory(fetchConfig.owner, fetchConfig.repo, '', fetchConfig.branch)
  .then(files => {
    console.log('Files fetched:', files.map(file => file.path));
    return Promise.all([
      generateMarkdown(files).then(markdown => writeToFile(
        './output/content/' + fetchConfig.output.filename + '.md',
        markdown
      )),
      generateFileList(files).then(fileList => writeToFile(
        './output/filelist/' + fetchConfig.output.filename + '.txt',
        fileList
      )),
    ])
  })
  .catch(error => console.error('Error running script:', error));