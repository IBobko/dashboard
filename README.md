# Project Name

This project is composed of a frontend and backend. The frontend is developed in ReactJS and the backend in Python.

## Directory Structure

The directory structure of the project is as follows:

- **frontend**: This directory contains all the frontend code written in React.
- **backend**: This directory contains all the backend code written in Python.

## Getting Started

### Prerequisites

Before running this project, you should have the following installed:
- Node.js and npm
- Python
- Any required Python libraries

### Running the Frontend

To start the frontend, navigate to the `frontend` directory and use the following command:

```bash
npm start
```

### Running the Backend

To start the `backend`, navigate to the backend directory and use the following command:
```bash
python start.py
```
This command will start the Python backend.

### Additional Notes

To see the directory structure of the project excluding certain directories such as .git, node_modules, venv, and .idea, you can use the following command:
```bash
find .  -not -path "*.git*" -not -path "*node_modules*" -not -path "*venv*" -not -path "*.idea*"
```

