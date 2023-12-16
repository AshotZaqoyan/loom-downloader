# Loom Video Downloader

## Overview

This simple application allows you to download videos from Loom using Vite, a fast web development build tool.

## Prerequisites

Before you start, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/loom-video-downloader.git
    ```

2. Change into the project directory:

    ```bash
    cd loom-video-downloader
    ```

3. Install the project dependencies:

    ```bash
    npm install
    ```

## Usage

1. Update the `config.js` file with your Loom API key. You can obtain your API key from the Loom dashboard.

2. Run the development server:

    ```bash
    npm run dev
    ```

3. Open your browser and navigate to [http://localhost:5173](http://localhost:5173/).

4. Enter the Loom video URL and click the "Download" button.

## Build

If you want to build the application for production, use the following command:

```bash
npm run build
```

This will generate a `dist` directory containing the optimized production build.

## Preview

To preview the production build locally, use the following command:

```bash
npm run preview
```

Open your browser and navigate to the provided URL.

## License

This project is licensed under the [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/).