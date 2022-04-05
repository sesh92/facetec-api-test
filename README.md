# Setup:

## Install dependencies

```:bash
yarn install
```

## Set environment variables

list of environment variables you can check in .env.example

```:config
PORT
FACETEC_URL=https://api.facetec.com/api/v3.1/biometrics
FACETEC_DEVICE_KEY
FACETEC_GROUP_NAME=sesh
```

FACETEC_URL to development on test Facetec server
FACETEC_DEVICE_KEY generated key in your account
FACETEC_GROUP_NAME this is required if you want to correctly work SDK

## Build the project

```:bash
yarn build
```

## Start the project

```:bash
yarn start
```
