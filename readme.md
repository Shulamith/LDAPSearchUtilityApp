Store secrets in docker:
1. write a simple text file with the dot username in the exact format: Lastname\, Firstname
2. write a simple text file with the dot password: Password123
3. Ensure docker-compose.overide knows your secret file names and their location in the secrets section
4. In terminal: docker-compose up --build -d 
You should be good to go!
Debug by looking at config.js if necessary
