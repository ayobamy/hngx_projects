## Objective 

Create and host an endpoint using any programming language of your choice. 

The endpoint should take two GET parameters and return specific information in JSON format.

## Requirements

The information required includes: 
- Slack name
- Current day of the week
- Current UTC time (with validation of +/-2)
- Track
- The GitHub URL of the file being run
- The GitHub URL of the full source code.

## JSON
`{<br>
  "slack_name": "example_name",<br>
  "current_day": "Monday",<br>
  "utc_time": "2023-08-21T15:04:05Z",<br>
  "track": "backend",<br>
  "github_file_url": "https://github.com/username/repo/blob/main/file_name.ext",<br>
  "github_repo_url": "https://github.com/username/repo",<br>
  “status_code”: “200”<br>
}`
