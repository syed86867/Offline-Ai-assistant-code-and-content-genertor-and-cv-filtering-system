# **Offline AI Assistant**  
🚀 *Code Generator, Content Writer & CV Filtering System*  

A **100% offline** AI assistant powered by **Ollama** and local LLMs (TinyLlama, StarCoder2). Generate code, write content, and filter CVs—**no internet or cloud required!**  

**✨ Features**  
✅ **AI Code Generation** – Supports **15+ languages** (Python, JavaScript, Java, etc.) using **StarCoder2**  
✅ **Content Writing** – Blog posts, articles, and docs with **TinyLlama**  
✅ **CV Filtering** – Extract and search resumes (PDF/DOCX) for skills  
✅ **Privacy-First** – No API calls, no tracking, fully **self-hosted**  
✅ **Modern UI** – Clean, responsive, and user-friendly  

**⚙️ Tech Stack**  
- **Backend**: Python (Flask, pdfplumber, python-docx)  
- **Frontend**: HTML5, CSS3, JavaScript  
- **AI Models**: Ollama (StarCoder2:3b, TinyLlama)  
- **Local Execution**: Runs entirely on your machine  

**🚀 Quick Start**  

**1. Install Ollama**  
Download and install **[Ollama](https://ollama.com/)**  

**2. Pull Required Models**  

ollama pull starcoder2:3b
ollama pull tinyllama

**3. Start Ollama Server**  

ollama serve


**4. Set Up Python Backend**  
Install dependencies:  
```bash
pip install flask pdfplumber python-docx
```
Run the Flask server:  
```bash
python app.py
```

### **5. Launch the Web App**  
Open `index.html` in your browser.  

---

## **🌟 Why Use This?**  
✔ **No subscription fees**  
✔ **No data leaks** (everything stays on your PC)  
✔ **Fast & lightweight** (optimized for local use)  
✔ **Perfect for developers, writers, and recruiters**  

Try it now and experience **AI without the cloud!** 🚀
