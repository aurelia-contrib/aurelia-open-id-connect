# Install 

    npm install --save shaunluttin/aurelia-open-id-connect#0.9.0
    
    jspm install github:shaunluttin/aurelia-open-id-connect@0.9.0

# Clone and Demo 
   
    git clone https://github.com/shaunluttin/aurelia-open-id-connect.git
    cd aurelia-open-id-connect
    npm install -y
    npm run demo

A complete demo requres the following running locally: 

* an OpenId Connect authorization server at http://localhost:12345    
* a Resource Server at http://localhost:5001
* another Resource Server at http://localhost:5002

Find examples of those here:

    git clone https://github.com/openiddict/openiddict-samples.git
    cd openiddict-samples/samples/ImplicitFlow

# Clone and Publish 

    npm run publish

