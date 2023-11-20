require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const stripe = require("stripe")(process.env.Payment_SECRET);

/* All require statements must in top portion to access desired components / functions */

const bistroBoss = "bistroBossDB";
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
console.log('Secret: ', process.env.Payment_SECRET);

const app = express();


app.use(cors({
    origin: [ "http://localhost:5173" ],
    credentials: true
}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.milestone12_USER}:${process.env.milestone12_PASS}@projects.mqfabmq.mongodb.net/${bistroBoss}?retryWrites=true&w=majority`;


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
        const paymentCollection = db.collection('payments');


        /* Auth api */

        /* Middleware JWT implementation */

        const verifyToken = async (req, res, next) => {
            try {
                // console.log('the token to be verified: ', req?.cookies);
                const token = req?.cookies?.[ "bistro-boss-token" ];


                if (!token) return res.status(401).send({ message: 'Unauthorized access' })

                jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    // console.log(err);
                    if (err) {
                        // console.log(err);
                        return res.status(401).send({ message: 'You are not authorized' })
                    }

                    // console.log(decoded);
                    req.user = decoded;
                    next();
                })
            } catch (error) {
                // console.log(error);
                res.status(500).send({ message: error?.message || error?.errorText });
            }
        }

        /* verify admin after verify token */
        const verifyAdmin = async (req, res, next) => {
            // const { email } = req?.params;
            // const token = req?.cookies[ 'bistro-boss-token' ];
            const { email } = req?.user;
            // console.log(email);
            const query = { email }

            const theUser = await userCollection.findOne(query)
            console.log('isAdmin : ', theUser);

            const isAdmin = theUser?.role === 'admin'
            if (!isAdmin) res.status(403).send({ message: 'Access Forbidden' })

            next();
        }

        const setTokenCookie = async (req, res, next) => {
            const user = req?.body;

            // console.log(user);

            if (user?.email) {
                const token = jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })

                console.log('Token generated: ', token);

                res
                    .cookie('bistro-boss-token', token, {
                        // httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

                    })
                req[ "bistro-boss-token" ] = token;
                // console.log(req[ "bistro-boss-token" ]);
                next();
            }
        }

        /* Create JWT */
        app.post('/auth/jwt', setTokenCookie, (req, res) => {
            try {
                const token = req[ "bistro-boss-token" ];

                // console.log('The user: ', user);
                // console.log('token in cookie: ', token);

                if (!token) return res.status(400).send({ success: false, message: 'Unknown error occurred' })

                console.log('User sign in successfully.');
                res.send({ success: true })
            } catch (error) {
                res.status(500).send({ error: true, message: error.message })
            }

        })

        /* clear cookie / token of logout user */
        app.post('/user/logout', (_req, res) => {
            try {
                console.log('User log out successfully.');

                res.clearCookie('bistro-boss-token', { maxAge: 0 }).send({ success: true })
            } catch (error) {
                res.status(500).send({ error: true, message: error.message })
            }
        })


        /* Payment APIs */
        app.post("/create-payment-intent", async (req, res) => {
            const { price } = req.body;
            // Create a PaymentIntent with the order amount and currency
            // console.log(parseInt(price * 100));

            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(price * 100),
                currency: "usd",
                payment_method_types: [ 'card' ],
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });

        app.get('/payments/:email', verifyToken, async (req, res) => {

            const query = { email: req?.params?.email }

            // console.log(req?.params?.email, req?.user?.email);

            if (req?.params?.email !== req?.user?.email) return res.status(403).send({ message: 'Forbidden access' })

            const paymentResult = await paymentCollection.find(query).toArray();

            // console.log(paymentResult);

            res.send(paymentResult)
        })

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            console.log(payment);

            const paymentResult = await paymentCollection.insertOne(payment);

            console.log(paymentResult);

            const query = {
                _id: {
                    $in: payment.cartIds.map(id => new ObjectId(id))
                }
            }

            const deleteResult = await cartCollection.deleteMany(query)

            res.send({ paymentResult, deleteResult })
        })

        app.get('/admin-stats', verifyToken, verifyAdmin, async (_req, res) => {
            const users = await userCollection.estimatedDocumentCount();
            const menuItems = await menuCollection.estimatedDocumentCount();
            const orders = await paymentCollection.estimatedDocumentCount();

            const aggregateResult = await paymentCollection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: '$price'
                        }
                    }
                }
            ]).toArray();

            const revenue = aggregateResult?.length > 0 ? aggregateResult[ 0 ].totalRevenue : 0

            console.log({
                users, menuItems, orders, revenue
            });

            res.send({
                users, menuItems, orders, revenue
            })
        })

        /* Get all users [admin] */
        app.get('/users', verifyToken, verifyAdmin, async (_req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })

        /* delete user [admin] */
        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) }

            const result = await userCollection.deleteOne(query)

            res.send(result)
        })

        /* add admin [admin] */
        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params;

            const query = { _id: new ObjectId(id) }

            const updatedUser = {
                $set: {
                    role: 'admin'
                }
            }

            const result = await userCollection.updateOne(query, updatedUser)

            return res.send(result)
        })

        /* Check current user is admin */
        app.get('/user/admin/:email', verifyToken, async (req, res) => {
            const { email } = req.params;

            if (email !== req?.user?.email) return res.status(403).send({ message: 'Access Forbidden' });

            const result = await userCollection.findOne({ email })
            // console.log(result);

            let admin = false;
            if (result?.role) {
                admin = result.role === 'admin'
            }

            res.send({ admin })
        })

        /* Create user */
        app.post('/users', async (req, res) => {
            try {
                const user = req.body;

                const query = { email: user?.email }
                const existingUser = await userCollection.findOne(query);

                // console.log(existingUser);

                if (existingUser)
                    return res.send({ message: `Welcome back ${existingUser?.name}${existingUser?.role ? ' as ' + existingUser?.role : 'user.'}`, insertedId: null })


                const result = await userCollection.insertOne(user)
                res.send(result)
            } catch (error) {
                res.status(500).send({ error: true, message: error.message })
            }
        })

        app.get('/menu', async (req, res) => {
            try {
                // console.log(req?.query);

                const { category } = req?.query;
                let query = {};
                // console.log('menu category: ', category);

                if (category) query = { category }

                // console.log(query);

                const result = await menuCollection.find(query).toArray();

                // console.log(category, ' menu no. :', result?.length);
                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.get('/menu/:id', async (req, res) => {
            try {
                // console.log(req?.query);

                const { id } = req?.params;
                const query = { _id: new ObjectId(id) }

                console.log(query);

                const result = await menuCollection.findOne(query);

                console.log(result);
                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.patch('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            const { id } = req.params;
            const Item = req.body;

            const query = { _id: new ObjectId(id) }

            const updatedItem = {
                $set: {
                    name: item?.name, category: item?.category, recipe: item?.recipe, image: item?.image, price: item?.price
                }
            }

            const result = await userCollection.updateOne(query, updatedItem, { upsert: true })

            console.log(result);
            return res.send(result)
        })

        app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const item = req.body;
                const result = await menuCollection.insertOne(item);
                console.log(result);

                res.send(result)

            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const { id } = req.params;

                console.log(id);
                const result = await cartCollection.deleteOne({ _id: new ObjectId(id) })

                // console.log(result);

                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.get('/reviews', async (_req, res) => {
            try {
                const result = await reviewCollection.find().toArray();

                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })

            }
        })

        app.post('/carts', verifyToken, async (req, res) => {
            try {
                const carItem = req.body;

                const result = await cartCollection.insertOne(carItem)
                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.delete('/carts/:id', verifyToken, async (req, res) => {
            try {
                const { id } = req.params;

                // console.log(id);
                const result = await cartCollection.deleteOne({ menuId: id })

                // console.log(result);

                res.send(result)
            } catch (error) {
                console.log(error);
                res.status(500).send({ message: error?.message })
            }
        })

        app.get('/carts', verifyToken, async (req, res) => {
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





app.get('/', (_req, res) => {
    res.send('Bistro Boss App is running');
})

app.listen(port, () => {
    console.log(`Bistro server is running on ${port}`);
})