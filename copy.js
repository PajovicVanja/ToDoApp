const fs = require('fs');
const path = require('path');

const APP_FILE = 'App.tsx'; // Main App file
const SOURCE_DIR = 'src'; // The folder to scan
const OUTPUT_FILE = 'all_code.txt'; // Output file
const IGNORED_FOLDERS = ['styles']; // Folders to ignore

// Function to recursively get all files from a directory (excluding ignored folders)
const getAllFiles = (dirPath, arrayOfFiles = []) => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            const folderName = path.basename(filePath);
            if (!IGNORED_FOLDERS.includes(folderName)) {
                arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
};

// Function to copy all files into a text file
const copyAllCode = () => {
    let outputContent = '';

    // Include App.tsx if it exists
    if (fs.existsSync(APP_FILE)) {
        const appContent = fs.readFileSync(APP_FILE, 'utf-8');
        outputContent += `${APP_FILE}:\n\n${appContent}\n\n${'-'.repeat(80)}\n\n`;
    } else {
        console.warn(`⚠️ Warning: ${APP_FILE} not found, skipping...`);
    }

    // Include all files inside src/, except ignored folders
    if (fs.existsSync(SOURCE_DIR)) {
        const files = getAllFiles(SOURCE_DIR);
        files.forEach((file) => {
            const fileContent = fs.readFileSync(file, 'utf-8');
            const relativePath = path.relative('', file);
            outputContent += `${relativePath}:\n\n${fileContent}\n\n${'-'.repeat(80)}\n\n`;
        });
    } else {
        console.error(`Error: Source directory "${SOURCE_DIR}" does not exist.`);
    }

    // Write to the output file
    fs.writeFileSync(OUTPUT_FILE, outputContent, 'utf-8');
    console.log(`✅ Code copied successfully into "${OUTPUT_FILE}" (excluding ignored folders)`);
};

// Run the scriptd
copyAllCode();
