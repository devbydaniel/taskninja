# TaskNinja

TaskNinja is a GUI frontend for [TaskWarrior](https://github.com/GothenburgBitFactory/taskwarrior), the CLI based task manager, with a minimalist design, keyboard shortcuts and optimized mobile layout.

> [!ATTENTION] Please notice
> TaskNinja required TaskWarrior v 2.x to work.
> I'm happy to accept PRs for making this more flexible.

> [!ATTENTION] Please also notice
> TaskNinja will modify your TaskWarrior database. Back up your data before using TaskNinja.

## Installation

TaskNinja can be easily installed through [Docker Compose](https://docs.docker.com/compose/):

```yml
services:
  taskninja:
    image: wh00pwh00p12369/taskninja:latest
    container_name: taskninja
    ports:
      - "4321:4321"
    environment:
      - TASKRC=/root/.taskrc
      - TASKDATA=/root/.task
      - TZ=UTC
    volumes:
      - path/to/your/taskFolder:/root/.task
      - path/to/your/taskrc:/root/.taskrc
```

## Configuration

### Data sources

TaskNinja expects environment variables for `TASKRC` and `TASKDATA`. You should mount your data folder and configuration file through volumes to the respective places.

### Reports

By default, TaskNinja will display the following reports:

- next
- ready
- list
- blocked
- blocking
- waiting"

If you want to display different report, you can pass an environment variable `REPORTS` to the container with a comma-separated list of the reports you want to see, for example `inbox,today,next,waiting,blocked`.

## Features

- Self hostable
- PWA (coming soon)
- Minimalist design
- Dark mode
- Customizable reports list
- Keyboard shortcuts
- HTTP endpoint for creating and modifying tasks

## Keyboard Shortcuts

| Key              | Action                                               |
| ---------------- | ---------------------------------------------------- |
| a                | Add new task                                         |
| number           | Navigate to the number-th report in the reports list |
| j, k, arrow keys | Select tasks in the task list                        |
| m                | Modify a task with a TaskWarrior command             |
| p                | Move a task to a different project                   |
| t                | Edit tags                                            |
| s                | Edit schedule and due date                           |
| Backspace        | Delete the task                                      |

## HTTP endpoints

While running, TaskNinja gives you basic HTTP endpoints for modifying your tasks.

Have a look at the `src/pages/api` folder to see what is available.

## License

MIT License

Copyright 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
