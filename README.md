# GitHub Markdown Generator

## Overview

The GitHub Markdown Generator includes two Node.js scripts designed for different purposes: one to fetch files from a GitHub repository and generate a comprehensive Markdown document, and another to concatenate local Markdown files into a single document. These scripts are useful for documentation, feeding AI, code reviews, or archiving content.

## Features

- **GitHub Content Fetching and Markdown Generation (`generate-markdown.js`):**
  - Fetches all files, including those in subdirectories, from a specified GitHub repository.
  - Excludes specific directories (e.g., `node_modules`, `dist`) and certain file types.
  - Generates a Markdown file with the content of each file in the repository.
  - Creates a list of all files in the repository.
  - Supports various file types with appropriate Markdown formatting.
  - Uses a GitHub Personal Access Token for increased rate limits and access to private repositories.

- **Local Markdown File Concatenation (`concatenate-local-markdown.js`):**
  - Reads all Markdown files from a specified local directory.
  - Concatenates these files into a single Markdown file.
  - Excludes `README.md` to prevent duplication.

## Installation

Ensure you have Node.js installed on your system. Then, follow these steps:

1. Clone the repository containing the scripts, or download the script files to your local machine.
2. Navigate to the script's directory and run the command `npm install` to install necessary dependencies.
3. Create a `.env` file in the root of the script's directory with your GitHub Personal Access Token for `generate-markdown.js`:

   ```env
   GITHUB_TOKEN=your_personal_access_token_here
   ```

## Usage

### For GitHub Content Fetching and Markdown Generation:

1. Set up your `.env` file with the GitHub Personal Access Token.
2. Run the script using Node.js and specify the owner and repository name:

   ```bash
   node generate-markdown.js
   ```

This will generate two files:
   - `output/ralph-module-cms-json-container-files-content.md`: Contains the content of all files from the repository.
   - `output/ralph-module-cms-json-container-files-list.txt`: A list of all processed files.

### For Local Markdown File Concatenation:

1. Specify the directory path containing the Markdown files in `concatenate-local-markdown.js`.
2. Run the script:

   ```bash
   node concatenate-local-markdown.js
   ```

This will create a file named `output-combined/combined-markdown.md` containing the concatenated content.

## Configuration

- Modify the list of excluded directories and file types in `generate-markdown.js`.
- Adjust the file type mappings and Markdown template in `generate-markdown.js` for different file types.
- Change the directory path in `concatenate-local-markdown.js` to point to your local Markdown files.

## Notes

- The `generate-markdown.js` script uses the GitHub API; ensure that your token has the correct permissions.
- The scripts may take some time to process all files, especially for large repositories or directories.
- Keep your GitHub Token secure and never commit it to version control.

## Contributing

Contributions to the GitHub Markdown Generator are welcome. Please submit a pull request or open an issue for improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
