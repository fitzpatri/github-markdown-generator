# GitHub Markdown Generator

## Overview

The GitHub Markdown Generator is a Node.js script designed to fetch files from a specified GitHub repository and generate a comprehensive Markdown document containing the content of these files. It's particularly useful for documentation purposes, code reviews, or archiving the contents of a repository.

## Features

- Fetches all files from a given GitHub repository, including files in subdirectories.
- Excludes specific directories (e.g., `node_modules`, `dist`) and hidden files.
- Generates a Markdown file with the content of each file in the repository.
- Creates a list of all files in the repository.
- Supports various file types with appropriate Markdown formatting.
- Uses a GitHub Personal Access Token for increased rate limits and private repository access.

## Installation

Before you begin, ensure you have Node.js installed on your system. Then, follow these steps:

1. Clone the repository containing the script, or download the script files to your local machine.

2. Navigate to the script's directory and run the following command to install necessary dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the script's directory with your GitHub Personal Access Token:

    ```env
    GITHUB_TOKEN=your_personal_access_token_here
    ```

## Usage

To use the script, follow these steps:

1. Ensure your `.env` file is set up with your GitHub Personal Access Token.

2. Run the script using Node.js, specifying the owner and repository name:

    ```bash
    node index.js
    ```

3. The script will generate two files in the script's directory:
   - `complete-content.md`: Contains the content of all files from the repository.
   - `file-list.txt`: A list of all files processed.

## Configuration

You can customize the script to suit your needs:

- Modify the list of excluded directories in the `fetchFilesFromDirectory` function.
- Adjust the file type mappings and Markdown template in the `generateMarkdown` function for different file types.

## Notes

- The script uses the GitHub API; ensure that your GitHub Token has the correct permissions.
- For large repositories, the script may take some time to process all files.
- Keep your GitHub Token secure and never commit it to version control.

## Contributing

Contributions to the GitHub Markdown Generator are welcome. Please submit a pull request or open an issue if you have suggestions for improvements or bug fixes.

## License

This project is open source and available under the [MIT License](LICENSE).
