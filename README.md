# AI-Based Indian Standards Recommendation System

## Smart India Hackathon Project

An AI-assisted system that analyzes product descriptions, technical specifications, and tender documents to recommend relevant Indian Standards (IS), allied standards, latest versions, amendments, and applicable certification requirements.

---

## Problem

Finding the correct Indian Standard for a product can require searching through large numbers of standards, references, amendments, testing standards, safety standards, and certification requirements.

Traditional keyword-based search may fail when the product description uses different terminology from the official standard.

This project uses semantic understanding to identify relevant standards and provide structured recommendations.

---

## Key Features

* Product description analysis
* Technical specification analysis
* Tender document upload
* PDF/DOCX/TXT document extraction
* Semantic standard recommendation
* Keyword-based fallback
* Primary Indian Standard identification
* Allied standard identification
* Normative references
* Test-method standards
* Safety standards
* Installation standards
* Related product standards
* Latest published/reaffirmed version information
* Amendment information
* BIS Product Certification information
* CRS information
* QCO information
* Certification applicability
* Tender-ready recommendation output

---

## Current Product Categories

The initial implementation focuses on three categories:

### 1. Electrical

Examples:

* Cables
* Wires
* Electrical products

### 2. Plumbing

Examples:

* uPVC pipes
* Potable-water piping products

### 3. Lighting

Examples:

* LED luminaires
* Street lighting
* Flood lighting

The architecture is designed so additional categories can be added without changing the core recommendation engine.

---

## System Architecture

```text
                    USER
                     |
                     v
        Product / Specification / Tender
                     |
                     v
              Document Parser
                     |
                     v
              Text Extraction
                     |
                     v
           Semantic Embedding Model
                     |
                     v
             Vector Retrieval
                     |
                     v
             Standards Registry
                     |
          +----------+----------+
          |          |          |
          v          v          v
       Primary    Allied      Certification
       Standard   Standards   requirements
          |          |          |
          +----------+----------+
                     |
                     v
             Recommendation
                     |
                     v
               Frontend UI
```

---

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Backend

* Python
* FastAPI
* Pydantic

### AI / Semantic Search

* Sentence Transformers
* ChromaDB
* Embeddings
* Retrieval-based recommendation

### Database

* SQLite for development
* SQLAlchemy ORM

### Document Processing

* PDF extraction
* DOCX extraction
* TXT/Markdown processing

---

## Project Structure

```text
SIH_Hackathon_Techie_Misfits/
│
├── ai/
│   ├── README.md
│   ├── agent.py
│   ├── config.py
│   ├── embeddings/
│   ├── pipeline/
│   └── vectorstore/
│
├── backend/
│   ├── README.md
│   └── app/
│       ├── main.py
│       ├── api/
│       ├── schemas/
│       └── services/
│
├── database/
│   ├── README.md
│   ├── db.py
│   ├── models.py
│   └── SeedScript.py
│
├── frontend/
│   ├── README.md
│   └── project_frontend/
│
├── docs/
│   └── README.md
│
└── requirements.txt
```

---

## Running the Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn backend.app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Running the Frontend

Navigate to:

```text
frontend/project_frontend
```

Install dependencies:

```bash
npm install
```

Start:

```bash
npm run dev
```

---

## Main API

### Analyze Product Specification

```text
POST /api/recommend/analyze
```

Input:

```text
Product description
Technical specification
Tender text
```

Optional:

```text
PDF
DOCX
TXT
```

Output includes:

```text
Primary Indian Standard
Confidence
Latest version
Amendments
Allied standards
Certification requirements
QCO information
Reason for recommendation
```

---

## Important Design Principle

The AI should identify candidate standards through semantic understanding.

Official standard metadata and statutory requirements should come from the structured standards registry.

Therefore:

```text
AI
=
Semantic Understanding

Database
=
Verified Standards Metadata

Application
=
Decision + Presentation Layer
```

This separation improves scalability, auditability, and reliability.

---

## Future Scope

* More Indian Standard categories
* Automated BIS data synchronization
* Official-source evidence/citations
* PostgreSQL migration
* Production vector database
* User authentication
* Audit logs
* Advanced tender clause generation
* Standard comparison
* Multi-language input
* Confidence-based human verification
