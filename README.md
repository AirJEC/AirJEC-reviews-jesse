# airfec-reviews-justus
Reviews for an Airbnb page

## Related Projects

  - https://github.com/airfec-reviews-justus/repo
  - https://github.com/airfec-photos-vlad/repo
  - https://github.com/airfec-reservations-aaron/repo
  - https://github.com/airfec-description-brian/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

INITIAL SET UP 
1. Create an account on https://aws.amazon.com/s3/
2. Retrieve Generate Security Credentials (https://imgur.com/Mb1AkoG, https://imgur.com/bffxIfi)
3. Create and upload pictures to a S3 bucket
3. Rename helpers/example.config.js into config.js with your credentials
4. Rename database/example-mysqlConfig.js file to mysqlConfigs and make changes to configure to your mysql
5. Run mysql.server start in terminal to start your database
6. Populate schema with a fake data: mysql -u [USERNAME] -p < schema.sql
7. In the server/index.js, uncomment helper.inputPhotos()
8. Start the server with the command: node server/index.js
9. This should populate your database with the dummy photos. After this is done comment out helper.inputPhotos()

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

