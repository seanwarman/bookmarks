# Bookmarks Updater
Add this project into your bookmarks folder that contains *Bookmarks* and *Bookmarks.bak*.

Usually found under a dir called Default if you're using Chrome.

Do `yarn start` to start the pm2 daemon and it'll watch that folder for changes using git status.

Add the following to .zshrc or .bashrc...

```
yarn --cwd ~/path/to/Default start &> /dev/null
```

Do `yarn monit` and `yarn ps` to monitor the process or see it in a list format.
Do `yarn stop` to stop and delete the process.
