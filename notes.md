# Important traits to have as a software engineer:
 - Capable
 - Creative
 - Collaborative
 - Curious
 - Christlike - First and Foremost

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
 - chmod - Change the type of a file

# Caddy 

# EC2 

# REGEX
 - / - Start or end a regular expression
 - \w - Any alphanumeric character
 - \d - any digit
 - \b - boundary
 - . - wildcard
 - \. - actually just a dot
 - [abc] - matches a single a, b, or c character
 - [^abc] - match any single character other than a, b, or c
 - [A-C] - match any single character from A to C (all the above with brackets work for numbers too)
 - {n} - Match n number of repetitions - ex: [a-c]{3} matches 3 repetitions of a character from a to c
 - {m,n} - Match m to n number of repetitions - ex: z{2,3} matches 2 - 3 z's in a string 
 - * - zero or more of a given character - example: a* for zero or more of the a character
 - + - one or more of a given character - example: a+ for one or more of the a character
 - ? - put this after a character to make it optional
 - \s - any whitespace character (return, newline, tab, space)
 - ^ - Line begins with (put before selector)
 - $ - Line ends with (put after selector)
 - () - Only capture what is in the parentheses
 - (()) - Will capture what is inside the second set of parentheses as a separate capture group
 - (|) - captures what is within the parentheses on either the right or the left of the line thingy


# HTML
 - Div - Division element, NOT divider element

# DNS
 - A - The record that holds the IP address of a domain
 - AAAA - The record that contains the IPv6 address for a domain
 - CNAME - Forwards one domain to another subdomain
 - SOA - For a server hosting your application
 - TXT - Lets an admin store text notes in the record
 - NS - Nameserver - Authority for queries and proof of ownership
 - SOA - Start of Authority - Stores admin information about a domain
 - SRV record - Specifies a port for specific services
 - PTR record - Provides a domain name in reverse-lookups
 - MX record - Directs mail to an email server

# CSS 
  - EM - the size of an m
  - body > p - select the children of an element
  - vw and vh
  - PBM - Pals Before Marriage - Padding Border Margin 
  - @media selector allows you to set orientation and viewport based styles

# JSON
 - Keys have to be double quote strings

# JS
 - ++y - Preincrement

# Regex
 - Study regex syntax, take notes here

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

# How the internet works - Bottom to top:
 * Link
  - Hard wired connection
 * Internet
  - Chop data into little pieces; IP
 * Transport
  - Moving connection information packets - TCP/UDP
 * Application
  - Functionality like web browsing - HTTP/HTTPS

# Url Components
 - Scheme - https://
 - Domain - byu.edu
 - Port - :443
 - Path - /first/second
 - Params - ?a=foo;b=bar
 - Anchor - #3

# Security
 * OWASP 10
  * Broken Access control
   - Least privelege access violation - Don't store user info in memory client-side
   - URL bypass control 
   - Resource path allows access
  * Cryptographic Failures
   - Transmitting data as clear text
   - Not encrypting at rest or transit
   - Weak cryptography (SHA 1, MD5)
   - Misused cryptography (no salt, wrong params)
  * Injection
   - User supplied data is not sanitized - They submit executable code 
   - User data is executed as code
  * Insecure Design
   - Not aware of best practices
   - Unlimited trial accounts
   - Customer data not segmented - Aggregate data outside of the production environment
   - Single layer defense
  * Security Misconfiguration
   - Development info exposed
   - Using default config
   - Unnecessary features - No dead code/packages
   - System not hardened - Minimalist
  * Vulnerable components
   - Unnecessary/unused packages imported
   - Untrusted/verified source
   - Out of date software
   - Not tracking vulnerability bulletins
   - Package versions not locked
  * ID and Auth Failures
   - Credential stuffing (compromised list)
   - Brute force (guess password)
   - permitting weak passwords
   - Weak cred. recovery
   - Credentials in URL - Do
   - Not expiring auth tokens - Do
  * Software Integrity Failures
   - Unverified CDN
   - Unverified packages
   - Unverified updates
   - Insecure CD/CI platforms
  * Logging Failure
   - Not logging critical requests
   - Not monitoring system performance
   - Logs not audited, automatic   manual
   - Logs not stored centrally

# Security Practice
 - Juice shop - Gamified way to hack websites

# React
 - JSX - Javascript + html - Render react components in your html pages, couples JS and HTML
 - Use Babel in codepen to compile JS
 - Nested components determine what is rendered
 - Reuse components
 - Look at object destructuring
 - Always capitalize component names

# Reactivity 
 * `React.useEffect()` - Pass function to execute every time the component is rendered - return value is what happens on destroy. Pass an empty array in as the second parameter if you only want the effect to happen on the first time. Put things in the array if you want to conditionally trigger this code
   - Only in function components
   - Only at top function scope
   - No loops or conditionals

# UX
 - Simple
 - Tell a story
 - Consistent with what people think
   - You can change - but be better and don't just do a lot of weird things.
   - Use a framework
 - Navigation - tell a user the story they are expecting - sitemap is a cool tool for this
   - Display location
   - Browser controls
   - Breadcrumbs
   - Common path
   - Bottom line: Don't make it so complicated that they can't make it out
 - Color - Don't make their eyes hurt and be aware of colorblindness
 - Fonts - Keep it simple
 - Standard text size for different elements
 - Whitespace - use it
 - Interaction - Easily able to engage
 - Image must add value
 - Keep decision time low, kep amount of decisions low or decompose into simple components
 - Accessibility - Build with diversity in mind, accessible to everyone
 - Legal - Don't break intellectual property laws
 - Walls - What is going to stop people from using your site? Make them as small as possible. What do you do if something fails