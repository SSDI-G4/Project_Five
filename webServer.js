/**
 * This builds on the webServer of previous projects in that it exports the
 * current directory via webserver listing on a hard code (see portno below)
 * port. It also establishes a connection to the MongoDB named 'project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch
 * any file accessible to the current user in the current directory or any of
 * its children.
 *
 * This webServer exports the following URLs:
 * /            - Returns a text status message. Good for testing web server
 *                running.
 * /test        - Returns the SchemaInfo object of the database in JSON format.
 *                This is good for testing connectivity with MongoDB.
 * /test/info   - Same as /test.
 * /test/counts - Returns the population counts of the cs collections in the
 *                database. Format is a JSON object with properties being the
 *                collection name and the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the
 * database:
 * /user/list         - Returns an array containing all the User objects from
 *                      the database (JSON format).
 * /user/:id          - Returns the User object with the _id of id (JSON
 *                      format).
 * /photosOfUser/:id  - Returns an array with all the photos of the User (id).
 *                      Each photo should have all the Comments on the Photo
 *                      (JSON format).
 */

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const async = require("async");

const express = require("express");
const app = express();

const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");

// Load the Mongoose schema for User, Photo, and SchemaInfo
const User = require("./schema/user.js");
const Photo = require("./schema/photo.js");
const SchemaInfo = require("./schema/schemaInfo.js");

// XXX - Your submission should work without this line. Comment out or delete
// this line for tests and before submission!
//const models = require("./modelData/photoApp.js").models;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/project6", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// We have the express static module
// (http://expressjs.com/en/starter/static-files.html) do all the work for us.
app.use(express.static(__dirname));
app.use(session({secret: "secretKey", resave: false, saveUninitialized: false}));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Simple web server of files from " + __dirname);
});

/**
 * Use express to handle argument passing in the URL. This .get will cause
 * express to accept URLs with /test/<something> and return the something in
 * request.params.p1.
 * 
 * If implement the get as follows:
 * /test        - Returns the SchemaInfo object of the database in JSON format.
 *                This is good for testing connectivity with MongoDB.
 * /test/info   - Same as /test.
 * /test/counts - Returns an object with the counts of the different collections
 *                in JSON format.
 */
app.get("/test/:p1", function (request, response) {
  // Express parses the ":p1" from the URL and returns it in the request.params
  // objects.
  console.log("/test called with param1 = ", request.params.p1);

  const param = request.params.p1 || "info";

  if (param === "info") {
    // Fetch the SchemaInfo. There should only one of them. The query of {} will
    // match it.
    SchemaInfo.find({}, function (err, info) {
      if (err) {
        // Query returned an error. We pass it back to the browser with an
        // Internal Service Error (500) error code.
        console.error("Error in /user/info:", err);
        response.status(500).send(JSON.stringify(err));
        return;
      }
      if (info.length === 0) {
        // Query didn't return an error but didn't find the SchemaInfo object -
        // This is also an internal error return.
        response.status(500).send("Missing SchemaInfo");
        return;
      }

      // We got the object - return it in JSON format.
      console.log("SchemaInfo", info[0]);
      response.end(JSON.stringify(info[0]));
    });
  } else if (param === "counts") {
    // In order to return the counts of all the collections we need to do an
    // async call to each collections. That is tricky to do so we use the async
    // package do the work. We put the collections into array and use async.each
    // to do each .count() query.
    const collections = [
      { name: "user", collection: User },
      { name: "photo", collection: Photo },
      { name: "schemaInfo", collection: SchemaInfo },
    ];
    async.each(
      collections,
      function (col, done_callback) {
        col.collection.countDocuments({}, function (err, count) {
          col.count = count;
          done_callback(err);
        });
      },
      function (err) {
        if (err) {
          response.status(500).send(JSON.stringify(err));
        } else {
          const obj = {};
          for (let i = 0; i < collections.length; i++) {
            obj[collections[i].name] = collections[i].count;
          }
          response.end(JSON.stringify(obj));
        }
      }
    );
  } else {
    // If we know understand the parameter we return a (Bad Parameter) (400)
    // status.
    response.status(400).send("Bad param " + param);
  }
});

/**
 * URL /user/list - Returns all the User objects.
 */
app.get("/user/list", function (request, response) {
  // response.status(200).send(models.userListModel());
  User.find({}, '_id first_name last_name', function (err, users) { // Select only _id, first_name, and last_name
    if (err) {
      console.error('Error fetching user list:', err);
      response.status(500).send(JSON.stringify(err));
      return;
    }
    response.status(200).send(users);
  });
});

/**
 * URL /user/:id - Returns the information for User (id).
 */
app.get("/user/:id", async function (request, response) {
  const id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send("Invalid ID format");
  }

  try {
    const user = await User.findById(id).select('-__v'); 
    if (!user) {
      console.log("User with _id: " + id + " not found.");
      return response.status(400).send("User not found");
    }

    return response.status(200).send(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    return response.status(500).send("Internal Server Error");
  }  
});

/**
 * URL /photosOfUser/:id - Returns the Photos for User (id).
 */
app.get("/photosOfUser/:id", function (request, response) {
  const id = request.params.id;
  Photo.aggregate([
    { $match:
          {user_id: {$eq: new mongoose.Types.ObjectId(id)}}
    },
    { $addFields: {
      comments: { $ifNull : ["$comments", []] }
    } },
    { $lookup: {
        from: "users",
        localField: "comments.user_id",
        foreignField: "_id",
        as: "users"
      } },
    { $addFields: {
        comments: {
          $map: {
            input: "$comments",
            in: {
              $mergeObjects: [
                "$$this",
                { user: {
                    $arrayElemAt: [
                      "$users",
                      {
                        $indexOfArray: [
                          "$users._id",
                          "$$this.user_id"
                        ]
                      }
                    ]
                  } }
              ]
            }
          }
        }
      } },
    { $project: {
        users: 0,
        __v: 0,
        "comments.__v": 0,
        "comments.user_id": 0,
        "comments.user.location": 0,
        "comments.user.description": 0,
        "comments.user.occupation": 0,
        "comments.user.__v": 0
      } }
  ], function (err, photos) {
    if (err) {
      console.error("Error in /photosOfUser/:id", err);
      response.status(500).send(JSON.stringify(err));
      return;
    }
    if (photos.length === 0) {
      response.status(400).send();
      return;
    }
    response.end(JSON.stringify(photos));
  });
});

const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).send("Unauthorized");
  }
  next();
};


//User Registration
app.post("/user", async (request, response) => {
  const { login_name, password, first_name, last_name, location, description, occupation } = request.body;

  // Check that required fields are provided
  if (!login_name || !password || !first_name || !last_name) {
    return response.status(400).send("Required fields are missing.");
  }

  try {
    // Ensure that the login_name is unique
    const existingUser = await User.findOne({ login_name });
    if (existingUser) {
      return response.status(400).send("Login name already exists.");
    }

    // Create a new user and save to the database
    const newUser = new User({
      login_name,
      password,       // Store plain text password (as required initially)
      first_name,
      last_name,
      location,
      description,
      occupation,
    });
    await newUser.save();

    response.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during user registration:", error);
    response.status(500).send("Internal Server Error");
  }
});


// Admin Login Endpoint

app.post("/admin/login", async (request, response) => {
  const { login_name, password } = request.body;

  if (!login_name || !password) {
    return response.status(400).send("Login name and password are required.");
  }

  try {
    const user = await User.findOne({ login_name });
    if (!user || user.password !== password) {
      return response.status(400).send("Invalid login credentials.");
    }

    // Store user info in session
    request.session.userId = user._id;
    response.status(200).send({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      login_name: user.login_name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    response.status(500).send("Internal Server Error");
  }
});


// Admin Logout Endpoint
app.post("/admin/logout", (request, response) => {
  if (!request.session.userId) {
    return response.status(400).send("User not logged in");
  }

  request.session.destroy(err => {
    if (err) {
      console.error("Error during logout:", err);
      return response.status(500).send("Internal Server Error");
    }
    response.status(200).send("Logged out successfully");
  });
});
// Add this function to handle POST requests for adding comments
// Add this function to handle POST requests for adding comments
app.post("/commentsOfPhoto/:photo_id", isAuthenticated, async (request, response) => {
  const photoId = request.params.photo_id;
  const { comment } = request.body;

  // Validate the input for non-empty comments
  if (!comment || comment.length === 0 || comment.trim().length===0) {
    return response.status(400).json({ error: "Comment cannot be empty." });
  }

  try {
    // Create the new comment object
    const newComment = {
      user_id: request.session.userId, // Assuming userId is stored in the session
      comment: comment,
      date_time: new Date() // Set the current date and time
    };

    // Find the photo and update its comments
    const photo = await Photo.findByIdAndUpdate(
      photoId,
      { $push: { comments: newComment } },
      { new: true } // Return the updated document
    ).populate({
      path: 'comments.user_id',
      select: '_id first_name last_name' // Populate user details with name
    });

    // Check if the photo exists
    if (!photo) {
      return response.status(404).json({ error: "Photo not found" });
    }

    // Get the newly added comment (last item in comments array) with populated user details
    const addedComment = photo.comments[photo.comments.length - 1];
    response.status(201).json(addedComment); // Send back the created comment with user details
  } catch (error) {
    console.error("Error adding comment:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});





// Apply the middleware to all routes that need protection
app.use("/user", isAuthenticated); // Protect user routes
app.use("/photosOfUser", isAuthenticated); // Protect photo routes

const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log(
    "Listening at http://localhost:" +
      port +
      " exporting the directory " +
      __dirname
  );
});
