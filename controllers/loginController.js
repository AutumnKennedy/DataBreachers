
//Register Page
const registerView = (req, res) => {
    res.render("register", {
    });
}

// Login Page
const loginView = (req, res) => {
        fs.readFile("views/logInForm.html", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                res.status(500).send("Error reading logInForm.html");
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        });
    };
    
    const logInRender = (req, res) => {
       
            const client = new MongoClient(uri);
            const{username, password} = req.query;
            async function run(){
              try{
                const database = client.db('DataBreachers');
                const collection = database.collection('Authorization');
                const query = {username: username, password: password};
                const output = await collection.findOne(query);
                if (output!= null){
          
                  // res.send('Found this user: ' + JSON.stringify(output));
                  // // res.send(output);
                }
                if (output == null){
                  res.send('User not found');
                }
              } catch{
                console.log("Cannot connect to DataBase");
              }
              finally{
                await client.close();
              }
              
            }
            run().catch(console.dir);
    };
    
const logInObserver = new observer();

module.exports = {
    registerView,
    loginView
};