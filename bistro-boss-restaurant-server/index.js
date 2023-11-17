const bistroBoss = "bistroBossDB";

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: [ "http://localhost:5173" ],
    credentials: true
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.milestone12_USER}:${process.env.milestone12_PASS}@projects.mqfabmq.mongodb.net/${bistroBoss}?retryWrites=true&w=majority`;


/* JWT implementation */

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        console.log('the token to be verified: ', token);

        if (!token) return res.status(401).send({ message: 'Unauthorized access' })

        jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // console.log(err);
            if (err) return res.status(401).send({ message: 'You are not authorized' })

            // console.log(decoded);
            req.user = decoded;
            next();
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ message: error?.message || error?.errorText });
    }
}
const setTokenCookie = async (req, res, next) => {
    const user = req?.body;

    console.log(user);

    if (user?.email) {
        const token = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })

        console.log('Token generated: ', token);

        res
            .cookie('bistro-boss-token', token, {
                // httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

            })
        req.token = token;
        // req.cookie
        next();
    }
}







// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db(bistroBoss);
        const menuCollection = db.collection('menu');
        const reviewCollection = db.collection('reviews');
        const userCollection = db.collection('users');
        const cartCollection = db.collection('carts');


        /* Auth api */
        app.post('/auth/jwt', setTokenCookie, (req, res) => {
            try {
                const user = req.body;
                const { token } = req;

                console.log('The user: ', user);
                console.log('token in cookie: ', token);

                if (!token) return res.status(400).send({ success: false, message: 'Cookie set failed' })
                res.send({ success: true })
            } catch (error) {
                res.status(500).send({ error: true, message: error.message })
            }

        })

        /* clear cookie of logout user */
        app.post('/user/logout', (req, res) => {
            try {
                const user = req.body;
                console.log('logged out user ', user);

                res.clearCookie('bistro-boss-token', { maxAge: 0 }).send({ success: true })
            } catch (error) {
                res.status(500).send({ error: true, message: error.message })
            }
        })

        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })

        app.delete('/users/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) }

            const result = await userCollection.deleteOne(query)

            res.send(result)
        })

        app.patch('/users/admin/:id', async (req, res) => {
            const { id } = req.params;

            const query = { _id: new ObjectId(id) }

            const updatedUser = {
                $set: {
                    role: 'admin'
                }
            }

            const result = await userCollection.updateOne(query, updatedUser)

            res.send(result)
        })

        app.post('/users', async (req, res) => {
            try {
                const user = req.body;
                console.log('logged out user: ', user);

                const query = { email: user?.email }
                const existingUser = await userCollection.findOne(query);

                if (existingUser)
                    return res.send({ message: 'user already exists', insertedId: null })


                const result = await userCollection.insertOne(user)
                res.send(result)
            } catch (error) {
                res.status(500).send({ error: true, message: error.message })
            }
        })



        app.get('/menu', async (req, res) => {
            try {
                const result = await menuCollection.find().toArray();

                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.get('/reviews', async (req, res) => {
            try {
                const result = await reviewCollection.find().toArray();

                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })

            }
        })

        app.post('/carts', async (req, res) => {
            try {
                const carItem = req.body;

                const result = await cartCollection.insertOne(carItem)
                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })
        app.delete('/carts/:id', async (req, res) => {
            try {
                const { id } = req.params;

                console.log(id);
                const result = await cartCollection.deleteOne({ menuId: id })

                console.log(result);

                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.get('/carts', async (req, res) => {
            try {
                const { email } = req.query

                const result = await cartCollection.find({ email }).toArray();
                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Bistro Boss App is running');
})

app.listen(port, () => {
    console.log(`Bistro server is running on ${port}`);
})
