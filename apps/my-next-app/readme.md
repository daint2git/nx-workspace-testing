# my next app

```bash
yarn nx test my-next-app --help 

# Options:
#   --codeCoverage          Indicates that test coverage information should be collected and reported in the output. (https://jestjs.io/docs/cli#--coverageboolean)
#   --config                The path to a Jest config file specifying how to find and execute tests. If no rootDir is set in the config, the directory containing the config file is assumed to be the rootDir for the project. This can also be a JSON-encoded value which Jest will use as configuration
#   --clearCache            Deletes the Jest cache directory and then exits without running tests. Will delete Jest's default cache directory. _Note: clearing the cache will reduce performance_.
#   --detectOpenHandles     Attempt to collect and print open handles preventing Jest from exiting cleanly (https://jestjs.io/docs/cli#--detectopenhandles)
#   --jestConfig            The path of the Jest configuration. (https://jestjs.io/docs/en/configuration)
#   --testFile              The name of the file to test.
#   --tsConfig              The name of the Typescript configuration file. Set the tsconfig option in the jest config file. 
#   --setupFile             The name of a setup file used by Jest. (use Jest config file https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)
#   --bail                  Exit the test suite immediately after `n` number of failing tests. (https://jestjs.io/docs/cli#--bail)
#   --ci                    Whether to run Jest in continuous integration (CI) mode. This option is on by default in most popular CI environments. It will prevent snapshots from being written unless explicitly requested. (https://jestjs.io/docs/cli#--ci)
#   --color                 Forces test results output color highlighting (even if stdout is not a TTY). Set to false if you would like to have no colors. (https://jestjs.io/docs/cli#--colors)
#   --findRelatedTests      Find and run the tests that cover a comma separated list of source files that were passed in as arguments. (https://jestjs.io/docs/cli#--findrelatedtests-spaceseparatedlistofsourcefiles)
#   --json                  Prints the test results in JSON. This mode will send all other test output and user messages to stderr. (https://jestjs.io/docs/cli#--json)
#   --maxWorkers            Specifies the maximum number of workers the worker-pool will spawn for running tests. This defaults to the number of the cores available on your machine. Useful for CI. (its usually best not to override this default) (https://jestjs.io/docs/cli#--maxworkersnumstring)
#   --onlyChanged           Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git or hg repository at the moment. (https://jestjs.io/docs/cli#--onlychanged)
#   --changedSince          Runs tests related to the changes since the provided branch or commit hash. If the current branch has diverged from the given branch, then only changes made locally will be tested. (https://jestjs.io/docs/cli#--changedsince)
#   --outputFile            Write test results to a file when the --json option is also specified. (https://jestjs.io/docs/cli#--outputfilefilename)
#   --passWithNoTests       Will not fail if no tests are found (for example while using `--testPathPattern`.) (https://jestjs.io/docs/cli#--passwithnotests)
#   --runInBand             Run all tests serially in the current process (rather than creating a worker pool of child processes that run tests). This is sometimes useful for debugging, but such use cases are pretty rare. Useful for CI. (https://jestjs.io/docs/cli#--runinband)
#   --showConfig            Print your Jest config and then exits. (https://jestjs.io/docs/en/cli#--showconfig)
#   --silent                Prevent tests from printing messages through the console. (https://jestjs.io/docs/cli#--silent)
#   --testNamePattern       Run only tests with a name that matches the regex pattern. (https://jestjs.io/docs/cli#--testnamepatternregex)
#   --testPathIgnorePatternsAn array of regexp pattern strings that is matched against all tests paths before executing the test. Only run those tests with a path that does not match with the provided regexp expressions. (https://jestjs.io/docs/cli#--testpathignorepatternsregexarray)
#   --testPathPattern       An array of regexp pattern strings that is matched against all tests paths before executing the test. (https://jestjs.io/docs/cli#--testpathpatternregex) (default: )
#   --colors                Forces test results output highlighting even if stdout is not a TTY. (https://jestjs.io/docs/cli#--colors)
#   --reporters             Run tests with specified reporters. Reporter options are not available via CLI. Example with multiple reporters: jest --reporters="default" --reporters="jest-junit" (https://jestjs.io/docs/cli#--reporters)
#   --verbose               Display individual test results with the test suite hierarchy. (https://jestjs.io/docs/cli#--verbose)
#   --coverageReporters     A list of reporter names that Jest uses when writing coverage reports. Any istanbul reporter
#   --coverageDirectory     The directory where Jest should output its coverage files.
#   --testResultsProcessor  Node module that implements a custom results processor. (https://jestjs.io/docs/en/configuration#testresultsprocessor-string)
#   --updateSnapshot        Use this flag to re-record snapshots. Can be used together with a test suite pattern or with `--testNamePattern` to re-record snapshot for test matching the pattern. (https://jestjs.io/docs/cli#--updatesnapshot)
#   --useStderr             Divert all output to stderr.
#   --watch                 Watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed, use the `--watchAll` option. (https://jestjs.io/docs/cli#--watch)
#   --watchAll              Watch files for changes and rerun all tests when something changes. If you want to re-run only the tests that depend on the changed files, use the `--watch` option. (https://jestjs.io/docs/cli#--watchall)
#   --testLocationInResults Adds a location field to test results.  Used to report location of a test in a reporter. { "column": 4, "line": 5 } (https://jestjs.io/docs/cli#--testlocationinresults)
#   --testTimeout           Default timeout of a test in milliseconds. Default value: 5000. (https://jestjs.io/docs/cli#--testtimeoutnumber)
#   --skip-nx-cache         Skip the use of Nx cache.
#   --help                  Show available options for project target.
```
