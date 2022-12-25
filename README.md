### Hexlet tests and linter status:

[![Actions Status](https://github.com/SuperSnowSnail/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/SuperSnowSnail/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/8745d1ac5b722895c4ca/maintainability)](https://codeclimate.com/github/SuperSnowSnail/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8745d1ac5b722895c4ca/test_coverage)](https://codeclimate.com/github/SuperSnowSnail/frontend-project-46/test_coverage)
[![CI Status](https://github.com/SuperSnowSnail/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/SuperSnowSnail/frontend-project-46/actions/workflows/gendiff.yml)

## GenDiff

**GenDiff - cli-app that compares two configuration files and shows a difference in one of three formats (stylish, plain, json).**

### Install

```bash
git clone https://github.com/SuperSnowSnail/frontend-project-46.git
cd frontend-project-46
make install
npm link # (You may need sudo)
```

### Modes:

#### Default:

By default GenDiff generate differences in stylish format.

##### Compare JSON files

```bash
gendiff path/to/file1.json path/to/file2.json
```

##### Demo:

[![asciicast](https://asciinema.org/a/bk9fSw4XzqhT5VbguuQS5zhzp.svg)](https://asciinema.org/a/bk9fSw4XzqhT5VbguuQS5zhzp)

##### Compare YAML files

```bash
gendiff path/to/file1.yaml path/to/file2.yml # (Supports both .yml and .yaml files)
```

##### Demo:

[![asciicast](https://asciinema.org/a/VlFHl2kItaRVlkHNAzh5dlZXW.svg)](https://asciinema.org/a/VlFHl2kItaRVlkHNAzh5dlZXW)
