document.addEventListener('DOMContentLoaded', function() {
    const folderPicker = document.getElementById('folder-picker');
    const chooseFolderBtn = document.getElementById('choose-folder');
    const selectedFolder = document.getElementById('selected-folder');
    const skillsInput = document.getElementById('skills-input');
    const filterBtn = document.getElementById('filter-button');
    const loading = document.getElementById('loading');
    const resultsContainer = document.getElementById('results-container');
    let currentFolderPath = '';

    // Folder selection
    chooseFolderBtn.addEventListener('click', function() {
        folderPicker.click();
    });

    folderPicker.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            currentFolderPath = e.target.files[0].webkitRelativePath.split('/')[0];
            selectedFolder.value = currentFolderPath;
        }
    });

    // Filter CVs
    filterBtn.addEventListener('click', async function() {
        currentFolderPath = selectedFolder.value.trim();
        const skills = skillsInput.value.trim().toLowerCase();
        
        if (!currentFolderPath) {
            showError('Please select a folder first');
            return;
        }
        if (!skills) {
            showError('Please enter skills to search for');
            return;
        }
        
        loading.style.display = 'block';
        resultsContainer.innerHTML = '';
        filterBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:5000/filter_cvs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skill: skills,
                    folderPath: currentFolderPath
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            showResults(data.results);
        } catch (error) {
            showError(error.message);
        } finally {
            loading.style.display = 'none';
            filterBtn.disabled = false;
        }
    });

    function showResults(results) {
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-circle-xmark"></i>
                    <div>No matching CVs found</div>
                </div>
            `;
            return;
        }
        
        results.forEach(function(file) {
            const div = document.createElement('div');
            div.className = 'result-item';
            
            const filePath = `${currentFolderPath}/${file}`.replace(/\\/g, '/');
            const fileExtension = file.split('.').pop().toLowerCase();
            
            let fileIcon = 'fa-file-alt';
            if (fileExtension === 'pdf') fileIcon = 'fa-file-pdf';
            else if (fileExtension === 'docx') fileIcon = 'fa-file-word';
            
            div.innerHTML = `
                <div class="file-info">
                    <i class="fas ${fileIcon} file-icon"></i>
                    <span class="file-name">${file}</span>
                </div>
                <div class="action-buttons">
                    <button class="open-btn" data-path="${filePath}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="show-path-btn" data-path="${filePath}">
                        <i class="fas fa-copy"></i> Path
                    </button>
                </div>
            `;
            resultsContainer.appendChild(div);
        });

        // Add event listeners to open buttons
        document.querySelectorAll('.open-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const fullPath = this.getAttribute('data-path');
                openFile(fullPath);
            });
        });

        // Add event listeners to path buttons
        document.querySelectorAll('.show-path-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const fullPath = this.getAttribute('data-path');
                navigator.clipboard.writeText(fullPath).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                });
            });
        });
    }

    function openFile(filePath) {
    // Method 1: Try direct file opening (works in some environments)
    try {
        const formattedPath = formatPathForOS(filePath);
        const link = document.createElement('a');
        link.href = `file:///${formattedPath}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
    } catch (e) {
        console.log("Direct open failed, trying next method");
    }

    // Method 2: Try launching via the Python backend
    fetch('http://localhost:5000/open_file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: filePath })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
    })
    .catch(error => {
        // Method 3: Final fallback - copy path to clipboard
        console.error("All methods failed:", error);
        copyToClipboardWithFeedback(filePath);
    });
}

function formatPathForOS(path) {
    // Convert path to OS-specific format
    if (navigator.platform.includes('Win')) {
        return path.replace(/\//g, '\\');
    }
    return path;
}

function copyToClipboardWithFeedback(text) {
    navigator.clipboard.writeText(text).then(() => {
        showTemporaryMessage('Path copied to clipboard: ' + text);
    }).catch(err => {
        showError('Failed to copy path: ' + err.message);
    });
}

function showTemporaryMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'temp-message';
    msgDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
}

    function showError(message) {
        resultsContainer.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle"></i> ${message}
            </div>
        `;
    }
});