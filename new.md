Of course. Here is the corrected `README.md` file that reflects the project structure where both `app.py` and the `data` folder are inside the `RAG` directory.

---

# **Ollama AI Workbench**

A powerful, self-hosted web application that leverages local AI models via Ollama to generate code, create content, and intelligently analyze resumes (RAG) — all running completely offline on your machine.

## **🌟 Features**

*   **Code Generation:** Generate complete, commented code snippets in multiple programming languages using the `starcoder2:3b` model.
*   **Content Creation:** Write blogs, articles, and marketing copy using various models like `llama3`, `mistral`, and `tinyllama`.
*   **Resume RAG Agent:** An intelligent Retrieval-Augmented Generation system that allows you to query and analyze a collection of resumes from a local folder.
*   **100% Offline & Private:** All AI processing happens locally on your machine. No data is sent to the cloud.
*   **Modern Web Interface:** A clean, responsive glass-morphism UI for a great user experience.

---

## **📋 Prerequisites & Installation**

Before running this application, you must install the following software and models.

### **1. XAMPP Server**
This application is designed to run on the Apache web server.
*   **Download & Install:** [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
*   **Installation Path:** Default is `C:\xampp\` on Windows.

### **2. Ollama**
This is the core engine that runs the AI models locally.
*   **Download & Install:** [https://ollama.com/](https://ollama.com/)
*   **Installation:** Download the installer for your OS (Windows/macOS/Linux) and run it.

### **3. Python 3.8+**
Required to run the backend server for the RAG functionality.
*   **Download & Install:** [https://www.python.org/downloads/](https://www.python.org/downloads/)
*   **Important:** During installation, **CHECK THE BOX** that says **"Add Python to PATH"**.

### **4. Pull Required AI Models**
Open your terminal (Command Prompt, PowerShell, or Bash) and run the following commands **one by one**. This will download the models to your computer.

```bash
# Model for Code Generation (Essential)
ollama pull starcoder2:3b

# Models for Content Writing (Pull at least one)
ollama pull llama3:8b
ollama pull mistral:7b
ollama pull tinyllama

# Model for the RAG System's Embeddings (Essential for Resume Agent)
ollama pull nomic-embed-text
```

**Note:** Downloading these models will take time and require significant disk space (several GBs).

### **5. Install Python Libraries for RAG**
The Resume RAG Agent requires additional Python libraries. Open a terminal **as Administrator** and run:

```bash
pip install flask flask-cors ollama requests faiss-cpu
```

**For PDF Text Extraction (Choose one):**
```bash
# Option 1: Recommended (More reliable)
pip install pymupdf

# Option 2: Alternative
pip install PyPDF2

# For DOCX files (Required if you have .docx resumes)
pip install python-docx
```

---

## **🚀 How to Run the Application**

Follow these steps carefully to set up and run the project. You will need to open **two separate command prompt windows**.

### **Step 1: Start the Servers**

1.  **Start XAMPP Control Panel.**
2.  Click the **'Start'** button next to **Apache**.
3.  (Optional) If you need a database later, you can also start **MySQL**.

### **Step 2: Place the Project Folder**

1.  Extract or clone this project repository.
2.  Copy the entire project folder (e.g., `ollama-workbench`) into your XAMPP's `htdocs` directory.
    *   **Default Path:** `C:\xampp\htdocs\ollama-workbench\`

### **Step 3: Start the Ollama Service (CMD Window 1)**

The Ollama service must be running in the background. **Open your first Command Prompt window.**

*   If the Ollama desktop app is running (you can see its icon in the system tray), it is already working.
*   **To manage it via command line, run:**
    ```bash
    # This will start the Ollama server in the foreground.
    # Keep this window open. Press Ctrl+C to stop it.
    ollama serve
    ```

### **Step 4: Start the Python Backend for RAG (CMD Window 2)**

**The Python server for the RAG agent must be run from inside the `RAG` folder.** **Open a second Command Prompt window.**

1.  Navigate to the `RAG` folder inside your project directory:
    ```bash
    cd C:\xampp\htdocs\ollama-workbench\RAG
    ```
2.  Run the Python backend server from this location:
    ```bash
    python app.py
    ```
3.  **Keep this terminal window open.** You should see a message: `* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)`.

### **Step 5: Prepare Resume Data**

1.  **The `data` folder for resumes is already inside the `RAG` folder.**
2.  Place your PDF or DOCX resume files inside the `C:\xampp\htdocs\ollama-workbench\RAG\data\` folder.
3.  You can click the **"Reload Resumes"** button on the RAG web page to process them.

### **Step 6: Access the Web Application**

1.  Open your web browser (Chrome, Firefox, etc.).
2.  Go to: **`http://localhost/ollama-workbench/`**
    *   (Replace `ollama-workbench` with the exact name of your project folder).

---


**CRITICAL NOTE:** The Python server `app.py` must be run from inside the `RAG/` folder for it to correctly find the `data/` directory and the `rag_processor.py` module.

---

## **⚠️ Troubleshooting & Common Issues**

*   **"Couldn't connect to Ollama" / "Error in Generation"**
    *   Ensure the Ollama server is running in your first CMD window (`ollama serve`).
    *   Verify you've pulled the correct model names using `ollama list`.

*   **Python Server won't start (`app.py`) or shows ModuleNotFound errors**
    *   **Are you running it from the correct folder?** You MUST run `python app.py` from inside the `RAG/` directory. Double-check your current path in the command prompt.
    *   Check that Python is installed and added to PATH. Test with `python --version`.
    *   Ensure you installed all required libraries (`pip install flask flask-cors ollama requests faiss-cpu pymupdf`).

*   **RAG Agent doesn't find resumes**
    *   Place your resume files inside `ollama-workbench/RAG/data/`.
    *   Click the **"Reload Resumes"** button on the RAG page.


*   **Port 5000 already in use?**
    *   The Python server uses port 5000. If another program is using it, you can change the port in `RAG/app.py` (last line) to something else like `port=5001`. You will then need to update the `fetch` calls in `RAG/rag.html`.


---


