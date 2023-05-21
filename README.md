To obtain the directory structure of the project, you can use the following command:

```
find .  -not -path "*.git*" -not -path "*node_modules*" -not -path "*venv*" -not -path "*.idea*"
```

This command will list all the files and directories in the project directory, excluding the .git directory,
node_modules directory, venv directory, and .idea directory. It helps provide a clean and focused view of the project's
directory structure.

By running this command, you will get a clear overview of the project's organization and the files and directories it
contains. This can be useful for understanding the project layout, locating specific files, or analyzing the overall
project structure.

Feel free to modify the command based on your specific requirements or add any additional filtering options as needed.