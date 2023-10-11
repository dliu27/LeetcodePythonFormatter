# LeetcodePythonFormatter

A working and least effort (in my eyes) solution for formatting Python code in Leetcode. 

Story: I wanted to create a Python formatter for Leetcode, as it's not a feature and no one has done it before (lack of JS libraries)

Involves a Chrome Extension that adds a hotkey (CTRL-ALT-F) to Leetcode.com. Upon clicking the hotkey, the Chrome Extension will send a POST request to a Flask API hosted on the cloud, with the body being the Python code in the Leetcode.com editor. This Flask API will take the code submitted and return a JSON response containing the formatted code using ```autopep8```. The Chrome Extension will receive the code and replace the contents of the Leetcode.com editor with the formatted code.

There's also a hotkey (CTRL-SHIFT-E) for clearing the Leetcode.com instantly so you don't see your previous answers.

## Why does the solution need to include an asnyc API?
To my knowledge, there's no easier way to do this for a couple of reasons:

1. No JS libraries for formatting Python code. 
2. Can't run Python code from a Chrome Extension content script, due to CSP and the Chrome Extension runtime environment.

## How do I run it?

### Host Flask API on cloud

I removed my API URL from the code. My API was hosted on PythonAnywhere for free. You can follow this guide to set up a Flask app in PythonAnywhere: https://medium.com/swlh/how-to-host-your-flask-app-on-pythonanywhere-for-free-df8486eb6a42

The Flask API code is here in this repository: [```python_flask_formatter.py```](https://github.com/dliu27/LeetcodePythonFormatter/blob/main/python_flask_formatter.py)

All the CORS and JSON stuff should be handled for you.

If you have it running and navigate to 'https://YOURSITEURL.pythonanywhere.com/format' you should see:

![image](https://github.com/dliu27/LeetcodePythonFormatter/assets/48995019/118514f4-d277-4d94-a6c4-25cf9f36d922)

Once you have this ready, replace ```const apiUrl = ''``` with your API URL (https://YOURSITEURL.pythonanywhere.com/format) in this file: https://github.com/dliu27/LeetcodePythonFormatter/blob/main/LeetcodePythonFormatterExtension/payload/formatScript.js#L35C42-L35C51

### Add Chrome Extension to Chrome

1. Download this repo as a ZIP and unzip it
2. Open Google Chrome and go to ```chrome://extensions/```
3. At the top right, turn on Developer mode
4. Click Load unpacked
5. Find and select extension folder (LeetcodePythonFormatterExtension, one level above manifest.json)
6. Go to leetcode.com, open Developer Tools (CTRL+SHIFT+I) and verify the console says 'Content script loaded.' indicating the Chrome Extension loaded successfully


