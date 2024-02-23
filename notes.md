# Important traits to have as a software engineer:
 - Capable
 - Creative
 - Collaborative
 - Curious
 - Christlike - First and Foremost

# Git

# Command Line Arguments Reference
 - echo - Output the parameters of the command
 - cd - Change directory
 - mkdir - Make directory
 - rmdir - Remove directory
 - rm - Remove file(s)
 - mv - Move file(s)
 - cp - Copy files
 - ls - List files
 - curl - Command line client URL browser
 - grep - Regular expression search
 - find - Find files
 - top - View running processes with CPU and memory usage
 - df - View disk statistics
 - cat - Output the contents of a file
 - less - Interactively output the contents of a file
 - wc - Count the words in a file
 - ps - View the currently running processes
 - kill - Kill a currently running process
 - sudo - Execute a command as a super user (admin)
 - ssh - Create a secure shell on a remote computer
 - scp - Securely copy files to a remote computer
 - history - Show the history of commands
 - ping - Check if a website is up
 - tracert - Trace the connections to a website
 - dig - Show the DNS information for a domain
 - man - Look up a command in the manual

# Caddy

# EC2 

# CSS 
  - EM - the size of an m
  - body > p - select the children of an element
  - vw and vh
  - PBM - Pals Before Marriage - Padding Border Margin 
  - @media selector allows you to set orientation and viewport based styles

# JS - Promises and Async/Await
 * General principle - everything is async
 * What is Async?
   * Using the Web API to execute intense JS while keeping your main thread free
   * Promise
     - Pending - Still working on it
     - Fulfilled - Completed executing
     - Rejected - Promise failed
     - Example `new Promise((resolve, reject  (callback)) => resolve(true))`

    ```
    function callback(resolve, reject) {
      resolve('done');
    }
    const p = new Promise(callback);

    p.then((resolve_result) => console.log(resolve_result));
    ```
    * Async and Await
     - All need to be async - Essentially wraps everything in a promise

