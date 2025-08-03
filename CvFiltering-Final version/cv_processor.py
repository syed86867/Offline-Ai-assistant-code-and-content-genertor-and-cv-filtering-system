import os
import time
import pdfplumber
from docx import Document

def extract_text(file_path):
    """Optimized text extraction with error handling"""
    try:
        if file_path.endswith('.pdf'):
            with pdfplumber.open(file_path) as pdf:
                return " ".join(page.extract_text() for page in pdf.pages)
        elif file_path.endswith('.docx'):
            doc = Document(file_path)
            return " ".join(para.text for para in doc.paragraphs)
        elif file_path.endswith('.txt'):
            with open(file_path, 'r', encoding='utf-8') as f:
                return f.read()
        return ""
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return ""