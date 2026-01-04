
# NAMASTE ↔ ICD-11 Terminology Mapping Platform

# TRY LIVE : https://namasthe-icd11.vercel.app/

A comprehensive healthcare terminology mapping system that bridges traditional medicine (NAMASTE) with international medical classifications (ICD-11) using FHIR standards.

## Features
- Terminology Mapping: Maps NAMASTE codes to ICD-11 codes
- FHIR Compliance: Full compliance with FHIR R4 standards
- Web Interface: Modern UI for searching and browsing terminology
- Bundle Management: Creates and stores FHIR bundles with Patient, Encounter, and Condition resources
- Database Integration: MongoDB for persistent storage
- CSV Integration: Loads terminology data from CSV files

## Architecture
- Frontend: HTML/CSS/JavaScript with Tailwind CSS
- Backend: NestJS API server
- Database: MongoDB with Mongoose ODM
- Standards: FHIR R4, NAMASTE, ICD-11

## UI Components
- Dashboard: Overview with statistics and system flow
- Search & Mapping: Dual-panel interface for terminology lookup
- Terminology Explorer: Browse and filter terminology
- Bulk Mapping: CSV upload and processing
- About: Documentation and architecture details

## API Endpoints
- GET / - Dashboard UI
- GET /health - Health check
- GET /ValueSet/\$expand - Expand terminology valuesets
- POST /ConceptMap/\$translate - Translate between terminologies
- POST /Bundle - Save FHIR bundles
- GET /Bundle/:id - Retrieve specific bundle
- GET /Bundle - Retrieve all bundles

## Deployment

### Development
```bash
cd namaste-icd11-backend/namaste-icd11-backend/backend
npm install
npm run start:dev
