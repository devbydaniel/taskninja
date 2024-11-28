#!/bin/sh
# Wrap task commands with the verbose=no setting
alias task='task rc.verbose=no'

# Start the Astro application
node ./dist/server/entry.mjs
